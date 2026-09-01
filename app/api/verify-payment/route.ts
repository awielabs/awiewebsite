import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: 'Razorpay secret key is missing.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing required payment verification fields.' },
        { status: 400 }
      );
    }

    // Generate expected signature
    const signatureBody = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(signatureBody)
      .digest('hex');

    const isMatch = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed: Signature mismatch.' },
        { status: 400 }
      );
    }

    // Optional: Log payment to Supabase or send email notification
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('store_orders').update({
          status: 'paid',
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          paid_at: new Date().toISOString(),
        }).eq('order_id', razorpay_order_id);
      } catch (dbError) {
        console.warn('Supabase order update skipped:', dbError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully!',
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
    });
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error during payment verification.',
      },
      { status: 500 }
    );
  }
}
