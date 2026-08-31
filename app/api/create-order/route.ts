import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, error: 'Razorpay API credentials are missing from server environment.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    let { amount, currency, receipt } = body;

    // Validate amount
    if (!amount || typeof amount !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Valid amount is required.' },
        { status: 400 }
      );
    }

    // Ensure amount is in paise and at least 100 paise (₹1)
    const amountInPaise = Math.round(amount);
    if (amountInPaise < 100) {
      return NextResponse.json(
        { success: false, error: 'Minimum order amount must be at least 100 paise (₹1).' },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: amountInPaise,
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.description || error?.message || 'Failed to create Razorpay order.',
      },
      { status: 500 }
    );
  }
}
