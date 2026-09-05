import { NextResponse } from 'next/server';
import { findGemBooking, isGemLaunchUnlocked } from '@/lib/gemBookingStore';
import { GEM_LAUNCH_DATE_STRING } from '@/lib/gemPricing';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawCode = searchParams.get('code') || '';
    const code = rawCode.trim().toUpperCase();

    if (!code || code.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid GEM Booking Ticket Code (e.g. AWIE-G1-XXXXXX).' },
        { status: 400 }
      );
    }

    const booking = await findGemBooking(code);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: `No booking found for ticket code "${code}". Please check your code and try again.` },
        { status: 404 }
      );
    }

    // Mask sensitive details for public lookup security
    const maskEmail = (email: string) => {
      const parts = email.split('@');
      if (parts.length !== 2) return email;
      const name = parts[0];
      const masked = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
      return `${masked}@${parts[1]}`;
    };

    const maskPhone = (phone: string) => {
      const digits = phone.replace(/\D/g, '');
      if (digits.length >= 10) {
        return `${digits.slice(0, 2)}******${digits.slice(-2)}`;
      }
      return phone;
    };

    const remainingAmount = Number(booking.remaining_amount) || 0;
    const deliveryCharge = Number(booking.delivery_charge) || 0;
    const isFinalPaid = booking.final_payment_status === 'paid' || booking.booking_status === 'FINAL_PAYMENT_RECEIVED';

    return NextResponse.json({
      success: true,
      booking: {
        ticketCode: booking.ticket_code,
        bookingId: booking.booking_id,
        customerName: booking.customer_name,
        maskedEmail: maskEmail(booking.email || ''),
        maskedPhone: maskPhone(booking.phone || ''),
        productVersion: booking.product_version,
        productName: booking.product_name,
        launchPrice: booking.launch_price,
        regularPrice: booking.regular_price,
        bookingAmount: booking.booking_amount,
        amountPaid: booking.amount_paid,
        remainingAmount: isFinalPaid ? 0 : remainingAmount,
        deliveryCharge: isFinalPaid ? 0 : deliveryCharge,
        totalPayableNow: isFinalPaid ? 0 : remainingAmount + deliveryCharge,
        bookingStatus: booking.booking_status,
        finalPaymentStatus: booking.final_payment_status || 'unpaid',
        productionStatus: booking.production_status || 'queued',
        shippingStatus: booking.shipping_status || 'unshipped',
        deliveryStatus: booking.delivery_status || 'pending',
        trackingId: booking.tracking_id || null,
        createdAt: booking.created_at,
        updatedAt: booking.updated_at,
        isLaunchUnlocked: isGemLaunchUnlocked(),
        launchDate: GEM_LAUNCH_DATE_STRING,
        isEligibleForFinalPayment: !isFinalPaid && (booking.booking_status === 'READY_FOR_DELIVERY' || booking.booking_status === 'FINAL_PAYMENT_PENDING' || booking.booking_status === 'BOOKING_CONFIRMED'),
      },
    });
  } catch (err: any) {
    console.error('[GEM LOOKUP ERROR]:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error while searching booking.' },
      { status: 500 }
    );
  }
}
