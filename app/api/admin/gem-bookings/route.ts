import { NextResponse } from 'next/server';
import { getAllGemBookings, findGemBooking, saveGemBooking } from '@/lib/gemBookingStore';

function checkAdminAuth(request: Request): boolean {
  const passcode = request.headers.get('x-admin-passcode') || '';
  const validPasscodes = ['awie@19(-_-)', 'awie2026', 'admin123'];
  const envPasscode = process.env.ADMIN_PASSCODE;
  if (envPasscode && passcode === envPasscode) return true;
  return validPasscodes.includes(passcode.trim());
}

export async function GET(request: Request) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin passcode required.' },
        { status: 401 }
      );
    }

    const list = await getAllGemBookings();

    // Calculate Admin Aggregate Metrics
    let totalBookings = list.length;
    let v1Bookings = 0;
    let v2Bookings = 0;
    let paidBookings = 0;
    let pendingPayments = 0;
    let productionOrders = 0;
    let finalPaymentPending = 0;
    let completedOrders = 0;
    let totalBookingMoneyCollected = 0;
    let totalFinalPaymentsCollected = 0;
    let totalDeliveryCharges = 0;

    for (const b of list) {
      if (b.product_version === 'v1') v1Bookings++;
      if (b.product_version === 'v2') v2Bookings++;

      if (b.payment_status === 'paid') {
        paidBookings++;
        totalBookingMoneyCollected += Number(b.booking_amount) || 0;
      } else {
        pendingPayments++;
      }

      if (b.final_payment_status === 'paid') {
        totalFinalPaymentsCollected += Number(b.remaining_amount) || 0;
      }

      if (b.delivery_charge) {
        totalDeliveryCharges += Number(b.delivery_charge) || 0;
      }

      if (b.booking_status === 'IN_PRODUCTION') {
        productionOrders++;
      } else if (b.booking_status === 'FINAL_PAYMENT_PENDING' || b.booking_status === 'READY_FOR_DELIVERY') {
        finalPaymentPending++;
      } else if (b.booking_status === 'COMPLETED' || b.booking_status === 'DELIVERED') {
        completedOrders++;
      }
    }

    const totalProductRevenue = totalBookingMoneyCollected + totalFinalPaymentsCollected;

    return NextResponse.json({
      success: true,
      metrics: {
        totalBookings,
        v1Bookings,
        v2Bookings,
        paidBookings,
        pendingPayments,
        productionOrders,
        finalPaymentPending,
        completedOrders,
        totalBookingMoneyCollected,
        totalFinalPaymentsCollected,
        totalProductRevenue,
        totalDeliveryCharges,
      },
      bookings: list,
    });
  } catch (err: any) {
    console.error('[ADMIN GEM GET ERROR]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error fetching bookings.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin passcode required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Booking ID is required for update.' },
        { status: 400 }
      );
    }

    const booking = await findGemBooking(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found.' },
        { status: 404 }
      );
    }

    const updatedBooking = {
      ...booking,
      ...(body.booking_status !== undefined && { booking_status: body.booking_status }),
      ...(body.production_status !== undefined && { production_status: body.production_status }),
      ...(body.shipping_status !== undefined && { shipping_status: body.shipping_status }),
      ...(body.delivery_status !== undefined && { delivery_status: body.delivery_status }),
      ...(body.final_payment_status !== undefined && { final_payment_status: body.final_payment_status }),
      ...(body.tracking_id !== undefined && { tracking_id: body.tracking_id }),
      ...(body.admin_notes !== undefined && { admin_notes: body.admin_notes }),
      ...(body.delivery_charge !== undefined && { delivery_charge: Number(body.delivery_charge) }),
    };

    const saved = await saveGemBooking(updatedBooking);

    return NextResponse.json({
      success: true,
      booking: saved,
    });
  } catch (err: any) {
    console.error('[ADMIN GEM PATCH ERROR]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error updating booking.' },
      { status: 500 }
    );
  }
}
