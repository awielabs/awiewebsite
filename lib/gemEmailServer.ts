import { GemBookingRecord } from './gemPricing';

/**
 * Server-only utility to send GEM emails via Nodemailer
 */
export async function sendGemEmail(to: string, subject: string, html: string): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.warn('[GEM EMAIL] GMAIL_USER or GMAIL_APP_PASSWORD missing. Skipping email send.');
    return false;
  }

  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `"AWIE" <${gmailUser}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (err) {
    console.error('[GEM EMAIL ERROR]:', err);
    return false;
  }
}

/**
 * Dispatch Launch Day balance payment notification email to a pre-booking customer
 */
export async function sendGemLaunchNotificationEmail(
  booking: GemBookingRecord,
  portalBaseUrl?: string
): Promise<boolean> {
  const { getGemLaunchDayNotificationEmail } = await import('./gemPricing');
  const { subject, html } = getGemLaunchDayNotificationEmail(booking, portalBaseUrl);
  return sendGemEmail(booking.email, subject, html);
}
