import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = (searchParams.get('email') || '').trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email parameter is required.' },
        { status: 400 }
      );
    }

    let userRecord: any = null;
    let metadata: Record<string, any> = {};

    // 1. Try fetching from public.awie_users
    try {
      const { data, error } = await supabaseAdmin
        .from('awie_users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (!error && data) {
        userRecord = data;
        metadata = (data.metadata as Record<string, any>) || {};
      }
    } catch {
      // Ignore if table not yet in schema cache
    }

    // 2. Fallback check in public.profiles
    if (!userRecord || Object.keys(metadata).length === 0) {
      try {
        const { data: profile, error: profError } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (!profError && profile) {
          userRecord = userRecord || profile;
          metadata = {
            ...metadata,
            ...((profile.metadata as Record<string, any>) || {}),
          };
          if (!userRecord.phone && profile.phone) userRecord.phone = profile.phone;
          if (!userRecord.name && profile.full_name) userRecord.name = profile.full_name;
        }
      } catch {
        // Ignore
      }
    }

    // 3. Fallback check in auth.users user_metadata
    if (!userRecord || Object.keys(metadata).length === 0) {
      try {
        const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
        const authUser = userList?.users?.find(
          (u) => u.email?.toLowerCase() === email
        );
        if (authUser) {
          const authMeta = authUser.user_metadata || {};
          metadata = {
            ...metadata,
            ...authMeta,
            ...(authMeta.metadata || {}),
          };
          userRecord = userRecord || {
            id: authUser.id,
            email: authUser.email,
            name: authMeta.full_name || authMeta.name || '',
            phone: authMeta.phone || '',
          };
        }
      } catch {
        // Ignore
      }
    }

    const address = metadata.address || {};

    return NextResponse.json({
      success: true,
      profile: {
        id: userRecord?.id || '',
        email: userRecord?.email || email,
        name: userRecord?.name || userRecord?.full_name || metadata.name || '',
        phone: userRecord?.phone || metadata.phone || '',
        alternatePhone: metadata.alternatePhone || '',
        dob: metadata.dob || '',
        avatarUrl: userRecord?.avatar_url || metadata.avatarUrl || metadata.avatar_url || '',
        role: userRecord?.role || 'customer',
        address: {
          street: address.street || '',
          apartment: address.apartment || '',
          city: address.city || '',
          state: address.state || 'Maharashtra',
          pincode: address.pincode || '',
          country: address.country || 'India',
          addressType: address.addressType || 'Home',
        },
        is_verified: true,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch user profile.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const name = (body.name || '').trim();
    const phone = (body.phone || '').trim();
    const alternatePhone = (body.alternatePhone || '').trim();
    const dob = (body.dob || '').trim();
    const street = (body.street || '').trim();
    const apartment = (body.apartment || '').trim();
    const city = (body.city || '').trim();
    const state = (body.state || '').trim();
    const pincode = (body.pincode || '').trim();
    const country = (body.country || 'India').trim();
    const addressType = (body.addressType || 'Home').trim();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid user email is required.' },
        { status: 400 }
      );
    }

    // 1. Strict Contact Details (Phone Number) Validation
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const mobileDigits = cleanPhone.replace(/^\+91/, '').replace(/\D/g, '');

    if (!mobileDigits || mobileDigits.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit primary mobile number for delivery verification.' },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(mobileDigits)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.' },
        { status: 400 }
      );
    }

    // Optional alternate phone validation
    let cleanAlternateDigits = '';
    if (alternatePhone) {
      const altClean = alternatePhone.replace(/[^\d+]/g, '');
      cleanAlternateDigits = altClean.replace(/^\+91/, '').replace(/\D/g, '');
      if (cleanAlternateDigits.length !== 10 || !/^[6-9]\d{9}$/.test(cleanAlternateDigits)) {
        return NextResponse.json(
          { success: false, error: 'Alternate contact number must be a valid 10-digit mobile number.' },
          { status: 400 }
        );
      }
    }

    // 2. Date of Birth Validation
    if (dob) {
      const parsedDob = new Date(dob);
      const now = new Date();
      if (isNaN(parsedDob.getTime())) {
        return NextResponse.json(
          { success: false, error: 'Invalid Date of Birth format.' },
          { status: 400 }
        );
      }
      if (parsedDob >= now) {
        return NextResponse.json(
          { success: false, error: 'Date of Birth must be in the past.' },
          { status: 400 }
        );
      }

      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 5);
      if (parsedDob > minAgeDate) {
        return NextResponse.json(
          { success: false, error: 'User must be at least 5 years of age.' },
          { status: 400 }
        );
      }
    }

    // 3. Pincode Validation (Postal Code)
    const cleanPincode = pincode.replace(/\D/g, '');
    if (pincode && cleanPincode.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 6-digit postal PIN code.' },
        { status: 400 }
      );
    }

    // 4. Retrieve existing record metadata
    let existingMeta: Record<string, any> = {};
    let existingName = name;

    try {
      const { data: existingUser } = await supabaseAdmin
        .from('awie_users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (existingUser) {
        existingMeta = (existingUser.metadata as Record<string, any>) || {};
        if (!existingName && existingUser.name) existingName = existingUser.name;
      }
    } catch {
      // Continue
    }

    const updatedMetadata = {
      ...existingMeta,
      phone: mobileDigits,
      alternatePhone: cleanAlternateDigits,
      dob: dob || existingMeta.dob || '',
      address: {
        street: street || existingMeta.address?.street || '',
        apartment: apartment || existingMeta.address?.apartment || '',
        city: city || existingMeta.address?.city || '',
        state: state || existingMeta.address?.state || 'Maharashtra',
        pincode: cleanPincode || existingMeta.address?.pincode || '',
        country: country || existingMeta.address?.country || 'India',
        addressType: addressType || existingMeta.address?.addressType || 'Home',
      },
      profile_completed: true,
      profile_updated_at: new Date().toISOString(),
    };

    // 5. Try to update public.awie_users
    let savedToAwieUsers = false;
    try {
      const { error: upsertError } = await supabaseAdmin
        .from('awie_users')
        .upsert(
          {
            email,
            name: existingName || '',
            phone: mobileDigits,
            metadata: updatedMetadata,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );

      if (!upsertError) {
        savedToAwieUsers = true;
      }
    } catch {
      // Continue to fallbacks
    }

    // 6. Sync to public.profiles
    try {
      await supabaseAdmin
        .from('profiles')
        .upsert(
          {
            email,
            full_name: existingName || '',
            phone: mobileDigits,
            metadata: updatedMetadata,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );
    } catch {
      // Continue
    }

    // 7. Sync to Supabase Auth user_metadata so it's always accessible and preserved
    try {
      const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
      const authUser = userList?.users?.find(
        (u) => u.email?.toLowerCase() === email
      );
      if (authUser) {
        await supabaseAdmin.auth.admin.updateUserById(authUser.id, {
          user_metadata: {
            ...(authUser.user_metadata || {}),
            full_name: existingName || authUser.user_metadata?.full_name,
            name: existingName || authUser.user_metadata?.name,
            phone: mobileDigits,
            dob,
            address: updatedMetadata.address,
            metadata: updatedMetadata,
          },
        });
      }
    } catch {
      // Continue
    }

    return NextResponse.json({
      success: true,
      message: 'Profile and delivery details saved successfully.',
      profile: {
        email,
        name: existingName || '',
        phone: mobileDigits,
        alternatePhone: cleanAlternateDigits,
        dob,
        address: updatedMetadata.address,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update profile.' },
      { status: 500 }
    );
  }
}
