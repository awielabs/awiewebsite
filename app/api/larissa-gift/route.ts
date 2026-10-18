import { NextResponse } from 'next/server';
import { saveGiftOrder } from '@/lib/larissa-gift-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, city, state, pincode, note } = body;

    if (!name || !phone || !address) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name, phone number, and delivery address.' },
        { status: 400 }
      );
    }

    const cleanName = String(name).trim();
    const cleanEmail = email ? String(email).trim().toLowerCase() : '';
    const cleanPhone = String(phone).trim();
    const cleanAddress = String(address).trim();
    const cleanCity = city ? String(city).trim() : '';
    const cleanState = state ? String(state).trim() : '';
    const cleanPincode = pincode ? String(pincode).trim() : '';
    const cleanNote = note ? String(note).trim() : '';

    // Generate unique gift order tracking code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `AWIE-LARISSA-${randomSuffix}`;

    // Persist order in store
    await saveGiftOrder({
      trackingCode,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      address: cleanAddress,
      city: cleanCity,
      state: cleanState,
      pincode: cleanPincode,
      note: cleanNote
    });

    console.log('[LARISSA_GIFT_DELIVERY] New address submitted & stored:', {
      trackingCode,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      address: cleanAddress,
      city: cleanCity,
      state: cleanState,
      pincode: cleanPincode,
      note: cleanNote,
      submittedAt: new Date().toISOString()
    });

    // Notify via Nodemailer
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const teamRecipients = ['awielabs@gmail.com', 'awieclient@gmail.com'];
    if (process.env.CONTACT_TO && !teamRecipients.includes(process.env.CONTACT_TO)) {
      teamRecipients.push(process.env.CONTACT_TO);
    }

    if (gmailUser && gmailPass) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        // 1. Team Notification Email (to AWIE)
        await transporter.sendMail({
          from: `"AWIE Gift Portal" <${gmailUser}>`,
          to: teamRecipients.join(', '),
          subject: `🎁 [${trackingCode}] Larissa's Framed Photo Delivery Address Submitted!`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; background-color: #0b1528; color: #f8fafc; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
              <div style="background: linear-gradient(135deg, #ec4899, #f59e0b); padding: 16px 20px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 900;">🎁 Birthday Framed Gift Delivery Request</h1>
                <p style="color: #fef3c7; margin: 4px 0 0 0; font-size: 13px; font-family: monospace; font-weight: bold;">Tracking Code: ${trackingCode}</p>
              </div>

              <div style="background-color: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
                <h3 style="color: #38bdf8; font-size: 13px; text-transform: uppercase; margin-top: 0; letter-spacing: 1px;">Recipient Details</h3>
                <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; padding: 6px 0; width: 35%;"><strong>Recipient Name:</strong></td>
                    <td style="color: #ffffff; font-weight: bold;">${cleanName}</td>
                  </tr>
                  ${cleanEmail ? `
                  <tr>
                    <td style="color: #94a3b8; padding: 6px 0;"><strong>Email Address:</strong></td>
                    <td style="color: #ffffff; font-family: monospace;">${cleanEmail}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="color: #94a3b8; padding: 6px 0;"><strong>Phone / WhatsApp:</strong></td>
                    <td style="color: #ffffff; font-family: monospace; font-weight: bold;">${cleanPhone}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 6px 0; vertical-align: top;"><strong>Full Address:</strong></td>
                    <td style="color: #ffffff; line-height: 1.5;">${cleanAddress}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 6px 0;"><strong>City, State & PIN:</strong></td>
                    <td style="color: #ffffff;">${cleanCity}, ${cleanState} - ${cleanPincode}</td>
                  </tr>
                  ${cleanNote ? `
                  <tr>
                    <td style="color: #94a3b8; padding: 6px 0; vertical-align: top;"><strong>Delivery Note:</strong></td>
                    <td style="color: #fde047; font-style: italic;">${cleanNote}</td>
                  </tr>` : ''}
                </table>
              </div>

              <div style="text-align: center; font-size: 12px; color: #64748b; padding-top: 10px; border-top: 1px solid #1e293b;">
                Submitted from secret birthday portal (/larissa) • AWIE Micro Enterprise
              </div>
            </div>
          `,
        });

        // 2. Heartfelt Confirmation Email to Larissa herself
        if (cleanEmail) {
          await transporter.sendMail({
            from: `"Shovin" <${gmailUser}>`,
            to: cleanEmail,
            subject: `🎂 Happy Birthday Larissa! Your Framed Gift is Confirmed (Code: ${trackingCode})`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 28px; background-color: #0b1528; color: #f8fafc; border-radius: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #334155; line-height: 1.6;">
                <div style="background: linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%); padding: 24px; border-radius: 16px; margin-bottom: 24px; text-align: center; box-shadow: 0 10px 25px rgba(244, 63, 94, 0.25);">
                  <div style="font-size: 36px; margin-bottom: 8px;">🎂✨🎁</div>
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">Happy 21st Birthday, Larissa!</h1>
                  <p style="color: #fef3c7; margin: 6px 0 0 0; font-size: 14px; font-weight: 600;">Your special birthday framed portrait is officially on the way!</p>
                </div>

                <div style="background-color: #1e293b; padding: 22px; border-radius: 14px; margin-bottom: 20px; border: 1px solid #334155;">
                  <h2 style="color: #f43f5e; font-size: 14px; text-transform: uppercase; margin-top: 0; letter-spacing: 1px; font-weight: 800;">
                    Your Surprise Gift Tracking Details
                  </h2>
                  <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 16px 0;">
                    Hi Larissa! Thank you for filling in your address. I have received your delivery information and your physical framed recreation portrait is being prepared with immense love and care.
                  </p>

                  <div style="background-color: #0f172a; padding: 14px 18px; border-radius: 10px; border: 1px solid #f59e0b; text-align: center; margin-bottom: 16px;">
                    <span style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; font-family: monospace; letter-spacing: 1.5px;">Your Gift Code</span>
                    <span style="font-size: 22px; font-weight: 900; color: #fde047; font-family: monospace; letter-spacing: 2px;">${trackingCode}</span>
                  </div>

                  <p style="color: #94a3b8; font-size: 13px; margin: 0 0 16px 0; line-height: 1.5;">
                    📍 <strong>Delivery Address:</strong> ${cleanAddress}, ${cleanCity}, ${cleanState} - ${cleanPincode}<br />
                    📦 <strong>Status:</strong> Order recorded! Frame in preparation — live updates available below!
                  </p>

                  <div style="text-align: center; margin-top: 16px;">
                    <a href="https://awielabs.com/larissa/track?code=${trackingCode}" style="display: inline-block; background: linear-gradient(135deg, #ec4899, #f59e0b); color: #000000; font-weight: 800; font-size: 13px; padding: 12px 24px; border-radius: 12px; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
                      Track Delivery Status Live 🎁 →
                    </a>
                  </div>
                  <p style="text-align: center; margin-top: 12px; font-size: 12px; color: #94a3b8;">
                    Direct tracking link: <a href="https://awielabs.com/larissa/track?code=${trackingCode}" style="color: #38bdf8; word-break: break-all;">https://awielabs.com/larissa/track?code=${trackingCode}</a>
                  </p>
                </div>

                <div style="background-color: #1e293b; padding: 20px; border-radius: 14px; margin-bottom: 24px; border-left: 4px solid #f43f5e;">
                  <p style="color: #e2e8f0; font-size: 14px; font-style: italic; margin: 0;">
                    “Wishing you a truly magical 21st birthday filled with continuous laughter, vibrant health, and unforgettable moments. May this milestone year bring you everything your heart desires!”
                  </p>
                  <p style="color: #f43f5e; font-weight: bold; font-size: 13px; margin: 10px 0 0 0; text-align: right;">
                    — With warm wishes, Shovin 💖
                  </p>
                </div>

                <div style="text-align: center; font-size: 12px; color: #64748b; padding-top: 14px; border-top: 1px solid #1e293b;">
                  Private Birthday Portal • Crafted with admiration for Larissa
                </div>
              </div>
            `,
          });
        }
      } catch (err) {
        console.warn('Failed to dispatch notification email:', err);
      }
    }

    return NextResponse.json({
      success: true,
      trackingCode,
      message: 'Your address details have been received! The framed portrait will be prepared and delivered straight to you soon!'
    });
  } catch (error) {
    console.error('Gift delivery API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while saving address.' },
      { status: 500 }
    );
  }
}
