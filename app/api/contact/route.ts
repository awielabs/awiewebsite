import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, budget_range } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, service, and message are required fields.' },
        { status: 400 }
      );
    }

    // Format current timestamp (e.g., 30 August 2026, 6:42 PM)
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) + ', ' + now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    // 1. Try storing in Supabase if environment variables exist
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from('contact_messages').insert([
          {
            name,
            email,
            phone: phone || null,
            service,
            message,
            budget_range: budget_range || null,
            status: 'unread',
          },
        ]);
      } catch (dbError) {
        console.warn('Supabase insertion skipped or failed:', dbError);
      }
    } else {
      console.log('[API/CONTACT] (Local Mode) Message logged:', { name, email, phone, service, message, budget_range });
    }

    // 2. Try sending email via Nodemailer Gmail SMTP if credentials exist
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const contactTo = process.env.CONTACT_TO || 'awielabs@gmail.com';

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

        // 1. Internal Notification Email (To AWIE Team)
        await transporter.sendMail({
          from: `"AWIE Website" <${gmailUser}>`,
          to: contactTo,
          replyTo: email,
          subject: `New Project Enquiry — ${service} | ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F8FAFC; margin: 0; padding: 20px; color: #0F172A; }
                .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.1); }
                .header { background: linear-gradient(135deg, #1E40AF 0%, #2563EB 100%); padding: 28px 32px; color: #FFFFFF; display: flex; align-items: center; justify-content: space-between; }
                .header-title { font-size: 16px; font-weight: 800; tracking-style: uppercase; letter-spacing: 1.5px; margin: 0; color: #FFFFFF; text-transform: uppercase; }
                .header-sub { font-size: 11px; color: #93C5FD; font-weight: 600; margin-top: 4px; }
                .content { padding: 32px; }
                .section-title { font-size: 11px; font-weight: 800; color: #2563EB; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; }
                .info-grid { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 24px; }
                .info-row { margin-bottom: 10px; font-size: 14px; }
                .info-row:last-child { margin-bottom: 0; }
                .label { font-weight: 700; color: #475569; width: 110px; display: inline-block; }
                .value { font-weight: 600; color: #0F172A; }
                .message-box { background: #F1F5F9; border-left: 4px solid #2563EB; padding: 18px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #1E293B; margin-bottom: 24px; white-space: pre-line; }
                .timestamp { font-size: 12px; color: #64748B; font-weight: 600; margin-bottom: 24px; }
                .next-step { background: #EFF6FF; border: 1px border-blue-200; border-radius: 10px; padding: 14px 18px; font-size: 13px; color: #1E40AF; font-weight: 600; margin-bottom: 24px; }
                .divider { border: 0; border-top: 1px dashed #CBD5E1; margin: 24px 0; }
                .footer { background: #0F172A; padding: 24px 32px; text-align: center; color: #94A3B8; font-size: 12px; }
                .footer-brand { font-weight: 900; color: #FFFFFF; font-size: 16px; letter-spacing: 1px; margin-bottom: 4px; }
                .footer-tagline { color: #38BDF8; font-size: 11px; font-weight: 700; margin-bottom: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <table width="100%" cellPadding="0" cellSpacing="0" border="0">
                    <tr>
                      <td align="left" valign="middle">
                        <div class="header-title">NEW PROJECT ENQUIRY</div>
                        <div class="header-sub">Received through AWIE Website</div>
                      </td>
                      <td align="right" valign="middle" width="90">
                        <div style="background: rgba(255,255,255,0.15); padding: 8px 12px; border-radius: 10px; text-align: center; border: 1px solid rgba(255,255,255,0.3);">
                          <span style="font-weight: 900; font-size: 18px; color: #FFFFFF; tracking-style: tight;">AWIE</span>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <div class="content">
                  <p style="font-size: 14px; color: #475569; margin-top: 0; margin-bottom: 20px;">You have received a new project enquiry through the AWIE website.</p>
                  
                  <div class="section-title">CLIENT DETAILS</div>
                  <div class="info-grid">
                    <div class="info-row"><span class="label">Name:</span> <span class="value">${name}</span></div>
                    <div class="info-row"><span class="label">Email:</span> <span class="value"><a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a></span></div>
                    <div class="info-row"><span class="label">Phone:</span> <span class="value">${phone || 'Not provided'}</span></div>
                  </div>

                  <div class="section-title">INTERESTED IN</div>
                  <div style="font-size: 15px; font-weight: 800; color: #1E40AF; margin-bottom: 24px; background: #EFF6FF; padding: 10px 14px; border-radius: 8px; display: inline-block;">
                    ${service}
                  </div>

                  <div class="section-title">PROJECT DESCRIPTION</div>
                  <div class="message-box">
                    ${message}
                  </div>

                  <div class="timestamp">
                    <strong>SUBMITTED:</strong> ${formattedDate}
                  </div>

                  <hr class="divider" />

                  <div class="next-step">
                    <strong>NEXT STEP:</strong> Review the enquiry and contact the client directly.
                  </div>
                </div>

                <div class="footer">
                  <div class="footer-brand">AWIE</div>
                  <div class="footer-tagline">Innovate • Build • Connect</div>
                  <div style="font-size: 11px; color: #64748B;">© ${new Date().getFullYear()} AWIE. All rights reserved.</div>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        // 2. Client Confirmation Email (To Client)
        await transporter.sendMail({
          from: `"AWIE" <${gmailUser}>`,
          to: email,
          subject: `We received your project enquiry — AWIE`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F8FAFC; margin: 0; padding: 20px; color: #0F172A; }
                .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.1); }
                .header { background: linear-gradient(135deg, #1E40AF 0%, #2563EB 100%); padding: 28px 32px; color: #FFFFFF; }
                .content { padding: 32px; }
                .greeting { font-size: 18px; font-weight: 800; color: #0F172A; margin-bottom: 12px; }
                .summary-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #2563EB; border-radius: 12px; padding: 20px; margin: 24px 0; }
                .summary-item { margin-bottom: 12px; font-size: 14px; }
                .summary-item:last-child { margin-bottom: 0; }
                .footer { background: #0F172A; padding: 28px 32px; text-align: center; color: #94A3B8; font-size: 12px; }
                .footer-brand { font-weight: 900; color: #FFFFFF; font-size: 18px; letter-spacing: 1px; margin-bottom: 4px; }
                .footer-tagline { color: #38BDF8; font-size: 11px; font-weight: 700; margin-bottom: 16px; }
                .footer-links { font-size: 12px; color: #CBD5E1; line-height: 1.8; }
                .footer-links a { color: #60A5FA; text-decoration: none; font-weight: 600; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <table width="100%" cellPadding="0" cellSpacing="0" border="0">
                    <tr>
                      <td align="left" valign="middle">
                        <span style="font-weight: 900; font-size: 22px; color: #FFFFFF; letter-spacing: 1px;">AWIE</span>
                      </td>
                      <td align="right" valign="middle">
                        <div style="background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); font-size: 11px; font-weight: 700; color: #FFFFFF;">
                          ENQUIRY CONFIRMATION
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <div class="content">
                  <div class="greeting">Hi ${name},</div>
                  
                  <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 16px;">
                    Thank you for reaching out to <strong>AWIE</strong>.
                  </p>
                  
                  <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 24px;">
                    We’ve received your project enquiry and our team will review the details you submitted.
                  </p>

                  <div style="font-size: 12px; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 1px;">YOUR ENQUIRY</div>
                  
                  <div class="summary-card">
                    <div class="summary-item">
                      <strong style="color: #475569;">Interested in:</strong> <span style="color: #0F172A; font-weight: 700;">${service}</span>
                    </div>
                    <div class="summary-item" style="white-space: pre-line;">
                      <strong style="color: #475569;">Project:</strong> <span style="color: #334155;">${message}</span>
                    </div>
                  </div>

                  <p style="font-size: 14px; color: #334155; line-height: 1.6;">
                    We’ll get back to you using the email address or phone number you provided.
                  </p>
                </div>

                <div class="footer">
                  <div class="footer-brand">AWIE</div>
                  <div class="footer-tagline">Innovate • Build • Connect</div>
                  
                  <div class="footer-links">
                    <a href="https://awie.in" target="_blank">awie.in</a> &nbsp;•&nbsp; <span>@awielabs</span> &nbsp;•&nbsp; <a href="mailto:awielabs@gmail.com">awielabs@gmail.com</a>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.warn('Nodemailer SMTP skipped or failed:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for contacting AWIE. We'll get back to you shortly.",
    });
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
