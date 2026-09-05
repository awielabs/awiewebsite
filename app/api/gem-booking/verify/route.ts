import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  generateTicketCode,
  GEM_PRODUCTS,
  GemVersion,
  getGemBookingConfirmationEmail,
  GemBookingRecord,
} from '@/lib/gemPricing';
import { sendGemEmail } from '@/lib/gemEmailServer';
import { findGemBooking, saveGemBooking } from '@/lib/gemBookingStore';

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: 'Razorpay secret key is missing from server environment.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingId,
      customerDetails, // Fallback in case of asynchronous reconciliation
    } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing required payment verification details.' },
        { status: 400 }
      );
    }

    // 1. Verify Razorpay cryptographic signature
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
      console.error('[GEM VERIFY] Signature mismatch:', {
        expected: expectedSignature,
        received: razorpay_signature,
      });
      return NextResponse.json(
        { success: false, error: 'Payment signature verification failed.' },
        { status: 400 }
      );
    }

    // 2. Query booking record from store
    const existingBooking =
      (await findGemBooking(razorpay_order_id)) ||
      (bookingId ? await findGemBooking(bookingId) : null);

    const version: GemVersion = (existingBooking?.product_version || customerDetails?.productVersion || 'v1') as GemVersion;
    const config = GEM_PRODUCTS[version] || GEM_PRODUCTS.v1;

    // Generate guaranteed unique ticket code if not already assigned
    const ticketCode = existingBooking?.ticket_code || generateTicketCode(version);
    const nowIso = new Date().toISOString();

    const bookingPayload: GemBookingRecord = {
      booking_id: existingBooking?.booking_id || bookingId || `BK-${Date.now()}`,
      ticket_code: ticketCode,
      customer_name: existingBooking?.customer_name || customerDetails?.customerName || 'Customer',
      email: existingBooking?.email || customerDetails?.email || '',
      phone: existingBooking?.phone || customerDetails?.phone || '',
      delivery_address: existingBooking?.delivery_address || {
        addressLine: customerDetails?.addressLine || '',
        city: customerDetails?.city || '',
        state: customerDetails?.state || '',
        pincode: customerDetails?.pincode || '',
      },
      product_version: version,
      product_name: config.name,
      launch_price: config.launchPrice,
      regular_price: config.regularPrice,
      booking_amount: config.bookingAmount,
      amount_paid: config.bookingAmount,
      remaining_amount: config.remainingAmount,
      delivery_charge: existingBooking?.delivery_charge || 0,
      razorpay_order_id,
      razorpay_payment_id,
      payment_status: 'paid',
      booking_status: 'BOOKING_CONFIRMED',
      final_payment_status: 'unpaid',
      production_status: 'queued',
      shipping_status: 'unshipped',
      delivery_status: 'pending',
      created_at: existingBooking?.created_at || nowIso,
      updated_at: nowIso,
    };

    // 3. Save in unified store
    await saveGemBooking(bookingPayload);

    // 4. Send Confirmation Email asynchronously
    if (bookingPayload.email) {
      try {
        const { subject, html } = getGemBookingConfirmationEmail(bookingPayload);
        sendGemEmail(bookingPayload.email, subject, html).catch((mailErr) => {
          console.error('[GEM VERIFY] Background email error:', mailErr);
        });
      } catch (mailSetupErr) {
        console.error('[GEM VERIFY] Email generator error:', mailSetupErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and booking confirmed successfully!',
      ticket: {
        bookingId: bookingPayload.booking_id,
        ticketCode: bookingPayload.ticket_code,
        customerName: bookingPayload.customer_name,
        email: bookingPayload.email,
        phone: bookingPayload.phone,
        deliveryAddress: bookingPayload.delivery_address,
        productVersion: bookingPayload.product_version,
        productName: bookingPayload.product_name,
        launchPrice: bookingPayload.launch_price,
        regularPrice: bookingPayload.regular_price,
        bookingAmount: bookingPayload.booking_amount,
        amountPaid: bookingPayload.amount_paid,
        remainingAmount: bookingPayload.remaining_amount,
        deliveryCharge: bookingPayload.delivery_charge,
        paymentStatus: 'paid',
        bookingStatus: 'BOOKING_CONFIRMED',
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        createdAt: bookingPayload.created_at,
      },
    });
  } catch (error: any) {
    console.error('[GEM VERIFY ERROR]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal payment verification error.' },
      { status: 500 }
    );
  }
}
