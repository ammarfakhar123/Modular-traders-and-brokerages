import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  'https://ptjwbwxwemwmhbogwaeh.supabase.co';

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_xbiw1aaBHyGTh8vpTiHxSw_JHfLVHk8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Brevo (Sendinblue) Configuration (300 Free Emails / Day)
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const BREVO_SENDER_EMAIL =
  process.env.BREVO_SENDER_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL || 'info@modularagro.com';
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Modular Traders Website';

// Resend Fallback Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Modular Traders Website <website@modularagro.com>';
const DEFAULT_BUSINESS_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@modularagro.com';

// In-memory fallback if database table is initializing
let inMemoryInquiries = [];

/**
 * Send transactional email via Brevo REST API v3
 */
async function sendViaBrevo({
  toEmail,
  toName,
  replyToEmail,
  replyToName,
  subject,
  htmlContent,
}) {
  if (!BREVO_API_KEY) {
    throw new Error('BREVO_API_KEY is not configured in Vercel environment variables');
  }

  const payload = {
    sender: {
      name: BREVO_SENDER_NAME,
      email: BREVO_SENDER_EMAIL,
    },
    to: [
      {
        email: toEmail,
        name: toName || toEmail,
      },
    ],
    replyTo: {
      email: replyToEmail,
      name: replyToName || replyToEmail,
    },
    subject,
    htmlContent,
  };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `Brevo API HTTP ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

/**
 * Send email via Resend (Fallback)
 */
async function sendViaResend({ toEmail, replyToEmail, replyToName, subject, htmlContent }) {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [toEmail],
      reply_to: `${replyToName || 'Trade Buyer'} <${replyToEmail}>`,
      subject,
      html: htmlContent,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || `Resend HTTP ${response.status}`);
  }
  return data;
}

/**
 * Build HTML notification template for business inbox
 */
function buildAdminNotificationHtml(inquiry) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Trade Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F3; margin: 0; padding: 24px; color: #1E293B;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #D5E5DC; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #072B1F 0%, #155437 100%); padding: 28px 24px; text-align: left;">
      <div style="color: #CFA744; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
        Modular Traders and Brokerage &bull; International Trade Desk
      </div>
      <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0;">
        New Trade Inquiry Received
      </h1>
      <div style="color: #E2E8F0; font-size: 13px; margin-top: 6px;">
        Reference: <strong style="color: #CFA744;">${inquiry.id}</strong> &bull; Karachi Time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })}
      </div>
    </div>

    <!-- 1-Click Direct Reply Callout -->
    <div style="background-color: #EAF5EF; border-left: 4px solid #155437; padding: 14px 20px; margin: 20px 24px 10px 24px; border-radius: 6px;">
      <div style="font-size: 12px; font-weight: bold; color: #072B1F; margin-bottom: 2px;">
        &bull; 1-Click Reply Ready
      </div>
      <div style="font-size: 13px; color: #155437;">
        Simply hit <strong>Reply</strong> in your email app to reply directly to <strong>${inquiry.fullName} (${inquiry.email})</strong>.
      </div>
    </div>

    <!-- Inquiry Body Details -->
    <div style="padding: 10px 24px 24px 24px;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #072B1F; border-bottom: 2px solid #D5E5DC; padding-bottom: 8px; margin-top: 16px;">
        Buyer & Company Particulars
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
        <tr>
          <td style="padding: 8px 0; color: #64748B; width: 140px; font-weight: 600;">Buyer Name:</td>
          <td style="padding: 8px 0; color: #072B1F; font-weight: 700;">${inquiry.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Company Name:</td>
          <td style="padding: 8px 0; color: #072B1F; font-weight: 700;">${inquiry.companyName || 'Not Specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Corporate Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${inquiry.email}" style="color: #155437; font-weight: bold; text-decoration: underline;">${inquiry.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Phone / WhatsApp:</td>
          <td style="padding: 8px 0; color: #072B1F; font-weight: 700;">
            <a href="https://wa.me/${String(inquiry.phone || '').replace(/\D/g, '')}" style="color: #059669; text-decoration: none;">
              ${inquiry.phone || 'N/A'} (Click to WhatsApp)
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Country / Port:</td>
          <td style="padding: 8px 0; color: #072B1F; font-weight: 700;">${inquiry.destinationPort || inquiry.country}</td>
        </tr>
      </table>

      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #072B1F; border-bottom: 2px solid #D5E5DC; padding-bottom: 8px; margin-top: 24px;">
        Commercial Sourcing Specifications
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
        <tr>
          <td style="padding: 8px 0; color: #64748B; width: 140px; font-weight: 600;">Product Interest:</td>
          <td style="padding: 8px 0; color: #072B1F; font-weight: 800; font-size: 14px;">${inquiry.productName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Quantity / Volume:</td>
          <td style="padding: 8px 0; color: #072B1F; font-weight: 700;">${inquiry.volumeMT}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Incoterms:</td>
          <td style="padding: 8px 0; color: #072B1F; font-weight: 700;">${inquiry.incoterms}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Packaging:</td>
          <td style="padding: 8px 0; color: #072B1F; font-weight: 700;">${inquiry.packaging}</td>
        </tr>
      </table>

      ${
        inquiry.notes
          ? `
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #072B1F; border-bottom: 2px solid #D5E5DC; padding-bottom: 8px; margin-top: 24px;">
        Buyer Notes / Message
      </h2>
      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; margin-top: 10px; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
        ${inquiry.notes}
      </div>
      `
          : ''
      }

      <div style="margin-top: 30px; text-align: center;">
        <a href="mailto:${inquiry.email}?subject=RE: Inquiry ${inquiry.id} - Modular Traders and Brokerage" 
           style="display: inline-block; background-color: #072B1F; color: #FFFFFF; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 14px 28px; border-radius: 8px; text-decoration: none;">
          Reply to Buyer (${inquiry.email})
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #F1F5F9; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0;">
      Modular Traders and Brokerage &bull; Suite 402, Business Avenue, Karachi, Pakistan<br>
      Web: <a href="https://www.modularagro.com" style="color: #155437; text-decoration: none;">www.modularagro.com</a> &bull; Email: <a href="mailto:info@modularagro.com" style="color: #155437; text-decoration: none;">info@modularagro.com</a>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Build Customer Confirmation HTML
 */
function buildCustomerConfirmationHtml(inquiry) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inquiry Confirmation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F3; margin: 0; padding: 24px; color: #1E293B;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #D5E5DC; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: linear-gradient(135deg, #072B1F 0%, #155437 100%); padding: 28px 24px; text-align: center;">
      <div style="color: #CFA744; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
        Modular Traders and Brokerage
      </div>
      <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0;">
        We Received Your Inquiry
      </h1>
      <div style="color: #E2E8F0; font-size: 13px; margin-top: 6px;">
        Reference: <strong style="color: #CFA744;">${inquiry.id}</strong>
      </div>
    </div>
    <div style="padding: 24px; font-size: 14px; line-height: 1.6; color: #334155;">
      <p style="margin-top: 0;">Dear <strong>${inquiry.fullName}</strong>,</p>
      <p>Thank you for contacting <strong>Modular Traders and Brokerage</strong> regarding <strong>${inquiry.productName}</strong>. Our international export desk in Karachi has received your specifications.</p>
      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; margin: 16px 0;">
        <div style="font-size: 12px; font-weight: bold; color: #072B1F; margin-bottom: 6px; text-transform: uppercase;">Summary of Request:</div>
        <div><strong>Product:</strong> ${inquiry.productName}</div>
        <div><strong>Volume:</strong> ${inquiry.volumeMT}</div>
        <div><strong>Incoterms:</strong> ${inquiry.incoterms}</div>
        <div><strong>Destination:</strong> ${inquiry.destinationPort || inquiry.country}</div>
      </div>
      <p>A trade representative will review stock availability, milling schedules, and current FOB/CIF pricing, and will reply directly to this email within 24 business hours.</p>
      <p style="margin-bottom: 0;">Sincerely,<br><strong>Commercial Trade Desk</strong><br>Modular Traders and Brokerage<br>Karachi, Pakistan</p>
    </div>
    <div style="background-color: #F1F5F9; padding: 14px 24px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0;">
      Modular Traders and Brokerage &bull; Web: <a href="https://www.modularagro.com" style="color: #155437;">www.modularagro.com</a> &bull; WhatsApp: +92 333 2269989
    </div>
  </div>
</body>
</html>`;
}

function normalizeFromDb(row) {
  return {
    id: row.id,
    fullName: row.full_name || row.fullName || 'Trade Buyer',
    companyName: row.company_name || row.companyName || 'Export Client',
    email: row.email,
    phone: row.phone,
    country: row.country || 'International',
    destinationPort: row.destination_port || row.destinationPort || '',
    productName: row.product_name || row.productName || 'General Rice Sourcing',
    volumeMT: row.volume_mt || row.volumeMT || '25-50 MT',
    incoterms: row.incoterms || 'FOB Karachi / CIF',
    packaging: row.packaging || 'Standard Export 50kg Bags',
    notes: row.notes || '',
    status: row.status || 'New',
    created_at: row.created_at || row.createdAt || new Date().toISOString(),
  };
}

/**
 * Standalone Vercel Serverless Function Handler
 */
export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. GET: Fetch inquiries
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        const normalized = data.map(normalizeFromDb);
        return res.status(200).json({ success: true, count: normalized.length, data: normalized });
      }
    } catch (err) {
      console.warn('[Enquiries] Supabase fetch warning:', err.message);
    }

    return res
      .status(200)
      .json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries });
  }

  // 2. POST: Submit new inquiry
  if (req.method === 'POST') {
    const body = req.body || {};
    const fullName = String(body.fullName || body.buyerName || '').trim();
    const companyName = String(body.companyName || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const phone = String(body.phone || '').trim();
    const country = String(body.country || body.destinationPort || 'International').trim();
    const destinationPort = String(body.destinationPort || body.port || country || '').trim();
    const productName = String(
      body.productName || body.productInterest || 'General Rice Sourcing'
    ).trim();
    const volumeMT = String(body.volumeMT || body.quantityMT || '25-50 MT').trim();
    const incoterms = String(body.incoterms || body.tradeTerm || 'FOB Karachi / CIF').trim();
    const packaging = String(body.packaging || 'Standard Export 50kg Bags').trim();
    const notes = String(body.notes || body.message || '').trim();
    const inquiryType = String(body.inquiryType || 'Contact').trim();

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (Full Name and Email address).',
      });
    }

    const newId =
      body.id && String(body.id).startsWith('MT-')
        ? String(body.id)
        : `MT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowIso = new Date().toISOString();

    const newInquiry = {
      id: newId,
      inquiryType,
      fullName,
      companyName,
      email,
      phone,
      country,
      destinationPort,
      productName,
      volumeMT,
      incoterms,
      packaging,
      notes,
      status: 'New',
      created_at: nowIso,
    };

    // Save to Supabase
    let savedInDb = false;
    try {
      const { error: dbError } = await supabase.from('inquiries').insert([
        {
          id: newInquiry.id,
          full_name: newInquiry.fullName,
          company_name: newInquiry.companyName,
          email: newInquiry.email,
          phone: newInquiry.phone,
          country: newInquiry.country,
          destination_port: newInquiry.destinationPort,
          product_name: newInquiry.productName,
          volume_mt: newInquiry.volumeMT,
          incoterms: newInquiry.incoterms,
          packaging: newInquiry.packaging,
          notes: newInquiry.notes,
          status: newInquiry.status,
          created_at: nowIso,
          updated_at: nowIso,
        },
      ]);
      if (!dbError) {
        savedInDb = true;
      } else {
        console.warn('[Enquiries] Supabase insert warning:', dbError.message);
      }
    } catch (dbErr) {
      console.warn('[Enquiries] Supabase insert error:', dbErr.message);
    }

    inMemoryInquiries.unshift(newInquiry);

    // Fetch active notification email from settings if present
    let targetAdminEmail = DEFAULT_BUSINESS_EMAIL;
    try {
      const { data: settingsRow } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'primary_settings')
        .maybeSingle();
      if (settingsRow?.contact_email) {
        targetAdminEmail = settingsRow.contact_email;
      }
    } catch {}

    // Dispatch Emails via Brevo (with Resend fallback)
    const emailResult = { brevoSent: false, resendSent: false, errors: [] };
    const adminSubject = `[RFQ New Inquiry] ${newInquiry.productName} - ${newInquiry.companyName || newInquiry.fullName} (${newInquiry.country})`;
    const adminHtml = buildAdminNotificationHtml(newInquiry);
    const customerSubject = `Modular Traders & Brokerage: Confirmation of Rice Export Inquiry [${newInquiry.id}]`;
    const customerHtml = buildCustomerConfirmationHtml(newInquiry);

    if (BREVO_API_KEY) {
      try {
        await sendViaBrevo({
          toEmail: targetAdminEmail,
          toName: 'Modular Traders Desk',
          replyToEmail: newInquiry.email,
          replyToName: newInquiry.fullName,
          subject: adminSubject,
          htmlContent: adminHtml,
        });
        emailResult.brevoSent = true;

        // Try customer confirmation via Brevo
        try {
          await sendViaBrevo({
            toEmail: newInquiry.email,
            toName: newInquiry.fullName,
            replyToEmail: targetAdminEmail,
            replyToName: 'Modular Traders Trade Desk',
            subject: customerSubject,
            htmlContent: customerHtml,
          });
          emailResult.customerSent = true;
        } catch (custErr) {
          console.warn('[Enquiries] Brevo customer confirmation notice:', custErr.message);
        }
      } catch (brevoErr) {
        console.warn('[Enquiries] Brevo admin email failed:', brevoErr.message);
        emailResult.errors.push(`Brevo: ${brevoErr.message}`);
      }
    } else {
      emailResult.errors.push('BREVO_API_KEY not configured in Vercel environment variables');
    }

    // If Brevo failed or not configured, try Resend
    if (!emailResult.brevoSent && RESEND_API_KEY) {
      try {
        await sendViaResend({
          toEmail: targetAdminEmail,
          replyToEmail: newInquiry.email,
          replyToName: newInquiry.fullName,
          subject: adminSubject,
          htmlContent: adminHtml,
        });
        emailResult.resendSent = true;
      } catch (resendErr) {
        console.warn('[Enquiries] Resend fallback failed:', resendErr.message);
        emailResult.errors.push(`Resend: ${resendErr.message}`);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our trade desk will reach out shortly.',
      data: newInquiry,
      savedInDb,
      emails: emailResult,
    });
  }

  // 3. PATCH: Update status
  if (req.method === 'PATCH') {
    const id = req.query.id || req.body?.id;
    const { status, notes } = req.body || {};

    if (!id) {
      return res.status(400).json({ success: false, error: 'Inquiry ID is required' });
    }

    try {
      const updates = { updated_at: new Date().toISOString() };
      if (status) updates.status = status;
      if (notes !== undefined) updates.notes = notes;

      await supabase.from('inquiries').update(updates).eq('id', id);

      const memIndex = inMemoryInquiries.findIndex((i) => i.id === id);
      if (memIndex !== -1) {
        inMemoryInquiries[memIndex] = { ...inMemoryInquiries[memIndex], ...updates };
      }

      return res.status(200).json({ success: true, message: 'Inquiry updated' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // 4. DELETE: Delete inquiry
  if (req.method === 'DELETE') {
    const id = req.query.id || req.body?.id;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Inquiry ID is required' });
    }

    try {
      await supabase.from('inquiries').delete().eq('id', id);
      inMemoryInquiries = inMemoryInquiries.filter((i) => i.id !== id);
      return res.status(200).json({ success: true, message: 'Inquiry deleted' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
