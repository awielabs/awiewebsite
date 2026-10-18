import { NextResponse } from 'next/server';
import {
  getAllGiftOrders,
  updateGiftOrderStatus,
  saveGiftOrder,
  deleteGiftOrder,
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

    if (action === 'create_order') {
      const {
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        note,
        status,
        courierPartner,
        courierAwb,
        estimatedDelivery
      } = body;

      if (!name || !phone || !address) {
        return NextResponse.json(
          { success: false, error: 'Name, phone, and address are required to create order.' },
          { status: 400 }
        );
      }

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const trackingCode = body.trackingCode?.trim() || `AWIE-LARISSA-${randomSuffix}`;

      const newOrder = await saveGiftOrder({
        trackingCode,
        name: String(name).trim(),
        email: email ? String(email).trim().toLowerCase() : '',
        phone: String(phone).trim(),
        address: String(address).trim(),
        city: city ? String(city).trim() : '',
        state: state ? String(state).trim() : '',
        pincode: pincode ? String(pincode).trim() : '',
        note: note ? String(note).trim() : '',
        status: status as GiftStatus,
        courierPartner,
        courierAwb,
        estimatedDelivery
      });

      return NextResponse.json({
        success: true,
        order: newOrder,
        message: `Order "${trackingCode}" created and synced successfully!`
      });
    }

    if (action === 'delete_order') {
      const { trackingCode } = body;
      if (!trackingCode) {
        return NextResponse.json(
          { success: false, error: 'Tracking code is required to delete order.' },
          { status: 400 }
        );
      }
      const deleted = await deleteGiftOrder(trackingCode);
      return NextResponse.json({
        success: true,
        deleted,
        message: deleted ? `Order ${trackingCode} deleted.` : 'Order not found.'
      });
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
