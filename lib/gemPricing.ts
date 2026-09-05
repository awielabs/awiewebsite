export type GemVersion = 'v1' | 'v2';

export interface GemProductConfig {
  version: GemVersion;
  name: string;
  shortName: string;
  tagline: string;
  launchPrice: number; // in INR
  regularPrice: number; // in INR
  bookingAmount: number; // in INR
  remainingAmount: number; // launchPrice - bookingAmount
  specs: string[];
}

export const GEM_PRODUCTS: Record<GemVersion, GemProductConfig> = {
  v1: {
    version: 'v1',
    name: 'GEM v1 Standard',
    shortName: 'GEM v1',
    tagline: 'Autonomous OLED Desktop Companion with Li-ion Power Core',
    launchPrice: 1200,
    regularPrice: 1300,
    bookingAmount: 199,
    remainingAmount: 1001, // 1200 - 199
    specs: [
      '1.3" 128x64 Contrast OLED Eyes',
      'Dual-Core 240MHz ESP32 Architecture',
      '2500mAh Li-ion Type-C Rechargeable',
      '4 Pure White Ambient LED Indicators',
      'Piezo Acoustic Chimes & Touch Reactions',
    ],
  },
  v2: {
    version: 'v2',
    name: 'GEM v2 Biometric',
    shortName: 'GEM v2',
    tagline: 'Next-Gen Companion with MAX30102 PPG Heart Rate & Radar Sentinel',
    launchPrice: 1650,
    regularPrice: 1750,
    bookingAmount: 299,
    remainingAmount: 1351, // 1650 - 299
    specs: [
      'Optical MAX30102 PPG Pulse & SpO2 Sensor',
      'Desk Security Motion Radar Sentinel',
      '1.3" 128x64 Contrast OLED Eyes',
      'Dual-Core 240MHz ESP32 Architecture',
      '2500mAh Li-ion Type-C Rechargeable',
    ],
  },
};

export const GEM_LAUNCH_DATE_STRING = '13 September 2026';
export const GEM_LAUNCH_DATE_ISO = '2026-09-13T00:00:00+05:30';

/**
 * Generate a collision-proof unique ticket code formatted as:
 * AWIE-G1-XXXXXX or AWIE-G2-XXXXXX
 * Works in both server (Node.js) and browser environments.
 */
export function generateTicketCode(version: GemVersion): string {
  const prefix = version === 'v1' ? 'AWIE-G1' : 'AWIE-G2';
  const charset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let suffix = '';
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    const bytes = new Uint8Array(6);
    globalThis.crypto.getRandomValues(bytes);
    for (let i = 0; i < 6; i++) {
      suffix += charset[bytes[i] % charset.length];
    }
  } else {
    for (let i = 0; i < 6; i++) {
      suffix += charset[Math.floor(Math.random() * charset.length)];
    }
  }
  return `${prefix}-${suffix}`;
}

export interface GemBookingRecord {
  id?: string;
  booking_id: string;
  ticket_code?: string;
  customer_name: string;
  email: string;
  phone: string;
  delivery_address: {
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  product_version: GemVersion;
  product_name: string;
  launch_price: number;
  regular_price: number;
  booking_amount: number;
  amount_paid: number;
  remaining_amount: number;
  delivery_charge: number;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  payment_status: 'pending' | 'paid' | 'failed';
  booking_status:
    | 'PENDING_PAYMENT'
    | 'BOOKING_CONFIRMED'
    | 'IN_PRODUCTION'
    | 'READY_FOR_DELIVERY'
    | 'FINAL_PAYMENT_PENDING'
    | 'FINAL_PAYMENT_RECEIVED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'COMPLETED';
  final_razorpay_order_id?: string;
  final_razorpay_payment_id?: string;
  final_payment_status?: 'unpaid' | 'paid';
  production_status?: string;
  shipping_status?: string;
  delivery_status?: string;
  tracking_id?: string;
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Generate HTML email for Pre-Booking Confirmation
 */
export function getGemBookingConfirmationEmail(booking: GemBookingRecord): { subject: string; html: string } {
  const subject = `Your GEM Pre-Booking is Confirmed! (Booking ID: ${booking.booking_id})`;
  const config = GEM_PRODUCTS[booking.product_version];
  const dateFormatted = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F8FAFC;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #0B1120;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background: linear-gradient(180deg, #111C38 0%, #0D162C 100%); border-radius: 24px; overflow: hidden; border: 1px solid #1E293B; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; background: radial-gradient(circle at center, #1E3A8A 0%, #0F172A 100%); border-bottom: 1px solid #1E293B;">
              <div style="display: inline-block; padding: 4px 14px; background-color: rgba(37, 99, 235, 0.2); border: 1px solid #2563EB; border-radius: 999px; font-size: 11px; font-weight: 800; color: #60A5FA; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
                AWIE OFFICIAL HARDWARE
              </div>
              <h1 style="margin: 0 0 6px 0; font-size: 26px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px;">
                Your GEM Pre-Booking is Confirmed!
              </h1>
              <p style="margin: 0; font-size: 14px; color: #94A3B8; font-weight: 500;">
                Thank you for reserving your own-made companion device.
              </p>
            </td>
          </tr>

          <!-- Digital Ticket Pass -->
          <tr>
            <td style="padding: 28px 32px 16px 32px;">
              <div style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border: 2px dashed #3B82F6; border-radius: 18px; padding: 24px; position: relative;">
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="vertical-align: top;">
                      <span style="font-size: 11px; font-weight: 800; color: #93C5FD; text-transform: uppercase; letter-spacing: 0.8px;">Booking ID</span>
                      <div style="font-size: 24px; font-weight: 900; color: #60A5FA; letter-spacing: 2px; font-family: monospace; margin: 4px 0 12px 0;">${booking.booking_id}
                      </div>
                    </td>
                    <td align="right" style="vertical-align: top;">
                      <span style="display: inline-block; padding: 6px 12px; background-color: #10B981; color: #FFFFFF; font-size: 11px; font-weight: 800; border-radius: 8px; letter-spacing: 0.5px;">
                        CONFIRMED
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="height: 1px; background: #334155; margin: 12px 0 16px 0;"></div>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px;">
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 8px; width: 45%;">Device Model:</td>
                    <td style="color: #FFFFFF; font-weight: 700; padding-bottom: 8px;">${config.name}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 8px;">Customer Name:</td>
                    <td style="color: #FFFFFF; font-weight: 700; padding-bottom: 8px;">${booking.customer_name}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 8px;">Date of Booking:</td>
                    <td style="color: #FFFFFF; font-weight: 600; padding-bottom: 8px;">${dateFormatted}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 8px;">Pre-Booking Paid:</td>
                    <td style="color: #34D399; font-weight: 800; padding-bottom: 8px;">₹${booking.booking_amount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 8px;">Special Launch Price:</td>
                    <td style="color: #FFFFFF; font-weight: 700; padding-bottom: 8px;">₹${booking.launch_price.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8;">Remaining Balance:</td>
                    <td style="color: #F59E0B; font-weight: 800;">₹${booking.remaining_amount.toLocaleString()} (Payable before delivery)</td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>

          <!-- Delivery Address Summary -->
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <div style="background-color: rgba(15, 23, 42, 0.6); border: 1px solid #1E293B; border-radius: 14px; padding: 18px;">
                <span style="font-size: 11px; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 6px;">
                  Delivery Address On File
                </span>
                <p style="margin: 0; font-size: 13px; color: #E2E8F0; line-height: 1.6;">
                  ${booking.delivery_address.addressLine}<br>
                  ${booking.delivery_address.city}, ${booking.delivery_address.state} - ${booking.delivery_address.pincode}<br>
                  <strong>Contact:</strong> ${booking.phone} | ${booking.email}
                </p>
              </div>
            </td>
          </tr>

          <!-- Important Pricing & Production Policy Note -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <div style="background-color: rgba(37, 99, 235, 0.08); border-left: 4px solid #2563EB; border-radius: 8px; padding: 14px 16px;">
                <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #93C5FD;">
                  ✓ Pre-Booking Guarantee
                </p>
                <p style="margin: 0; font-size: 12px; color: #94A3B8; line-height: 1.5;">
                  Your pre-booking amount of <strong>₹${booking.booking_amount}</strong> is guaranteed and fully adjusted against the final product launch price of <strong>₹${booking.launch_price}</strong>.
                  When production completes, you will pay only the remaining balance of <strong>₹${booking.remaining_amount}</strong> plus any standard courier delivery fee.
                </p>
              </div>
            </td>
          </tr>

          <!-- Call to Action Button -->
          <tr>
            <td align="center" style="padding: 0 32px 32px 32px;">
              <a href="https://awie.in/gem-booking/lookup?code=${encodeURIComponent(booking.booking_id)}" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; font-size: 14px; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);">
                Track Booking Status &amp; View Ticket →
              </a>
              <p style="margin: 12px 0 0 0; font-size: 11px; color: #64748B;">
                You can check your booking status anytime on awie.in using your Booking ID <strong>${booking.booking_id}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #070D19; border-top: 1px solid #1E293B; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 700; color: #94A3B8;">
                AWIE &bull; Engineering &amp; Technology Services
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                Nerul, Navi Mumbai, Maharashtra &bull; support@awie.in
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { subject, html };
}

/**
 * Generate HTML email for Final Payment Receipt
 */
export function getGemFinalPaymentConfirmationEmail(booking: GemBookingRecord): { subject: string; html: string } {
  const subject = `Final Payment Received for GEM Pre-Booking! (${booking.booking_id})`;
  const config = GEM_PRODUCTS[booking.product_version];

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F8FAFC;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0B1120; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #111C38; border-radius: 20px; border: 1px solid #1E293B; overflow: hidden;">
          <tr>
            <td style="padding: 28px 32px; background-color: #10B981; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; color: #FFFFFF; font-weight: 900;">Final Payment Successful!</h1>
              <p style="margin: 6px 0 0 0; color: #D1FAE5; font-size: 13px;">Your ${config.name} order is fully paid and queued for shipping.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 32px;">
              <p style="font-size: 14px; line-height: 1.6; color: #CBD5E1;">
                Hello <strong>${booking.customer_name}</strong>,<br><br>
                We have received your final payment of <strong>₹${booking.remaining_amount + booking.delivery_charge}</strong> for booking <strong>${booking.booking_id}</strong>.
              </p>
              <div style="background-color: #0F172A; border-radius: 12px; padding: 18px; margin: 20px 0; border: 1px solid #1E293B;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px;">
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 6px;">Pre-Booking Amount:</td>
                    <td style="color: #FFFFFF; font-weight: 600; padding-bottom: 6px;">₹${booking.booking_amount}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 6px;">Remaining Product Balance:</td>
                    <td style="color: #FFFFFF; font-weight: 600; padding-bottom: 6px;">₹${booking.remaining_amount}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 6px;">Delivery / Shipping Fee:</td>
                    <td style="color: #FFFFFF; font-weight: 600; padding-bottom: 6px;">₹${booking.delivery_charge}</td>
                  </tr>
                  <tr style="border-top: 1px solid #334155;">
                    <td style="color: #34D399; font-weight: 800; padding-top: 8px;">Total Paid:</td>
                    <td style="color: #34D399; font-weight: 900; padding-top: 8px; font-size: 16px;">₹${booking.amount_paid}</td>
                  </tr>
                </table>
              </div>
              <p style="font-size: 13px; color: #94A3B8; line-height: 1.5;">
                We are preparing your package for dispatch. You will receive courier tracking details once your shipment leaves our facility.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 32px; background-color: #070D19; text-align: center; border-top: 1px solid #1E293B;">
              <p style="margin: 0; font-size: 11px; color: #64748B;">© ${new Date().getFullYear()} AWIE. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { subject, html };
}

/**
 * Generate HTML email notifying pre-booking customers on Launch Day (13 Sept) to complete remaining balance payment
 */
export function getGemLaunchDayNotificationEmail(
  booking: GemBookingRecord,
  portalBaseUrl?: string
) {
  const code = booking.booking_id || booking.ticket_code || '';
  const subject = `🚀 GEM Launch Day is Here! Complete Your Final Balance Payment [Booking: ${code}]`;
  const config = GEM_PRODUCTS[booking.product_version];
  const baseUrl = portalBaseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://awie.in';
  const payUrl = `${baseUrl}/gem-booking/lookup?code=${encodeURIComponent(code)}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F8FAFC;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0B1120; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background: linear-gradient(180deg, #111C38 0%, #0D162C 100%); border-radius: 20px; border: 1px solid #1E293B; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Banner -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; background: radial-gradient(circle at center, #1E3A8A 0%, #0F172A 100%); border-bottom: 1px solid #1E293B;">
              <div style="display: inline-block; padding: 4px 14px; background-color: rgba(37, 99, 235, 0.25); border: 1px solid #2563EB; border-radius: 999px; font-size: 11px; font-weight: 800; color: #60A5FA; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
                OFFICIAL PRODUCT LAUNCH DAY &bull; 13 SEPTEMBER
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px;">
                GEM Has Officially Launched! 🚀
              </h1>
              <p style="margin: 0; font-size: 14px; color: #94A3B8; font-medium;">
                Your pre-booked companion device is ready for final assembly &amp; dispatch.
              </p>
            </td>
          </tr>

          <!-- Core Pass & Payment Details -->
          <tr>
            <td style="padding: 28px 32px;">
              <p style="font-size: 14px; line-height: 1.6; color: #CBD5E1; margin: 0 0 20px 0;">
                Hello <strong>${booking.customer_name}</strong>,<br><br>
                Great news! Today marks the official product launch of <strong>${config.name}</strong>.
                Your pre-booking reservation deposit of <strong>₹${booking.booking_amount}</strong> has been credited against the special launch price.
                Please complete your remaining balance payment to confirm final dispatch to your doorstep.
              </p>

              <!-- Breakdown Card -->
              <div style="background-color: #0F172A; border-radius: 14px; padding: 20px; border: 1px solid #1E293B; margin-bottom: 24px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px;">
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 8px;">Booking ID:</td>
                    <td style="color: #60A5FA; font-weight: 800; font-family: monospace; font-size: 15px; padding-bottom: 8px;">${booking.booking_id}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 8px;">Product Model:</td>
                    <td style="color: #FFFFFF; font-weight: 700; padding-bottom: 8px;">${config.name}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 8px;">Special Launch Price:</td>
                    <td style="color: #FFFFFF; font-weight: 600; padding-bottom: 8px;">₹${booking.launch_price.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding-bottom: 8px;">Pre-Booking Deposit Credited:</td>
                    <td style="color: #34D399; font-weight: 700; padding-bottom: 8px;">-₹${booking.booking_amount.toLocaleString()}</td>
                  </tr>
                  <tr style="border-top: 1px solid #334155;">
                    <td style="color: #F8FAFC; font-weight: 800; padding-top: 10px; font-size: 14px;">Total Balance Due Now:</td>
                    <td style="color: #60A5FA; font-weight: 900; padding-top: 10px; font-size: 18px;">₹${booking.remaining_amount.toLocaleString()}</td>
                  </tr>
                </table>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${payUrl}" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; font-size: 15px; font-weight: 800; text-decoration: none; padding: 16px 36px; border-radius: 12px; box-shadow: 0 4px 20px rgba(37, 99, 235, 0.45);">
                  Pay Remaining ₹${booking.remaining_amount.toLocaleString()} &amp; Confirm Shipping →
                </a>
                <p style="margin: 10px 0 0 0; font-size: 11px; color: #64748B;">
                  Direct link for booking <strong>${booking.booking_id}</strong>. Secure online checkout via Razorpay.
                </p>
              </div>

              <!-- Shipping Address Reminder -->
              <div style="background-color: rgba(30, 41, 59, 0.5); border-radius: 10px; padding: 14px 16px; font-size: 12px; color: #94A3B8; line-height: 1.5;">
                <strong style="color: #E2E8F0;">Shipping Address on File:</strong><br>
                ${booking.delivery_address.addressLine}, ${booking.delivery_address.city}, ${booking.delivery_address.state} - ${booking.delivery_address.pincode}<br>
                <em>Need to update your address? Reply directly to this email before completing payment.</em>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 32px; background-color: #070D19; text-align: center; border-top: 1px solid #1E293B;">
              <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 700; color: #94A3B8;">
                AWIE &bull; Engineering &amp; Technology Services
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                support@awie.in &bull; awie.in
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { subject, html };
}
