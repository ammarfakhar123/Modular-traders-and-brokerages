import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Modular Traders Website <website@modularagro.com>';
const DEFAULT_BUSINESS_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@modularagro.com';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export interface InquiryEmailData {
  id?: string;
  inquiryType?: 'RFQ' | 'Contact' | string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  destinationPort?: string;
  productName: string;
  volumeMT?: string | number;
  incoterms?: string;
  packaging?: string;
  notes?: string;
  createdAt?: string;
}

/**
 * Dispatch business notification (with Reply-To set to customer) and customer confirmation
 */
export async function sendInquiryEmails(inquiry: InquiryEmailData, targetAdminEmail?: string) {
  const adminRecipient = targetAdminEmail || DEFAULT_BUSINESS_EMAIL;

  if (!resend) {
    console.warn(
      `[EmailService] RESEND_API_KEY is not set. Email dispatch skipped for inquiry ${inquiry.id || 'N/A'}. Target: ${adminRecipient}`
    );
    return {
      adminEmailSent: false,
      customerEmailSent: false,
      reason: 'RESEND_API_KEY not set',
    };
  }

  const results = {
    adminEmailSent: false,
    customerEmailSent: false,
    adminError: null as string | null,
    customerError: null as string | null,
    adminMessageId: null as string | null,
  };

  const isRfq = inquiry.inquiryType
    ? inquiry.inquiryType.toUpperCase().includes('RFQ')
    : Boolean(inquiry.destinationPort && inquiry.destinationPort.toLowerCase() !== 'international');

  const typeBadgeText = isRfq ? 'EXPORT RFQ (REQUEST FOR QUOTATION)' : 'DIRECT TRADE INQUIRY';
  const typeBadgeBg = isRfq ? '#CFA744' : '#155437';
  const typeBadgeColor = isRfq ? '#072B1F' : '#FAF8F3';

  // Professional subject lines matching international trade standards
  const subjectLine = isRfq
    ? `New RFQ — ${inquiry.productName || 'Basmati Rice'} — Modular Traders`
    : `New Contact Inquiry — ${inquiry.companyName || inquiry.fullName} — Modular Traders`;

  const formattedDate = new Date(inquiry.createdAt || Date.now()).toLocaleString('en-US', {
    timeZone: 'Asia/Karachi',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' (PKT)';

  // 1. Send Notification to Business Owner
  try {
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(subjectLine)}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F4EFE6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4EFE6; padding: 24px 12px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #ffffff; border: 1px solid #D5E5DC; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(7, 43, 31, 0.06);">
                
                <!-- BRAND HEADER -->
                <tr>
                  <td style="background-color: #072B1F; padding: 28px 24px; text-align: center; border-bottom: 3px solid #CFA744;">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: #CFA744; text-transform: uppercase; margin-bottom: 6px;">
                      MODULAR TRADERS AND BROKERAGE
                    </div>
                    <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 800; letter-spacing: 0.5px;">
                      ${isRfq ? 'New B2B Export Quotation Request' : 'New Commercial Trade Inquiry'}
                    </h1>
                    <div style="margin-top: 12px;">
                      <span style="display: inline-block; background-color: ${typeBadgeBg}; color: ${typeBadgeColor}; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase;">
                        ${typeBadgeText}
                      </span>
                    </div>
                  </td>
                </tr>

                <!-- REFERENCE & TIME META BAR -->
                <tr>
                  <td style="background-color: #FAF8F3; padding: 12px 24px; border-bottom: 1px solid #EAE2D3; font-size: 12px; color: #64748b;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="left">
                          <strong>Reference:</strong> <span style="font-family: monospace; color: #072B1F; font-weight: 700;">${escapeHtml(inquiry.id || 'MT-' + Date.now())}</span>
                        </td>
                        <td align="right">
                          <strong>Received:</strong> ${formattedDate}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- 1-CLICK REPLY CALLOUT (HERO BANNER) -->
                <tr>
                  <td style="padding: 20px 24px 0 24px;">
                    <div style="background-color: #EAF5EF; border: 2px solid #69B093; border-radius: 12px; padding: 16px; text-align: center;">
                      <div style="font-size: 13px; font-weight: 700; color: #072B1F; margin-bottom: 4px;">
                        ⚡ Direct Customer Reply Ready
                      </div>
                      <div style="font-size: 12px; color: #334155; line-height: 1.5; margin-bottom: 10px;">
                        Click <strong>Reply</strong> in your email client to send your response directly to <strong>${escapeHtml(inquiry.fullName)}</strong> (<span style="color: #155437; font-weight: 600;">${escapeHtml(inquiry.email)}</span>).
                      </div>
                      <a href="mailto:${escapeHtml(inquiry.email)}?subject=Re:%20${encodeURIComponent(subjectLine)}" style="display: inline-block; background-color: #072B1F; color: #F1C862; font-weight: 700; font-size: 12px; text-decoration: none; padding: 8px 18px; border-radius: 8px; letter-spacing: 0.5px;">
                        ✉️ Compose Reply to Buyer &rarr;
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- BUYER & COMPANY PARTICULARS -->
                <tr>
                  <td style="padding: 20px 24px;">
                    <h2 style="color: #072B1F; font-size: 15px; margin: 0 0 12px 0; border-bottom: 2px solid #EAF5EF; padding-bottom: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      1. Buyer &amp; Organization Details
                    </h2>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; line-height: 1.6;">
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; width: 38%;">Contact Person:</td>
                        <td style="padding: 6px 0; font-weight: 700; color: #072B1F;">${escapeHtml(inquiry.fullName)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Company / Entity:</td>
                        <td style="padding: 6px 0; font-weight: 700; color: #072B1F;">${escapeHtml(inquiry.companyName)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Email Address:</td>
                        <td style="padding: 6px 0;">
                          <a href="mailto:${escapeHtml(inquiry.email)}" style="color: #155437; font-weight: 700; text-decoration: underline;">
                            ${escapeHtml(inquiry.email)}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Phone / WhatsApp:</td>
                        <td style="padding: 6px 0; font-weight: 600; color: #072B1F;">
                          <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}" style="color: #155437; text-decoration: none; font-weight: 700;">
                            ${escapeHtml(inquiry.phone)}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Country / Market:</td>
                        <td style="padding: 6px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.country)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Destination Port:</td>
                        <td style="padding: 6px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.destinationPort || 'Karachi Port / Not Specified')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- TRADE & COMMODITY SPECIFICATIONS -->
                <tr>
                  <td style="padding: 0 24px 20px 24px;">
                    <h2 style="color: #072B1F; font-size: 15px; margin: 0 0 12px 0; border-bottom: 2px solid #EAF5EF; padding-bottom: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      2. Trade &amp; Commodity Specifications
                    </h2>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; line-height: 1.6;">
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; width: 38%;">Rice Variety:</td>
                        <td style="padding: 6px 0; font-weight: 800; color: #155437; font-size: 14px;">${escapeHtml(inquiry.productName)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Order Volume / Weight:</td>
                        <td style="padding: 6px 0; font-weight: 700; color: #072B1F;">${escapeHtml(String(inquiry.volumeMT || 'Not Specified'))}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Commercial Terms:</td>
                        <td style="padding: 6px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.incoterms || 'FOB Karachi / CIF')}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Packaging Requirement:</td>
                        <td style="padding: 6px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.packaging || 'Standard Export 50kg Bags')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- BUYER NOTES / FULL MESSAGE -->
                ${
                  inquiry.notes
                    ? `
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <h2 style="color: #072B1F; font-size: 15px; margin: 0 0 10px 0; border-bottom: 2px solid #EAF5EF; padding-bottom: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      3. Buyer Requirements &amp; Notes
                    </h2>
                    <div style="background-color: #FAF8F3; border-left: 4px solid #155437; border-radius: 6px; padding: 14px 16px; font-size: 13px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; font-family: inherit;">
${escapeHtml(inquiry.notes)}
                    </div>
                  </td>
                </tr>
                `
                    : ''
                }

                <!-- FOOTER -->
                <tr>
                  <td style="background-color: #072B1F; padding: 20px 24px; text-align: center; color: #94A3B8; font-size: 11px; line-height: 1.6;">
                    <div style="color: #F1C862; font-weight: 700; font-size: 12px; margin-bottom: 4px;">
                      MODULAR TRADERS AND BROKERAGE &bull; CULTIVATING TRUST
                    </div>
                    <div>Karachi Headquarters: Z Signature, 46-C, 4 Shahbaz Commercial Ln, Phase 6, DHA, Karachi, 75500, Pakistan</div>
                    <div>Tel: +92 314 4447656 &bull; Web: <a href="https://modularagro.com" style="color: #F1C862; text-decoration: none;">modularagro.com</a></div>
                    <div style="margin-top: 8px; font-size: 10px; color: #64748B;">
                      This notification was generated automatically by the Modular Traders web inquiry portal.
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const adminResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: [adminRecipient],
      replyTo: inquiry.email, // Standard camelCase for Resend SDK
      reply_to: inquiry.email, // snake_case compatibility
      subject: subjectLine,
      html: adminHtml,
    } as any);

    results.adminEmailSent = true;
    results.adminMessageId = (adminResponse as any)?.data?.id || null;
    console.log(
      `[EmailService] Business notification dispatched successfully to ${adminRecipient} for inquiry ${inquiry.id}. MessageId: ${results.adminMessageId}`
    );
  } catch (err: any) {
    console.error(`[EmailService] Business notification dispatch failed to ${adminRecipient}:`, err);
    results.adminError = err?.message || 'Failed to dispatch business notification';
  }

  // 2. Send Automatic B2B Confirmation to Customer (Safe Isolated Dispatch)
  try {
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Inquiry Confirmation — Modular Traders and Brokerage</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F4EFE6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4EFE6; padding: 24px 12px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #D5E5DC; border-radius: 16px; overflow: hidden;">
                <tr>
                  <td style="background-color: #072B1F; padding: 24px; text-align: center; border-bottom: 3px solid #CFA744;">
                    <div style="color: #CFA744; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                      MODULAR TRADERS AND BROKERAGE
                    </div>
                    <h1 style="color: #ffffff; font-size: 20px; margin: 6px 0 0; font-weight: 700;">
                      Trade Inquiry Received
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 24px;">
                    <h2 style="color: #072B1F; font-size: 16px; margin: 0 0 12px;">
                      Dear ${escapeHtml(inquiry.fullName)},
                    </h2>
                    <p style="font-size: 13px; line-height: 1.6; color: #334155; margin: 0 0 14px;">
                      Thank you for contacting Modular Traders and Brokerage. We have safely logged your B2B trade inquiry for <strong>${escapeHtml(inquiry.productName)}</strong> on behalf of <strong>${escapeHtml(inquiry.companyName)}</strong>.
                    </p>
                    <p style="font-size: 13px; line-height: 1.6; color: #334155; margin: 0 0 14px;">
                      Our international commodity trade desk in Karachi is currently reviewing your specifications and destination port (<strong>${escapeHtml(inquiry.destinationPort || inquiry.country)}</strong>) to prepare an official FOB Karachi or CIF price schedule.
                    </p>

                    <div style="background-color: #FAF8F3; border: 1px solid #EAE2D3; border-radius: 8px; padding: 14px; margin: 16px 0; font-size: 12px; color: #072B1F;">
                      <div style="font-weight: 700; margin-bottom: 6px; color: #155437;">Inquiry Summary:</div>
                      <div>&bull; <strong>Reference:</strong> ${escapeHtml(inquiry.id || 'MT-' + Date.now())}</div>
                      <div>&bull; <strong>Product:</strong> ${escapeHtml(inquiry.productName)}</div>
                      <div>&bull; <strong>Quantity:</strong> ${escapeHtml(String(inquiry.volumeMT || 'Requested'))}</div>
                      <div>&bull; <strong>Terms:</strong> ${escapeHtml(inquiry.incoterms || 'Standard')}</div>
                    </div>

                    <p style="font-size: 13px; line-height: 1.6; color: #334155; margin: 0 0 12px;">
                      For urgent vessel allocations, sample requests, or direct coordination, you can also reach our team via WhatsApp at <strong>+92 314 4447656</strong>.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="background-color: #FAF8F3; padding: 16px 24px; text-align: center; color: #64748b; font-size: 11px; border-top: 1px solid #EAE2D3;">
                    <div><strong>Modular Traders and Brokerage</strong> &bull; Karachi, Pakistan</div>
                    <div>Email: <a href="mailto:${DEFAULT_BUSINESS_EMAIL}" style="color: #155437;">${DEFAULT_BUSINESS_EMAIL}</a></div>
                    <div>Direct Port Dispatches from Karachi Port (KPT) &amp; Port Qasim (PQ)</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [inquiry.email],
      replyTo: DEFAULT_BUSINESS_EMAIL,
      reply_to: DEFAULT_BUSINESS_EMAIL,
      subject: `Inquiry Confirmation — Modular Traders and Brokerage (Ref: ${inquiry.id || 'MT-RICE'})`,
      html: customerHtml,
    } as any);
    results.customerEmailSent = true;
  } catch (err: any) {
    // Isolated catch: on Resend free/testing tiers, sending to unverified customer emails can be rejected.
    // This is caught cleanly so it never halts or impacts the business inbox notification.
    console.warn('[EmailService] Customer confirmation notice:', err?.message || err);
    results.customerError = err?.message || 'Customer confirmation skipped';
  }

  return results;
}

/**
 * Send a verification test email
 */
export async function sendTestEmail(targetEmail: string) {
  if (!resend) {
    return { ok: false, error: 'RESEND_API_KEY environment variable is not configured.' };
  }
  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: [targetEmail],
      replyTo: DEFAULT_BUSINESS_EMAIL,
      reply_to: DEFAULT_BUSINESS_EMAIL,
      subject: 'Test Verification — Modular Traders B2B Email System',
      html: `
        <div style="font-family: -apple-system, sans-serif; padding: 24px; background-color: #FAF8F3; border-radius: 12px; border: 1px solid #D5E5DC; max-width: 550px;">
          <h2 style="color: #072B1F; margin: 0 0 12px;">Email Verification Successful</h2>
          <p style="color: #334155; font-size: 14px; line-height: 1.6;">
            This is a verified test email sent via Resend from the Modular Traders Express backend.
          </p>
          <div style="background-color: #EAF5EF; padding: 12px; border-radius: 8px; font-size: 12px; color: #072B1F; margin-top: 16px;">
            <strong>Receiver:</strong> ${escapeHtml(targetEmail)}<br/>
            <strong>Timestamp:</strong> ${new Date().toISOString()} (UTC)
          </div>
        </div>
      `,
    } as any);
    return { ok: true, data: res };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Failed to dispatch test email' };
  }
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

