import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { findGemBooking, saveGemBooking } from '@/lib/gemBookingStore';

export async function POST(request: Request) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, error: 'Razorpay configuration missing on server.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const rawCode = body.ticketCode || '';
    const code = rawCode.trim().toUpperCase();

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Ticket code is required.' },
        { status: 400 }
      );
    }

    const booking = await findGemBooking(code);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking record not found for this ticket code.' },
        { status: 404 }
      );
    }

    if (booking.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, error: 'The initial pre-booking payment is not marked as paid.' },
        { status: 400 }
      );
    }

    if (booking.final_payment_status === 'paid' || booking.booking_status === 'FINAL_PAYMENT_RECEIVED') {
      return NextResponse.json(
        { success: false, error: 'The final remaining balance for this booking has already been paid in full.' },
        { status: 400 }
      );
    }

    // Determine remaining amount strictly on backend
    const remainingAmount = Number(booking.remaining_amount) || 0;
    const deliveryCharge = Number(booking.delivery_charge) || 0;
    const totalDue = remainingAmount + deliveryCharge;

    if (totalDue <= 0) {
      return NextResponse.json(
        { success: false, error: 'No balance remaining for this booking.' },
        { status: 400 }
      );
    }

    const totalDuePaise = totalDue * 100;
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receiptId = `FIN-${booking.ticket_code}-${Date.now().toString().slice(-6)}`;
    const razorpayOrder = await razorpay.orders.create({
      amount: totalDuePaise,
      currency: 'INR',
      receipt: receiptId,
      notes: {
        type: 'GEM_FINAL_PAYMENT',
        ticketCode: booking.ticket_code || '',
        bookingId: booking.booking_id,
        customerName: booking.customer_name,
        remainingAmount: remainingAmount.toString(),
        deliveryCharge: deliveryCharge.toString(),
      },
    });

    // Update booking record with final_razorpay_order_id
    await saveGemBooking({
      ...booking,
      final_razorpay_order_id: razorpayOrder.id,
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: totalDue,
      amountPaise: totalDuePaise,
      remainingAmount,
      deliveryCharge,
      currency: 'INR',
      keyId,
      booking: {
        ticketCode: booking.ticket_code,
        customerName: booking.customer_name,
        productName: booking.product_name,
      },
    });
  } catch (err: any) {
    console.error('[GEM FINAL ORDER ERROR]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to create order for remaining balance.' },
      { status: 500 }
    );
  }
}
