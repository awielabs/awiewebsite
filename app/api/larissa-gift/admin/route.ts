import { NextResponse } from 'next/server';
import {
  getAllGiftOrders,
  updateGiftOrderStatus,
  GiftStatus
} from '@/lib/larissa-gift-store';

const ADMIN_PASSCODE = 'shovin1219';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode, action } = body;

    if (!passcode || passcode !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid gift admin passcode.' },
        { status: 401 }
      );
    }

    if (action === 'verify') {
      return NextResponse.json({ success: true, message: 'Passcode verified.' });
    }

    if (action === 'list') {
      const orders = await getAllGiftOrders();
      return NextResponse.json({ success: true, orders });
    }

    if (action === 'update_status') {
      const {
        trackingCode,
        status,
        customNote,
        courierPartner,
        courierAwb,
        estimatedDelivery
      } = body;

      if (!trackingCode || !status) {
        return NextResponse.json(
          { success: false, error: 'Tracking code and status are required.' },
          { status: 400 }
        );
      }

      const validStatuses: GiftStatus[] = [
        'order_placed',
        'packed',
        'in_transit',
        'out_for_delivery',
        'delivered'
      ];

      if (!validStatuses.includes(status as GiftStatus)) {
        return NextResponse.json(
          { success: false, error: `Invalid status: ${status}` },
          { status: 400 }
        );
      }

      const updated = await updateGiftOrderStatus(
        trackingCode,
        status as GiftStatus,
        {
          customNote,
          courierPartner,
          courierAwb,
          estimatedDelivery
        }
      );

      if (!updated) {
        return NextResponse.json(
          { success: false, error: `Order with tracking code "${trackingCode}" not found.` },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        order: updated,
        message: `Status updated to "${updated.statusTitle}" successfully!`
      });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported action: ${action}` },
      { status: 400 }
    );
  } catch (error) {
    console.error('[LARISSA_GIFT_ADMIN_API_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing admin request.' },
      { status: 500 }
    );
  }
}
