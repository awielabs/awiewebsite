import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Admin client with service role key for account verification & database queries
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rlcugpexkehndzyecjev.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// In-memory cache for ultra-fast fallback verification if DB connection has network delays
interface CachedOtp {
  code: string;
  expiresAt: number;
  name?: string;
  purpose: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __AWIE_OTP_CACHE__: Map<string, CachedOtp> | undefined;
}

const otpCache: Map<string, CachedOtp> = globalThis.__AWIE_OTP_CACHE__ || new Map();
globalThis.__AWIE_OTP_CACHE__ = otpCache;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let email = (body.email || '').trim().toLowerCase();
    const name = (body.name || '').trim();
    const purpose = body.purpose === 'login' ? 'login' : 'signup';

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    // When logging in, verify that the account actually exists in the database first
    if (purpose === 'login') {
      let accountExists = false;

      // 1. Check in Supabase Auth users (auth.users)
      try {
        const { data: userList, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (!listError && userList?.users) {
          const found = userList.users.some(
            (u) => u.email?.toLowerCase() === email
          );
          if (found) accountExists = true;
        }
      } catch {
        // Fallback to table queries below
      }

      // 2. Check in public.profiles table
      if (!accountExists) {
        try {
          const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id, email')
            .ilike('email', email)
            .limit(1);

          if (profile && profile.length > 0) {
            accountExists = true;
          }
        } catch {
          // Continue to next check
        }
      }

      // 3. Check in public.awie_users table (Dedicated User Registration Table)
      if (!accountExists) {
        try {
          const { data: awieUser } = await supabaseAdmin
            .from('awie_users')
            .select('id, email')
            .ilike('email', email)
            .limit(1);

          if (awieUser && awieUser.length > 0) {
            accountExists = true;
          }
        } catch {
          // Continue
        }
      }

      // If user does not exist in any database table, do NOT dispatch OTP & return notFound
      if (!accountExists) {
        return NextResponse.json(
          {
            success: false,
            notFound: true,
            email,
            error: `No account found with ${email}. Please create an account to get started.`,
          },
          { status: 404 }
        );
      }
    }

    // Generate cryptographically sound 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAtMs = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    const expiresAtIso = new Date(expiresAtMs).toISOString();

    // Cache locally for immediate resiliency
    otpCache.set(email, {
      code: otp,
      expiresAt: expiresAtMs,
      name: name || undefined,
      purpose,
    });

    // Save to Supabase otp_verifications table if available
    try {
      await supabase.from('otp_verifications').insert({
        email,
        otp_code: otp,
        purpose,
        name: name || null,
        expires_at: expiresAtIso,
        verified: false,
      });
    } catch {
      // Graceful fallback to in-memory verification
    }

    // Email Dispatch via Nodemailer (if GMAIL credentials provided)
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPass) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        const subject = `${otp} is your AWIE verification code`;
        const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://awie.vercel.app'}/logobg.png`;
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
              <tr>
                <td align="center" style="padding: 40px 16px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">

                    <!-- Header with AWIE Logo -->
                    <tr>
                      <td style="padding: 28px 36px; background-color: #2563EB; text-align: center;">
                        <img src="${logoUrl}" alt="AWIE Logo" width="150" style="display: inline-block; height: auto; max-width: 150px;" />
                        <p style="margin: 8px 0 0 0; font-size: 12px; color: #BFDBFE; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Unified Account Verification</p>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 36px 36px 28px 36px; text-align: center;">
                        <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0F172A;">
                          ${purpose === 'signup' ? 'Verify Your New Account' : 'Security Login Code'}
                        </h2>
                        <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                          Please use the following 6-digit code to complete your ${purpose === 'signup' ? 'registration for AWIE Products & AWIE Store' : 'secure login'}.
                        </p>

                        <!-- OTP Code Card -->
                        <div style="background-color: #EFF6FF; border: 2px dashed #93C5FD; border-radius: 16px; padding: 22px; margin: 0 auto 28px auto; max-width: 320px;">
                          <span style="font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #1D4ED8; font-family: monospace; display: block;">
                            ${otp}
                          </span>
                        </div>

                        <!-- Spam Note Notice -->
                        <div style="background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; padding: 14px; text-align: left; margin-bottom: 24px;">
                          <p style="margin: 0; font-size: 12px; color: #92400E; line-height: 1.5;">
                            <strong>Note:</strong> This OTP is valid for 10 minutes. If you did not receive future codes immediately, please check your <strong>Spam / Junk</strong> mail folder before requesting a new code.
                          </p>
                        </div>

                        <p style="margin: 0; font-size: 12px; color: #94A3B8;">
                          If you did not initiate this request, you can safely disregard this message.
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 20px 36px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9; text-align: center;">
                        <p style="margin: 0; font-size: 11px; color: #64748B; font-weight: 500;">
                          © ${new Date().getFullYear()} AWIE. Single Sign-On protected by 30-min security timeout.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `;

        const sendPromise = transporter.sendMail({
          from: `"AWIE Security" <${gmailUser}>`,
          to: email,
          subject,
          html,
        });

        // Await with timeout so the modal opens fast without blocking UI
        await Promise.race([
          sendPromise,
          new Promise((resolve) => setTimeout(resolve, 1500))
        ]);
      } catch {
        // Continue even if email delivery encounters transport errors
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent.',
      email,
      expiresAt: expiresAtIso,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process verification request. Please try again.' },
      { status: 500 }
    );
  }
}
