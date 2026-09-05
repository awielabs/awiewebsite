import { NextResponse } from 'next/server';
import {
  getAllGemBookings,
  isGemLaunchUnlocked,
  setGemLaunchUnlocked,
  saveGemBooking,
} from '@/lib/gemBookingStore';
import { GEM_LAUNCH_DATE_STRING } from '@/lib/gemPricing';
import { sendGemLaunchNotificationEmail } from '@/lib/gemEmailServer';

/**
 * GET /api/admin/gem-bookings/trigger-launch
 * Check current launch status and eligible pre-booked customers
 */
export async function GET() {
  try {
    const allBookings = await getAllGemBookings();
    const eligibleBookings = allBookings.filter(
      (b) => b.payment_status === 'paid' && b.final_payment_status !== 'paid'
    );

    return NextResponse.json({
      success: true,
      isUnlocked: isGemLaunchUnlocked(),
      launchDate: GEM_LAUNCH_DATE_STRING,
      eligibleCount: eligibleBookings.length,
      customers: eligibleBookings.map((b) => ({
        ticketCode: b.ticket_code,
        customerName: b.customer_name,
        email: b.email,
        phone: b.phone,
        productVersion: b.product_version,
        productName: b.product_name,
        remainingAmount: b.remaining_amount,
        bookingStatus: b.booking_status,
      })),
    });
  } catch (err: any) {
    console.error('[ADMIN TRIGGER-LAUNCH GET ERROR]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch launch status.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/gem-bookings/trigger-launch
 * Action: Trigger launch, unlock balance payments, and dispatch notification emails
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action = 'launch_and_notify', unlock = true, portalBaseUrl } = body;

    // Toggle lock action
    if (action === 'toggle_lock') {
      const currentState = isGemLaunchUnlocked();
      const newState = setGemLaunchUnlocked(!currentState);
      return NextResponse.json({
        success: true,
        isUnlocked: newState,
        message: newState
          ? 'Launch day has been unlocked! Customers can now pay their remaining balance.'
          : 'Launch day has been locked. Remaining balance payments are now locked.',
      });
    }

    // Default action: unlock launch and optionally send launch notification emails
    setGemLaunchUnlocked(unlock);

    const allBookings = await getAllGemBookings();
    const eligibleBookings = allBookings.filter(
      (b) => b.payment_status === 'paid' && b.final_payment_status !== 'paid'
    );

    let emailsSent = 0;
    const errors: string[] = [];

    if (body.sendEmails !== false) {
      for (const booking of eligibleBookings) {
        if (!booking.email) continue;
        try {
          const sent = await sendGemLaunchNotificationEmail(booking, portalBaseUrl);
          if (sent) {
            emailsSent++;
            // Update booking status if currently prebooked or in production
            if (
              booking.booking_status === 'BOOKING_CONFIRMED' ||
              booking.booking_status === 'IN_PRODUCTION' ||
              booking.booking_status === 'READY_FOR_DELIVERY'
            ) {
              await saveGemBooking({
                ...booking,
                booking_status: 'FINAL_PAYMENT_PENDING',
              });
            }
          } else {
            errors.push(`Failed to send email to ${booking.email} (${booking.ticket_code})`);
          }
        } catch (err: any) {
          errors.push(`Error emailing ${booking.email}: ${err?.message || err}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      isUnlocked: true,
      launchDate: GEM_LAUNCH_DATE_STRING,
      eligibleCount: eligibleBookings.length,
      emailsSent,
      errors: errors.length > 0 ? errors : undefined,
      message: `Launch Day triggered! ${emailsSent} customer(s) notified via email. Balance payments are now unlocked.`,
    });
  } catch (err: any) {
    console.error('[ADMIN TRIGGER-LAUNCH POST ERROR]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to trigger launch.' },
      { status: 500 }
    );
  }
}
