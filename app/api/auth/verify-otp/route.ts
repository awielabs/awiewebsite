import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Admin client with service role key for full database persistence
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rlcugpexkehndzyecjev.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

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
    const submittedOtp = (body.otp || '').trim();
    const name = (body.name || '').trim();
    const purpose = body.purpose === 'login' ? 'login' : 'signup';

    if (!email || !submittedOtp) {
      return NextResponse.json(
        { success: false, error: 'Email and 6-digit verification code are required.' },
        { status: 400 }
      );
    }

    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    let isValid = false;

    // 1. Check in-memory fast cache first
    const cached = otpCache.get(email);
    if (cached) {
      if (cached.code === submittedOtp && Date.now() <= cached.expiresAt) {
        isValid = true;
        otpCache.delete(email); // Invalidate once used
      }
    }

    // 2. Fallback check Supabase otp_verifications table
    if (!isValid) {
      try {
        const { data, error } = await supabaseAdmin
          .from('otp_verifications')
          .select('*')
          .eq('email', email)
          .eq('otp_code', submittedOtp)
          .eq('verified', false)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && data) {
          const expiresAt = new Date(data.expires_at).getTime();
          if (Date.now() <= expiresAt) {
            isValid = true;
            await supabaseAdmin
              .from('otp_verifications')
              .update({ verified: true })
              .eq('id', data.id);
          }
        }
      } catch {
        // Continue
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired verification code. Please check or request a new code.' },
        { status: 400 }
      );
    }

    // 3. Save User Directly into Supabase Backend Database (auth.users & public tables)
    let userId = 'usr-' + Date.now();
    let displayName = name || cached?.name || email.split('@')[0] || 'AWIE Member';
    let avatarUrl: string | undefined = undefined;

    // A. Persist in Supabase Auth (auth.users)
    try {
      const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = userList?.users?.find(
        (u) => u.email?.toLowerCase() === email
      );

      if (existingUser) {
        userId = existingUser.id;
        displayName = existingUser.user_metadata?.full_name || displayName;
        avatarUrl = existingUser.user_metadata?.avatar_url || avatarUrl;

        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          user_metadata: {
            full_name: displayName,
            name: displayName,
            last_verified_at: new Date().toISOString(),
          },
          email_confirm: true,
        });
      } else {
        const { data: created } = await supabaseAdmin.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: {
            full_name: displayName,
            name: displayName,
            created_via: 'otp_verification',
          },
        });

        if (created?.user) {
          userId = created.user.id;
        }
      }
    } catch {
      // Continue if auth admin has limitations
    }

    // B. Persist record into public.awie_users (Dedicated User Table for AWIE Store & Products)
    try {
      await supabaseAdmin.from('awie_users').upsert(
        {
          auth_user_id: userId,
          email,
          name: displayName,
          role: 'customer',
          platform: 'AWIE Store and Products',
          is_verified: true,
          last_login: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );
    } catch {
      // Continue gracefully
    }

    // C. Persist in public.profiles (if table exists)
    try {
      await supabaseAdmin.from('profiles').upsert(
        {
          email,
          full_name: displayName,
          provider: 'email',
          is_verified: true,
          last_login: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );
    } catch {
      // Continue gracefully
    }

    // Clean sanitized user session
    const userSession = {
      id: userId,
      email,
      name: displayName,
      avatarUrl,
      provider: 'email' as const,
      lastActive: Date.now(),
    };

    return NextResponse.json({
      success: true,
      message: 'Verification successful.',
      user: userSession,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to verify code. Please try again.' },
      { status: 500 }
    );
  }
}
