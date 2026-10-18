import { NextResponse } from 'next/server';
import { getGiftOrderByCode } from '@/lib/larissa-gift-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code || !code.trim()) {
      return NextResponse.json(
        { success: false, error: 'Tracking code is required.' },
        { status: 400 }
      );
    }

    const order = await getGiftOrderByCode(code.trim());

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: `No gift delivery found for code "${code.trim()}". Please check your gift code or contact Shovin.`
        },
        { status: 404 }
      );
    }

    // Mask phone number slightly for privacy if desired (or keep clean for recipient)
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        trackingCode: order.trackingCode,
        name: order.name,
        address: order.address,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        status: order.status,
        statusTitle: order.statusTitle,
        statusMessage: order.statusMessage,
        courierPartner: order.courierPartner,
        courierAwb: order.courierAwb,
        estimatedDelivery: order.estimatedDelivery,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        history: order.history
      }
    });
  } catch (error) {
    console.error('[LARISSA_GIFT_TRACK_API_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while tracking gift.' },
      { status: 500 }
    );
  }
}
