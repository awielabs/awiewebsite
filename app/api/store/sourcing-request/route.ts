import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rlcugpexkehndzyecjev.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let productName = '';
    let quantity = '';
    let specifications = '';
    let brandModel = '';
    let email = '';
    let name = '';
    let phone = '';
    let userId = '';
    let imageBuffer: Buffer | null = null;
    let imageExt = 'png';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      productName = String(formData.get('productName') || '').trim();
      quantity = String(formData.get('quantity') || '').trim();
      specifications = String(formData.get('specifications') || '').trim();
      brandModel = String(formData.get('brandModel') || '').trim();
      email = String(formData.get('email') || '').trim().toLowerCase();
      name = String(formData.get('name') || '').trim();
      phone = String(formData.get('phone') || '').trim();
      userId = String(formData.get('userId') || '').trim();

      const file = formData.get('image');
      if (file && file instanceof File && file.size > 0) {
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { success: false, error: 'Reference image must be under 5 MB.' },
            { status: 400 }
          );
        }
        const arrayBuffer = await file.arrayBuffer();
        imageBuffer = Buffer.from(arrayBuffer);
        const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
        imageExt = ['png', 'jpg', 'jpeg', 'webp'].includes(ext) ? ext : 'png';
      }
    } else {
      const body = await request.json();
      productName = String(body.productName || '').trim();
      quantity = String(body.quantity || '').trim();
      specifications = String(body.specifications || '').trim();
      brandModel = String(body.brandModel || '').trim();
      email = String(body.email || '').trim().toLowerCase();
      name = String(body.name || '').trim();
      phone = String(body.phone || '').trim();
      userId = String(body.userId || '').trim();
    }

    // 1. Validation
    if (!productName || productName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please tell us the product or component name you need sourced.' },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address so we can reply with availability.' },
        { status: 400 }
      );
    }

    if (phone && phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid 10-digit phone/WhatsApp number.' },
        { status: 400 }
      );
    }

    if (!supabaseKey) {
      return NextResponse.json(
        { success: false, error: 'Sourcing service is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 2. Upload reference image to private 'sourcing-requests' bucket (auto-deleted within 3 days)
    let imagePath: string | null = null;
    if (imageBuffer) {
      const fileName = `${email.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.${imageExt}`;
      const { error: uploadError } = await supabase.storage
        .from('sourcing-requests')
        .upload(fileName, imageBuffer, {
          contentType: `image/${imageExt === 'jpg' ? 'jpeg' : imageExt}`,
          upsert: false,
        });
      if (!uploadError) {
        imagePath = fileName;
      }
      // Upload failure is non-fatal: request is still saved without image
    }

    // 3. Persist sourcing request
    const { error: insertError } = await supabase.from('sourcing_requests').insert({
      user_id: userId || null,
      email,
      name: name || null,
      phone: phone || null,
      product_name: productName,
      quantity: quantity || null,
      specifications: specifications || null,
      brand_model: brandModel || null,
      image_path: imagePath,
      status: 'pending',
    });

    if (insertError) {
      console.error('Sourcing request insert failed:', insertError.message);
      const tableMissing = /does not exist|relation|schema/i.test(insertError.message || '');
      return NextResponse.json(
        {
          success: false,
          tableMissing,
          error: tableMissing
            ? 'Sourcing table is not set up yet. Please run create_sourcing_requests_table.sql in the Supabase SQL Editor.'
            : 'Failed to submit your sourcing request. Please try again.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Sourcing request received. Our team will check availability and reply within 7 days.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to submit sourcing request. Please try again.' },
      { status: 500 }
    );
  }
}
