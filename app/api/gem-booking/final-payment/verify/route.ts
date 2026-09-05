import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  getGemFinalPaymentConfirmationEmail,
  GemBookingRecord,
} from '@/lib/gemPricing';
import { sendGemEmail } from '@/lib/gemEmailServer';
import { findGemBooking, saveGemBooking } from '@/lib/gemBookingStore';

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: 'Razorpay secret key missing on server.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      ticketCode,
    } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing payment signature credentials.' },
        { status: 400 }
      );
    }

    // 1. Verify signature
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
        { success: false, error: 'Final payment signature verification failed.' },
        { status: 400 }
      );
    }

    // 2. Fetch booking
    const booking =
      (await findGemBooking(razorpay_order_id)) ||
      (ticketCode ? await findGemBooking(ticketCode) : null);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking record not found for final payment confirmation.' },
        { status: 404 }
      );
    }

    const launchPrice = Number(booking.launch_price);
    const deliveryCharge = Number(booking.delivery_charge) || 0;
    const totalPaid = launchPrice + deliveryCharge;

    // 3. Update booking record
    const updatedBooking: GemBookingRecord = {
      ...booking,
      final_razorpay_payment_id: razorpay_payment_id,
      final_payment_status: 'paid',
      booking_status: 'FINAL_PAYMENT_RECEIVED',
      amount_paid: totalPaid,
      remaining_amount: 0,
    };

    await saveGemBooking(updatedBooking);

    // 4. Send email receipt
    if (booking.email) {
      try {
        const { subject, html } = getGemFinalPaymentConfirmationEmail(updatedBooking);
        sendGemEmail(booking.email, subject, html).catch((err) => {
          console.error('[GEM FINAL EMAIL ERROR]:', err);
        });
      } catch (mailErr) {
        console.error('[GEM FINAL EMAIL PREP ERROR]:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Final payment verified successfully! Your order is now being processed for shipping.',
      booking: {
        ticketCode: booking.ticket_code,
        customerName: booking.customer_name,
        amountPaid: totalPaid,
        remainingAmount: 0,
        finalPaymentStatus: 'paid',
        bookingStatus: 'FINAL_PAYMENT_RECEIVED',
        razorpayPaymentId: razorpay_payment_id,
      },
    });
  } catch (err: any) {
    console.error('[GEM FINAL VERIFY ERROR]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Error verifying final payment.' },
      { status: 500 }
    );
  }
}
