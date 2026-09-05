import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { GEM_PRODUCTS, GemVersion } from '@/lib/gemPricing';
import { saveGemBooking } from '@/lib/gemBookingStore';

export async function POST(request: Request) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, error: 'Payment gateway configuration is missing on the server.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const version = body.productVersion as GemVersion;

    if (!version || (version !== 'v1' && version !== 'v2')) {
      return NextResponse.json(
        { success: false, error: 'Invalid GEM version selected.' },
        { status: 400 }
      );
    }

    const customerName = (body.customerName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const phone = (body.phone || '').trim();
    const addressLine = (body.addressLine || '').trim();
    const city = (body.city || '').trim();
    const state = (body.state || '').trim();
    const pincode = (body.pincode || '').trim();

    if (!customerName || customerName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit phone number.' },
        { status: 400 }
      );
    }

    if (!addressLine || !city || !state || !pincode) {
      return NextResponse.json(
        { success: false, error: 'Please provide your complete delivery address, city, state, and pincode.' },
        { status: 400 }
      );
    }

    // Determine pricing strictly on backend
    const productConfig = GEM_PRODUCTS[version];
    const bookingAmount = productConfig.bookingAmount; // ₹199 or ₹299
    const bookingAmountPaise = bookingAmount * 100;

    const bookingId = `BK-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const deliveryAddress = {
      addressLine,
      city,
      state,
      pincode,
      landmark: (body.landmark || '').trim(),
    };

    // 1. Create Razorpay order
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: bookingAmountPaise,
      currency: 'INR',
      receipt: bookingId,
      notes: {
        bookingId,
        productVersion: version,
        productName: productConfig.name,
        customerName,
        email,
        phone,
      },
    });

    // 2. Persist initial pending booking in store
    await saveGemBooking({
      booking_id: bookingId,
      customer_name: customerName,
      email,
      phone,
      delivery_address: deliveryAddress,
      product_version: version,
      product_name: productConfig.name,
      launch_price: productConfig.launchPrice,
      regular_price: productConfig.regularPrice,
      booking_amount: bookingAmount,
      amount_paid: 0,
      remaining_amount: productConfig.remainingAmount,
      delivery_charge: 0,
      razorpay_order_id: razorpayOrder.id,
      payment_status: 'pending',
      booking_status: 'PENDING_PAYMENT',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      bookingId,
      amount: bookingAmount,
      amountPaise: bookingAmountPaise,
      currency: 'INR',
      keyId,
      product: {
        version,
        name: productConfig.name,
        launchPrice: productConfig.launchPrice,
        bookingAmount: productConfig.bookingAmount,
        remainingAmount: productConfig.remainingAmount,
      },
    });
  } catch (error: any) {
    console.error('[GEM CREATE ORDER ERROR]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to initiate pre-booking payment order.' },
      { status: 500 }
    );
  }
}
