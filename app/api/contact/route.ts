import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, budget_range } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, service, and message are required fields.' },
        { status: 400 }
      );
    }

    // 1. Try storing in Supabase if environment variables exist
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from('contact_messages').insert([
          {
            name,
            email,
            phone: phone || null,
            service,
            message,
            budget_range: budget_range || null,
            status: 'unread',
          },
        ]);
      } catch (dbError) {
        console.warn('Supabase insertion skipped or failed:', dbError);
      }
    } else {
      console.log('[API/CONTACT] (Local Mode) Message logged:', { name, email, phone, service, message, budget_range });
    }

    // 2. Try sending email via Nodemailer Gmail SMTP if credentials exist
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const contactTo = process.env.CONTACT_TO || gmailUser;

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

        // Admin notification email
        await transporter.sendMail({
          from: `"AWIE Website" <${gmailUser}>`,
          to: contactTo,
          subject: `New AWIE Project Enquiry: ${service} - ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #2563EB;">New AWIE Project Enquiry</h2>
              <hr style="border: 0; border-top: 1px solid #ccc;" />
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Service Interested In:</strong> ${service}</p>
              <p><strong>Budget Range:</strong> ${budget_range || 'Not specified'}</p>
              <h3 style="color: #0F172A;">Project Description:</h3>
              <blockquote style="background: #f4f4f5; padding: 15px; border-left: 4px solid #2563EB;">
                ${message}
              </blockquote>
            </div>
          `,
        });

        // Auto-reply email to client
        await transporter.sendMail({
          from: `"AWIE" <${gmailUser}>`,
          to: email,
          subject: 'We received your project request - AWIE',
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #2563EB;">Thank you for contacting AWIE</h2>
              <p>Hi ${name},</p>
              <p>We received your inquiry regarding <strong>${service}</strong>. Our engineering team is reviewing your project details and will reply within 24 hours.</p>
              <br/>
              <p style="font-size: 12px; color: #666;">AWIE • Ideas Engineered Into Reality</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.warn('Nodemailer SMTP skipped or failed:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for contacting AWIE. We'll get back to you shortly.",
    });
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
