import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Modular Traders <quotes@modularagro.com>';
const DEFAULT_BUSINESS_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@modularagro.com';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export interface InquiryEmailData {
  id?: string;
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
 * Dispatch both business notification (with Reply-To) and customer confirmation
 */
export async function sendInquiryEmails(inquiry: InquiryEmailData, targetAdminEmail?: string) {
  const adminRecipient = targetAdminEmail || DEFAULT_BUSINESS_EMAIL;

  if (!resend) {
    console.warn(
      '[EmailService] RESEND_API_KEY is not configured. Email dispatch skipped. Set RESEND_API_KEY in environment variables.'
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
  };

  // 1. Send Notification to Business Owner
  try {
    const adminHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #FAF8F3; padding: 24px; border-radius: 16px; color: #1e293b;">
        <div style="background-color: #072B1F; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700; letter-spacing: 1px;">MODULAR TRADERS &amp; BROKERAGE</h1>
          <p style="color: #CFA744; font-size: 12px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 2px;">New B2B Rice Export Inquiry Received</p>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #D5E5DC; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
          <h2 style="color: #072B1F; font-size: 16px; margin: 0 0 16px; border-bottom: 2px solid #EAF5EF; padding-bottom: 8px;">Buyer &amp; Company Particulars</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 35%;">Buyer Name:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Company:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.companyName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Email (Reply Directly):</td>
              <td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${escapeHtml(inquiry.email)}" style="color: #155437; text-decoration: underline;">${escapeHtml(inquiry.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Phone / WhatsApp:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Country / Market:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.country)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Destination Port:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.destinationPort || 'Not specified')}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #D5E5DC; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
          <h2 style="color: #072B1F; font-size: 16px; margin: 0 0 16px; border-bottom: 2px solid #EAF5EF; padding-bottom: 8px;">Trade Specifications</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 35%;">Rice Variety:</td>
              <td style="padding: 8px 0; font-weight: 700; color: #155437;">${escapeHtml(inquiry.productName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Order Volume:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #072B1F;">${escapeHtml(String(inquiry.volumeMT || 'Not specified'))}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Incoterms:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.incoterms || 'FOB Karachi / CIF')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Packaging:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #072B1F;">${escapeHtml(inquiry.packaging || 'Standard Export')}</td>
            </tr>
          </table>
        </div>

        ${inquiry.notes ? `
          <div style="background-color: #ffffff; border: 1px solid #D5E5DC; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h2 style="color: #072B1F; font-size: 16px; margin: 0 0 12px; border-bottom: 2px solid #EAF5EF; padding-bottom: 8px;">Buyer Notes &amp; Specifications</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0; white-space: pre-wrap;">${escapeHtml(inquiry.notes)}</p>
          </div>
        ` : ''}

        <div style="background-color: #EAF5EF; border: 1px dashed #BDE3CF; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 13px; color: #072B1F; font-weight: 600;">
            Tip: You can click &ldquo;Reply&rdquo; in your email client to reply directly to ${escapeHtml(inquiry.fullName)} (${escapeHtml(inquiry.email)}).
          </p>
        </div>

        <div style="text-align: center; font-size: 12px; color: #64748b; padding-top: 12px;">
          <p style="margin: 4px 0;">Modular Traders and Brokerage &bull; Karachi Headquarters</p>
          <p style="margin: 4px 0;">Z Signature, 46-C, 4 Shahbaz Commercial Ln, Phase 6, DHA, Karachi, 75500, Pakistan</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [adminRecipient],
      replyTo: inquiry.email, // Allows business owner to reply directly
      subject: `New Rice Export Inquiry: ${inquiry.companyName} (${inquiry.productName})`,
      html: adminHtml,
    });
    results.adminEmailSent = true;
  } catch (err: any) {
    console.error('[EmailService] Error sending business notification:', err);
    results.adminError = err?.message || 'Failed to dispatch admin notification';
  }

  // 2. Send Automatic Confirmation to Customer
  try {
    const customerHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF8F3; padding: 24px; border-radius: 16px; color: #1e293b;">
        <div style="background-color: #072B1F; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700; letter-spacing: 1px;">MODULAR TRADERS &amp; BROKERAGE</h1>
          <p style="color: #CFA744; font-size: 12px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 2px;">Trade Desk &bull; Karachi, Pakistan</p>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #D5E5DC; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
          <h2 style="color: #072B1F; font-size: 18px; margin: 0 0 12px;">Thank you for your trade inquiry, ${escapeHtml(inquiry.fullName)}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 16px;">
            We have safely received your B2B export specification for <strong>${escapeHtml(inquiry.productName)}</strong> on behalf of <strong>${escapeHtml(inquiry.companyName)}</strong>.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 16px;">
            Our commodity trade desk in Karachi is currently reviewing your target destination (<em>${escapeHtml(inquiry.destinationPort || inquiry.country)}</em>) and volume to prepare a competitive FOB Karachi / CIF indicative price schedule.
          </p>

          <div style="background-color: #FAF8F3; border-left: 3px solid #155437; padding: 12px 16px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-size: 13px; color: #072B1F; font-weight: 600;">Trade Reference Summary:</p>
            <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">
              Variety: <strong>${escapeHtml(inquiry.productName)}</strong> &bull; Quantity: <strong>${escapeHtml(String(inquiry.volumeMT || 'Requested'))}</strong> &bull; Incoterms: <strong>${escapeHtml(inquiry.incoterms || 'Standard')}</strong>
            </p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 8px;">
            For urgent cargo inquiries, vessel allocations, or official laboratory specifications, you may also reach our desk directly on WhatsApp at <strong>+92 314 4447656</strong>.
          </p>
        </div>

        <div style="text-align: center; font-size: 12px; color: #64748b; padding-top: 12px;">
          <p style="margin: 4px 0;"><strong>Modular Traders and Brokerage</strong> &bull; Cultivating Trust</p>
          <p style="margin: 4px 0;">Email: <a href="mailto:info@modularagro.com" style="color: #155437;">info@modularagro.com</a> &bull; Phone: +92 3144447656</p>
          <p style="margin: 4px 0;">Karachi Port (KPT) &amp; Port Qasim (PQ) Dispatches</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [inquiry.email],
      replyTo: DEFAULT_BUSINESS_EMAIL,
      subject: `Inquiry Confirmation — Modular Traders and Brokerage (Karachi Desk)`,
      html: customerHtml,
    });
    results.customerEmailSent = true;
  } catch (err: any) {
    console.error('[EmailService] Error sending customer confirmation:', err);
    results.customerError = err?.message || 'Failed to dispatch customer confirmation';
  }

  return results;
}

/**
 * Send a quick test email to verify Resend configuration
 */
export async function sendTestEmail(targetEmail: string) {
  if (!resend) {
    return { ok: false, error: 'RESEND_API_KEY environment variable is not set.' };
  }
  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: [targetEmail],
      subject: 'Test Email Notification — Modular Traders B2B System',
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #FAF8F3; border-radius: 12px;">
          <h2 style="color: #072B1F;">Resend Email System Test Successful</h2>
          <p>This is a verified test email sent from the Modular Traders backend API.</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `,
    });
    return { ok: true, data: res };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Failed to send test email' };
  }
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
