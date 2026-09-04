import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Admin client with service role key for user verification and registration
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rlcugpexkehndzyecjev.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const name = (body.name || '').trim();
    const avatarUrl = body.avatarUrl || undefined;
    const mode = body.mode === 'signup' ? 'signup' : 'login';
    const googleId = body.googleId || undefined;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required for Google authentication.' },
        { status: 400 }
      );
    }

    const displayName = name || email.split('@')[0] || 'AWIE Member';

    // 1. Check if user already exists in public.awie_users or auth.users
    let accountExists = false;
    let existingUserId: string | null = null;

    // A. Check public.awie_users
    try {
      const { data: awieUsers, error: awieError } = await supabaseAdmin
        .from('awie_users')
        .select('*')
        .ilike('email', email)
        .limit(1);

      if (!awieError && awieUsers && awieUsers.length > 0) {
        accountExists = true;
        existingUserId = awieUsers[0].auth_user_id || awieUsers[0].id;
      }
    } catch {
      // Continue to check auth.users
    }

    // B. Check Supabase Auth (auth.users)
    try {
      const { data: userList, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (!listError && userList?.users) {
        const found = userList.users.find(
          (u) => u.email?.toLowerCase() === email
        );
        if (found) {
          accountExists = true;
          existingUserId = found.id;
        }
      }
    } catch {
      // Continue
    }

    // C. Check public.profiles as fallback
    if (!accountExists) {
      try {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id, email')
          .ilike('email', email)
          .limit(1);

        if (profile && profile.length > 0) {
          accountExists = true;
          existingUserId = profile[0].id;
        }
      } catch {
        // Continue
      }
    }

    // LOGIN MODE VALIDATION:
    // If logging in and account is not present in database, block login and notify
    if (mode === 'login' && !accountExists) {
      return NextResponse.json(
        {
          success: false,
          notFound: true,
          email,
          error: `No registered account found for ${email}. Please create an account first.`,
        },
        { status: 404 }
      );
    }

    // SIGNUP MODE OR EXISTING USER LOGIN
    let finalUserId = existingUserId || googleId || 'usr-' + Date.now();

    // If new signup, ensure user exists in Supabase Auth (auth.users)
    if (mode === 'signup' && !existingUserId) {
      try {
        const { data: created } = await supabaseAdmin.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: {
            full_name: displayName,
            name: displayName,
            avatar_url: avatarUrl,
            created_via: 'google_signup',
          },
        });
        if (created?.user) {
          finalUserId = created.user.id;
        }
      } catch {
        // Fallback
      }
    }

    // Persist registration into public.awie_users (Dedicated User Table for AWIE Store & Products)
    try {
      await supabaseAdmin.from('awie_users').upsert(
        {
          auth_user_id: finalUserId,
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
      // Continue
    }

    // Also persist into public.profiles
    try {
      await supabaseAdmin.from('profiles').upsert(
        {
          email,
          full_name: displayName,
          avatar_url: avatarUrl,
          provider: 'google',
          is_verified: true,
          last_login: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );
    } catch {
      // Continue
    }

    const userSession = {
      id: finalUserId,
      email,
      name: displayName,
      avatarUrl,
      provider: 'google' as const,
      lastActive: Date.now(),
    };

    return NextResponse.json({
      success: true,
      user: userSession,
      isNewUser: mode === 'signup' && !accountExists,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Google authentication verification failed.' },
      { status: 500 }
    );
  }
}
