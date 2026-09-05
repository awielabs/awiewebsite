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
      from: `"AWIE Labs" <${gmailUser}>`,
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
