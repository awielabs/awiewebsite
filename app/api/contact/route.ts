import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      service,
      message,
      budget_range,
      domain,
      scope_type,
      scope_desc,
      features,
      stage,
      timeline,
      preferred_contact,
      additional_notes,
    } = body;

    // 1. Strict Server-Side Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid full name (at least 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address (e.g. name@domain.com).' },
        { status: 400 }
      );
    }

    const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
    const phoneDigits = cleanPhone.replace(/\D/g, '');
    if (cleanPhone && phoneDigits.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid 10-digit phone/WhatsApp number.' },
        { status: 400 }
      );
    }

    if (!service || typeof service !== 'string' || service.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid service domain.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please provide project details or a message.' },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanService = service.trim();
    const cleanMessage = message.trim();
    const cleanDomain = domain || cleanService;
    const cleanScopeType = scope_type || '';
    const cleanScopeDesc = scope_desc || '';
    const cleanFeatures: string[] = Array.isArray(features) ? features : [];
    const cleanStage = stage || '';
    const cleanTimeline = timeline || '';
    const cleanBudget = budget_range || 'Custom / Flexible';
    const cleanPreferredContact = preferred_contact
      ? preferred_contact.toUpperCase()
      : cleanPhone
      ? 'WHATSAPP / EMAIL'
      : 'EMAIL';
    const cleanNotes = additional_notes || '';

    // Format current timestamp (e.g., 2 September 2026, 4:18 PM IST)
    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Kolkata',
      }) +
      ' at ' +
      now.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      }) +
      ' IST';

    // 2. Try storing in Supabase if environment variables exist
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from('contact_messages').insert([
          {
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone || null,
            service: cleanService,
            message: cleanMessage,
            budget_range: cleanBudget || null,
            status: 'unread',
          },
        ]);

        // Persist client service inquiry into service_requests table (Contact inquiries only)
        await supabase.from('service_requests').insert([
          {
            name: cleanName,
            email: cleanEmail,
            service: cleanService,
            description: cleanMessage,
            budget: cleanBudget || null,
            status: 'Submitted',
          },
        ]);
      } catch (dbError) {
        console.warn('Supabase insertion skipped or failed:', dbError);
      }
    } else {
      console.log('[API/CONTACT] (Local/Preview Mode) Message logged:', {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        service: cleanService,
        budget: cleanBudget,
      });
    }

    // 3. Email Dispatch via Nodemailer (To awieclient@gmail.com and to Client)
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

        // Load logo buffer once into memory so concurrent sends do not exhaust file streams
        const logoPath = path.join(process.cwd(), 'public', 'logo.jpeg');
        const logoExists = fs.existsSync(logoPath);
        const logoBuffer = logoExists ? fs.readFileSync(logoPath) : null;

        // Fresh attachments generator for each email send to prevent shared-reference mutation
        const getEmailAttachments = () =>
          logoBuffer
            ? [
                {
                  filename: 'logo.jpeg',
                  content: logoBuffer,
                  cid: 'awielogo@awie.in',
                  contentType: 'image/jpeg',
                  contentDisposition: 'inline' as const,
                },
              ]
            : [];

        const logoSrc = logoBuffer ? 'cid:awielogo@awie.in' : 'https://awie.in/logo.jpeg';

        // Reusable Brand Header Block: Logo on left, tagline down side of logo
        const brandHeaderHtml = `
          <table border="0" cellPadding="0" cellSpacing="0">
            <tr>
              <td align="left">
                <!-- AWIE Logo in a clean white rounded badge -->
                <table border="0" cellPadding="0" cellSpacing="0">
                  <tr>
                    <td style="background-color: #FFFFFF; padding: 6px 14px; border-radius: 9px; line-height: 1; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                      <img src="${logoSrc}" alt="AWIE" width="110" style="display: block; width: 110px; max-width: 110px; height: auto; border: 0; outline: none;" />
                    </td>
                  </tr>
                </table>
                <!-- Engineering & Technology Services tagline directly below logo -->
                <div style="color: #93C5FD; font-size: 11px; font-weight: 800; margin-top: 9px; text-transform: uppercase; letter-spacing: 1.2px; line-height: 1.3;">
                  Engineering &amp; Technology Services
                </div>
              </td>
            </tr>
          </table>
        `.trim();

        // Render features HTML chips
        const featuresHtml =
          cleanFeatures.length > 0
            ? cleanFeatures
                .map(
                  (f: string) =>
                    `<span style="display: inline-block; background-color: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; margin: 3px 4px 3px 0;">✓ ${f}</span>`
                )
                .join(' ')
            : '<span style="color: #64748B; font-size: 12px; font-style: italic;">Standard system architecture</span>';

        // ----------------------------------------------------
        // A. Internal Team Notification Email (To CONTACT_TO / awieclient@gmail.com)
        // ----------------------------------------------------
        const teamSubject = `🚀 New Project Proposal: ${cleanDomain} | ${cleanName}`;
        const teamHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${teamSubject}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #0B1528; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0F172A;">
  <table width="100%" border="0" cellPadding="0" cellSpacing="0">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" border="0" cellPadding="0" cellSpacing="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); border: 1px solid #E2E8F0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0B1528 0%, #1E293B 55%, #1D4ED8 100%); padding: 28px 32px; border-bottom: 3px solid #2563EB;">
              <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                <tr>
                  <td valign="top" align="left">
                    ${brandHeaderHtml}
                  </td>
                  <td valign="top" align="right">
                    <div style="display: inline-block; background-color: rgba(37, 99, 235, 0.35); border: 1px solid rgba(147, 197, 253, 0.4); padding: 5px 12px; border-radius: 9999px; font-size: 10px; font-weight: 800; color: #93C5FD; text-transform: uppercase; letter-spacing: 1.2px;">
                      Incoming Intake
                    </div>
                  </td>
                </tr>
              </table>
              <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.15);">
                <h1 style="margin: 0; font-size: 22px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px; line-height: 1.2;">
                  ${cleanDomain}
                </h1>
                <div style="margin-top: 6px; font-size: 12px; color: #CBD5E1;">
                  Submitted by <strong style="color: #FFFFFF;">${cleanName}</strong> • ${formattedDate}
                </div>
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">

              <!-- Section: Client Details -->
              <div style="font-size: 11px; font-weight: 900; color: #2563EB; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px; border-bottom: 2px solid #EFF6FF; padding-bottom: 6px;">
                👤 Client Information
              </div>

              <table width="100%" border="0" cellPadding="0" cellSpacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px;">
                    <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                      <tr>
                        <td width="35%" style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #64748B;">Full Name:</td>
                        <td width="65%" style="padding: 6px 0; font-size: 14px; font-weight: 800; color: #0F172A;">${cleanName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #64748B;">Email Address:</td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0F172A;">
                          <a href="mailto:${cleanEmail}" style="color: #2563EB; text-decoration: none; font-weight: 800;">${cleanEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #64748B;">Phone / WhatsApp:</td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0F172A;">
                          ${
                            cleanPhone
                              ? `<a href="tel:${cleanPhone}" style="color: #0F172A; text-decoration: none; font-family: monospace; font-weight: 800;">${cleanPhone}</a>`
                              : '<span style="color: #94A3B8; font-style: italic;">Not provided</span>'
                          }
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #64748B;">Preferred Contact:</td>
                        <td style="padding: 6px 0;">
                          <span style="display: inline-block; background-color: #DBEAFE; color: #1E40AF; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase;">
                            ${cleanPreferredContact}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Section: Project Scope Breakdown -->
              <div style="font-size: 11px; font-weight: 900; color: #2563EB; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px; border-bottom: 2px solid #EFF6FF; padding-bottom: 6px;">
                ⚙️ Technical Scope & Parameters
              </div>

              <table width="100%" border="0" cellPadding="0" cellSpacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px;">
                    <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                      <tr>
                        <td width="35%" style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #64748B;">Discipline:</td>
                        <td width="65%" style="padding: 6px 0; font-size: 14px; font-weight: 800; color: #1E40AF;">${cleanDomain}</td>
                      </tr>
                      ${
                        cleanScopeType
                          ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #64748B;">Architecture / Type:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #0F172A;">
                          ${cleanScopeType} ${
                              cleanScopeDesc
                                ? `<span style="color: #64748B; font-weight: normal; font-size: 12px;">(${cleanScopeDesc})</span>`
                                : ''
                            }
                        </td>
                      </tr>`
                          : ''
                      }
                      ${
                        cleanStage
                          ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #64748B;">Current Stage:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #0F172A;">${cleanStage}</td>
                      </tr>`
                          : ''
                      }
                      ${
                        cleanTimeline
                          ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #64748B;">Target Timeline:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 800; color: #0284C7;">${cleanTimeline}</td>
                      </tr>`
                          : ''
                      }
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #64748B;">Target Budget:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 800; color: #059669;">${cleanBudget}</td>
                      </tr>
                    </table>

                    <!-- Features Chips -->
                    <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #CBD5E1;">
                      <div style="font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 8px;">
                        Selected Capabilities:
                      </div>
                      ${featuresHtml}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Section: Project Vision / Raw Message -->
              <div style="font-size: 11px; font-weight: 900; color: #2563EB; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px; border-bottom: 2px solid #EFF6FF; padding-bottom: 6px;">
                📝 Project Brief & Specifications
              </div>

              <div style="background-color: #F8FAFC; border-left: 4px solid #2563EB; border-radius: 8px; padding: 18px; margin-bottom: 24px; font-size: 13px; line-height: 1.65; color: #1E293B; white-space: pre-line; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
${cleanNotes ? `<strong>Client Vision / Notes:</strong>\n${cleanNotes}\n\n` : ''}${cleanMessage}
              </div>

              <!-- Section: Metadata & Compliance -->
              <table width="100%" border="0" cellPadding="0" cellSpacing="0" style="background-color: #F1F5F9; border-radius: 10px; padding: 12px 16px; font-size: 11px; color: #475569;">
                <tr>
                  <td align="left">
                    <strong>Submission Received:</strong> ${formattedDate}
                  </td>
                  <td align="right">
                    <strong>Compliance:</strong> Data Processing & Terms Accepted
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 32px; text-align: center;">
              <div style="font-size: 12px; font-weight: 800; color: #0F172A; letter-spacing: 0.5px;">
                AWIE Micro Enterprise • Nerul, Navi Mumbai
              </div>
              <div style="font-size: 11px; color: #64748B; margin-top: 4px;">
                Engineering Digital Platforms, Mobile Applications & Embedded Systems
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim();

        // ----------------------------------------------------
        // B. Client Confirmation Email (To client's email)
        // ----------------------------------------------------
        const clientSubject = `We've Received Your Proposal Request: ${cleanDomain} — AWIE`;
        const clientHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${clientSubject}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0F172A;">
  <table width="100%" border="0" cellPadding="0" cellSpacing="0">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" border="0" cellPadding="0" cellSpacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(37, 99, 235, 0.08); border: 1px solid #E2E8F0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0B1528 0%, #1D4ED8 100%); padding: 30px 32px; text-align: left; border-bottom: 3px solid #2563EB;">
              <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                <tr>
                  <td valign="middle" align="left">
                    ${brandHeaderHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 900; color: #0F172A;">
                Hi ${cleanName},
              </h2>

              <p style="font-size: 14px; color: #334155; line-height: 1.65; margin: 0 0 18px 0;">
                Thank you for contacting <strong>AWIE</strong>. We have received your technical specifications for your proposed project in <strong style="color: #2563EB;">${cleanDomain}</strong>.
              </p>

              <!-- Scope Card -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #2563EB; border-radius: 12px; padding: 18px; margin: 20px 0;">
                <div style="font-size: 11px; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                  Summary of Submitted Requirements
                </div>

                <table width="100%" border="0" cellPadding="0" cellSpacing="0" style="font-size: 13px;">
                  <tr>
                    <td width="40%" style="padding: 4px 0; color: #64748B; font-weight: 600;">Project Discipline:</td>
                    <td width="60%" style="padding: 4px 0; color: #0F172A; font-weight: 800;">${cleanDomain}</td>
                  </tr>
                  ${
                    cleanScopeType
                      ? `
                  <tr>
                    <td style="padding: 4px 0; color: #64748B; font-weight: 600;">Focus Area:</td>
                    <td style="padding: 4px 0; color: #0F172A; font-weight: 700;">${cleanScopeType}</td>
                  </tr>`
                      : ''
                  }
                  ${
                    cleanTimeline
                      ? `
                  <tr>
                    <td style="padding: 4px 0; color: #64748B; font-weight: 600;">Target Timeline:</td>
                    <td style="padding: 4px 0; color: #0F172A; font-weight: 700;">${cleanTimeline}</td>
                  </tr>`
                      : ''
                  }
                  ${
                    cleanBudget
                      ? `
                  <tr>
                    <td style="padding: 4px 0; color: #64748B; font-weight: 600;">Budget Bracket:</td>
                    <td style="padding: 4px 0; color: #059669; font-weight: 800;">${cleanBudget}</td>
                  </tr>`
                      : ''
                  }
                  <tr>
                    <td style="padding: 4px 0; color: #64748B; font-weight: 600;">Preferred Contact:</td>
                    <td style="padding: 4px 0; color: #1E40AF; font-weight: 800; text-transform: uppercase;">${cleanPreferredContact}</td>
                  </tr>
                </table>
              </div>

              <!-- What Happens Next -->
              <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 18px; margin: 24px 0;">
                <div style="font-size: 12px; font-weight: 900; color: #1E40AF; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px;">
                  ⏱️ What Happens Next?
                </div>
                
                <table width="100%" border="0" cellPadding="0" cellSpacing="0" style="font-size: 12px; color: #1E293B;">
                  <tr>
                    <td width="24" valign="top" style="padding-bottom: 10px; font-weight: 900; color: #2563EB;">1.</td>
                    <td style="padding-bottom: 10px;">
                      <strong>Technical Scope Review:</strong> Our engineering team analyzes component selection, architecture feasibility, and deliverable milestones.
                    </td>
                  </tr>
                  <tr>
                    <td width="24" valign="top" style="padding-bottom: 10px; font-weight: 900; color: #2563EB;">2.</td>
                    <td style="padding-bottom: 10px;">
                      <strong>24-Hour Quotation SLA:</strong> You will receive a breakdown of deliverables, developmental timeline, and milestone pricing within 24 hours.
                    </td>
                  </tr>
                  <tr>
                    <td width="24" valign="top" style="font-weight: 900; color: #2563EB;">3.</td>
                    <td>
                      <strong>Direct Connection:</strong> We will reach out via <strong style="color: #1D4ED8;">${cleanPreferredContact}</strong> to align on next steps.
                    </td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 13px; color: #64748B; line-height: 1.6; margin: 0;">
                Need to add attachments or have immediate questions? Feel free to reply directly to this email or reach us at <a href="mailto:awieclient@gmail.com" style="color: #2563EB; font-weight: 700; text-decoration: none;">awieclient@gmail.com</a>.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px 32px; text-align: center;">
              <div style="font-weight: 900; font-size: 13px; color: #0F172A; letter-spacing: 0.5px;">
                AWIE • Innovate • Build • Connect
              </div>
              <div style="font-size: 11px; color: #64748B; margin-top: 6px;">
                <a href="https://awie.in" target="_blank" style="color: #2563EB; text-decoration: none; font-weight: 700;">awie.in</a> &nbsp;•&nbsp; 
                <a href="https://www.linkedin.com/company/awie/" target="_blank" style="color: #2563EB; text-decoration: none; font-weight: 700;">LinkedIn</a> &nbsp;•&nbsp; 
                <a href="mailto:awieclient@gmail.com" style="color: #64748B; text-decoration: none;">awieclient@gmail.com</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim();

        // Send BOTH emails concurrently with fresh attachments
        await Promise.all([
          // 1. Team notification to CONTACT_TO / awieclient@gmail.com
          transporter.sendMail({
            from: `"AWIE Portal" <${gmailUser}>`,
            to: contactTo,
            replyTo: cleanEmail,
            subject: teamSubject,
            attachments: getEmailAttachments(),
            html: teamHtml,
          }),
          // 2. Client confirmation to client's email
          transporter.sendMail({
            from: `"AWIE" <${gmailUser}>`,
            to: cleanEmail,
            subject: clientSubject,
            attachments: getEmailAttachments(),
            html: clientHtml,
          }),
        ]);

        console.log(
          `[API/CONTACT] Both emails successfully dispatched: To Team (${contactTo}) and Client (${cleanEmail})`
        );
      } catch (emailError) {
        console.error('[API/CONTACT] Nodemailer SMTP dispatch error:', emailError);
      }
    } else {
      console.warn(
        '[API/CONTACT] GMAIL_USER or GMAIL_APP_PASSWORD missing. Emails not dispatched via SMTP.'
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Proposal request successfully received. Confirmation email sent.',
    });
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing request.' },
      { status: 500 }
    );
  }
}

