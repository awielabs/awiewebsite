import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, city, state, pincode, note } = body;

    if (!name || !phone || !address) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name, phone number, and delivery address.' },
        { status: 400 }
      );
    }

    const cleanName = String(name).trim();
    const cleanPhone = String(phone).trim();
    const cleanAddress = String(address).trim();
    const cleanCity = city ? String(city).trim() : '';
    const cleanState = state ? String(state).trim() : '';
    const cleanPincode = pincode ? String(pincode).trim() : '';
    const cleanNote = note ? String(note).trim() : '';

    console.log('[LARISSA_GIFT_DELIVERY] New address submitted:', {
      name: cleanName,
      phone: cleanPhone,
      address: cleanAddress,
      city: cleanCity,
      state: cleanState,
      pincode: cleanPincode,
      note: cleanNote,
      submittedAt: new Date().toISOString()
    });

    // Optionally notify via Nodemailer if SMTP configured
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const contactTo = process.env.CONTACT_TO || 'awieclient@gmail.com';

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

        await transporter.sendMail({
          from: `"Birthday Gift Portal" <${gmailUser}>`,
          to: contactTo,
          subject: `🎁 Larissa Submitted Delivery Address for Framed Photo!`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #d97706;">🎁 Larissa's Framed Photo Delivery Details</h2>
              <p><strong>Name:</strong> ${cleanName}</p>
              <p><strong>Phone / WhatsApp:</strong> ${cleanPhone}</p>
              <p><strong>Address:</strong> ${cleanAddress}</p>
              <p><strong>City / State / PIN:</strong> ${cleanCity}, ${cleanState} - ${cleanPincode}</p>
              ${cleanNote ? `<p><strong>Note:</strong> ${cleanNote}</p>` : ''}
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 12px; color: #64748b;">Submitted from secret birthday portal (/larissa) on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
            </div>
          `,
        });
      } catch (err) {
        console.warn('Failed to dispatch notification email:', err);
      }
    }

    return NextResponse.json({
      success: true,
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
