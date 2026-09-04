import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  try {
    // 1. Fetch from Supabase Auth users
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    if (authError) {
      return NextResponse.json({ success: false, error: authError.message }, { status: 500 });
    }

    // 2. Also try fetching from public.awie_users if available
    let dbUsersMap = new Map<string, any>();
    try {
      const { data: dbUsers } = await supabaseAdmin.from('awie_users').select('*');
      if (dbUsers) {
        dbUsers.forEach((u) => {
          if (u.email) dbUsersMap.set(u.email.toLowerCase(), u);
        });
      }
    } catch {
      // Ignore if table not created yet
    }

    // Merge auth users and database users
    const users = (authData?.users || []).map((u) => {
      const email = (u.email || '').toLowerCase();
      const dbUser = dbUsersMap.get(email);
      const meta = u.user_metadata || {};
      const dbMeta = (dbUser?.metadata as Record<string, any>) || {};

      const phone = dbUser?.phone || meta.phone || dbMeta.phone || '';
      const dob = meta.dob || dbMeta.dob || '';
      const address = meta.address || dbMeta.address || {};
      const name = dbUser?.name || meta.full_name || meta.name || email.split('@')[0];

      return {
        id: u.id,
        email: u.email,
        name,
        phone,
        dob,
        address: {
          street: address.street || '',
          apartment: address.apartment || '',
          city: address.city || '',
          state: address.state || '',
          pincode: address.pincode || '',
          country: address.country || 'India',
        },
        provider: u.app_metadata?.provider || 'email',
        createdAt: u.created_at,
        lastSignIn: u.last_sign_in_at,
        isVerified: u.email_confirmed_at ? true : false,
      };
    });

    return NextResponse.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch users.' },
      { status: 500 }
    );
  }
}
