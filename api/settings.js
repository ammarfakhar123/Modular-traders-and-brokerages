import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

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
  global: {
    headers: {
      apikey: SUPABASE_KEY,
    },
  },
});

const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const BREVO_SENDER_EMAIL =
  process.env.BREVO_SENDER_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL || 'info@modularagro.com';
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Modular Traders Website';

// Direct Business SMTP Configuration (e.g. Spacemail / Custom Private Email)
const SMTP_HOST = process.env.SMTP_HOST || process.env.MAIL_HOST || 'mail.spacemail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_USER = process.env.SMTP_USER || process.env.ADMIN_NOTIFICATION_EMAIL || 'info@modularagro.com';
const SMTP_PASS = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.MAIL_PASSWORD || '';
const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : SMTP_PORT === 465;

function getSmtpTransporter() {
  if (!SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Modular Traders Website <website@modularagro.com>';

let adminSettings = {
  receiveInquiriesByEmail: true,
  inquiryNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || 'info@modularagro.com',
};

export default async function handler(req, res) {
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

  const path = req.query.path || req.url || '';

  // Test Email Endpoint
  if (path.includes('test-email') && req.method === 'POST') {
    const targetEmail =
      req.body?.targetEmail || adminSettings.inquiryNotificationEmail || 'info@modularagro.com';

    const testSubject = '[Test Verification] Modular Traders Email System Active';
    const testHtml = `
      <div style="font-family: sans-serif; padding: 20px; background: #FAF8F3; color: #072B1F;">
        <h2 style="color: #072B1F;">Modular Traders Email Verification</h2>
        <p>This is a test notification confirming your email dispatch system is operational.</p>
        <p><strong>Provider:</strong> ${BREVO_API_KEY ? 'Brevo (Free 300/day tier)' : RESEND_API_KEY ? 'Resend' : 'Pending Configuration'}</p>
        <p><strong>Recipient:</strong> ${targetEmail}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      </div>
    `;

    let lastError = null;

    // 1. Try Direct SMTP if configured
    const smtpTransporter = getSmtpTransporter();
    if (smtpTransporter) {
      try {
        await smtpTransporter.sendMail({
          from: `"Modular Traders System" <${SMTP_USER}>`,
          to: targetEmail,
          replyTo: targetEmail,
          subject: testSubject,
          html: testHtml,
        });
        return res.status(200).json({
          success: true,
          provider: 'SMTP (Spacemail)',
          message: `Test email sent to ${targetEmail} via Direct SMTP.`,
        });
      } catch (err) {
        lastError = `SMTP Error: ${err.message}`;
        console.warn('SMTP test email error:', err.message);
      }
    }

    // 2. Try Brevo
    if (BREVO_API_KEY) {
      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
            to: [{ email: targetEmail }],
            replyTo: { email: targetEmail, name: 'Admin' },
            subject: testSubject,
            htmlContent: testHtml,
          }),
        });

        const brevoData = await brevoRes.json().catch(() => ({}));
        if (brevoRes.ok) {
          return res.status(200).json({
            success: true,
            provider: 'Brevo',
            message: `Test email sent to ${targetEmail} via Brevo.`,
          });
        } else {
          lastError = brevoData?.message || `Brevo HTTP ${brevoRes.status}`;
          console.warn('Brevo test email error:', lastError);
        }
      } catch (err) {
        lastError = `Brevo Exception: ${err.message}`;
        console.warn('Brevo test email error:', err.message);
      }
    }

    // 3. Try Resend Fallback
    if (RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: RESEND_FROM_EMAIL,
            to: [targetEmail],
            subject: testSubject,
            html: testHtml,
          }),
        });
        const resendData = await resendRes.json().catch(() => ({}));
        if (resendRes.ok) {
          return res.status(200).json({
            success: true,
            provider: 'Resend',
            message: `Test email sent to ${targetEmail} via Resend.`,
          });
        } else {
          lastError = resendData?.message || `Resend HTTP ${resendRes.status}`;
        }
      } catch (err) {
        lastError = `Resend Exception: ${err.message}`;
        console.warn('Resend test email error:', err.message);
      }
    }

    return res.status(400).json({
      success: false,
      error: lastError || 'No email service responded successfully. Check Brevo Authorised IPs or configure SMTP.',
    });
  }

  // GET Settings
  if (req.method === 'GET') {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'primary_settings')
        .maybeSingle();

      if (data?.contact_email) {
        adminSettings.inquiryNotificationEmail = data.contact_email;
      }
    } catch {}

    return res.status(200).json({ success: true, data: adminSettings });
  }

  // POST Settings
  if (req.method === 'POST') {
    const { receiveInquiriesByEmail, inquiryNotificationEmail } = req.body || {};
    if (typeof receiveInquiriesByEmail === 'boolean') {
      adminSettings.receiveInquiriesByEmail = receiveInquiriesByEmail;
    }
    if (inquiryNotificationEmail) {
      adminSettings.inquiryNotificationEmail = String(inquiryNotificationEmail).trim();
    }

    try {
      await supabase.from('site_settings').upsert({
        id: 'primary_settings',
        contact_email: adminSettings.inquiryNotificationEmail,
        updated_at: new Date().toISOString(),
      });
    } catch {}

    return res.status(200).json({ success: true, data: adminSettings });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
