import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, totalAmount, customerEmail, customerName, customerPhone, shippingAddress } = body;

    if (!items || !items.length) {
      return NextResponse.json(
        { success: false, error: 'Order items are required.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let orderRecord = null;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase.from('store_orders').insert([
          {
            customer_email: customerEmail || 'guest@awie.in',
            customer_name: customerName || 'Valued Customer',
            customer_phone: customerPhone || null,
            shipping_address: shippingAddress || null,
            items,
            total_amount: totalAmount,
            status: 'pending_confirmation'
          }
        ]).select();

        if (error) {
          console.warn('Supabase store_orders insertion error:', error);
        } else {
          orderRecord = data?.[0];
        }
      } catch (dbError) {
        console.warn('Supabase order logging failed:', dbError);
      }
    }

    // Send email notification to awielabs@gmail.com
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const contactTo = process.env.CONTACT_TO || 'awielabs@gmail.com';

    if (gmailUser && gmailPass) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: gmailUser, pass: gmailPass }
        });

        const itemsListHtml = items.map((i: any) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${i.product.name} (${i.product.sku})</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${i.quantity}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${(i.product.price * i.quantity).toLocaleString()}</td>
          </tr>
        `).join('');

        await transporter.sendMail({
          from: `"AWIE Store" <${gmailUser}>`,
          to: contactTo,
          subject: `🛒 New AWIE Store Order Inquiry - ₹${totalAmount.toLocaleString()}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #2563EB;">New AWIE Store Order Inquiry</h2>
              <hr style="border: 0; border-top: 1px solid #cbd5e1;" />
              <p><strong>Customer Name:</strong> ${customerName || 'N/A'}</p>
              <p><strong>Customer Email:</strong> ${customerEmail || 'N/A'}</p>
              <p><strong>Phone:</strong> ${customerPhone || 'N/A'}</p>
              
              <h3 style="color: #0F172A;">Order Items:</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background: #f1f5f9;">
                    <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Product</th>
                    <th style="padding: 8px; border: 1px solid #ddd;">Qty</th>
                    <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsListHtml}
                </tbody>
              </table>

              <h3 style="color: #2563EB; text-align: right;">Total Amount: ₹${totalAmount.toLocaleString()}</h3>
            </div>
          `
        });
      } catch (mailError) {
        console.warn('Nodemailer order email failed:', mailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Store order received successfully!',
      order: orderRecord
    });
  } catch (error) {
    console.error('Store order API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
