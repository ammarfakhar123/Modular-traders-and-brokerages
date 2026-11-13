import { Router, Request, Response } from 'express';
import { getSupabase } from '../services/supabaseService';
import { sendTestEmail } from '../services/emailService';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware';

const router = Router();

let adminSettings = {
  receiveInquiriesByEmail: true,
  inquiryNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || 'info@modularagro.com',
};

/**
 * GET /api/settings
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'primary_settings')
      .maybeSingle();

    if (data?.contact_email) {
      adminSettings.inquiryNotificationEmail = data.contact_email;
    }
  } catch (err) {
    // Return memory fallback
  }

  return res.json({ success: true, data: adminSettings });
});

/**
 * POST /api/settings (Admin Only)
 */
router.post('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const { receiveInquiriesByEmail, inquiryNotificationEmail } = req.body || {};

  if (typeof receiveInquiriesByEmail === 'boolean') {
    adminSettings.receiveInquiriesByEmail = receiveInquiriesByEmail;
  }
  if (inquiryNotificationEmail) {
    adminSettings.inquiryNotificationEmail = String(inquiryNotificationEmail).trim();
  }

  try {
    const supabase = getSupabase();
    await supabase.from('site_settings').upsert({
      id: 'primary_settings',
      contact_email: adminSettings.inquiryNotificationEmail,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('[SettingsAPI] Supabase site_settings save warning:', err);
  }

  return res.json({ success: true, data: adminSettings });
});

/**
 * POST /api/settings/test-email (Admin Only)
 */
router.post('/test-email', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const targetEmail =
    req.body?.targetEmail || adminSettings.inquiryNotificationEmail || 'info@modularagro.com';

  const result = await sendTestEmail(targetEmail);
  if (result.ok) {
    return res.json({
      success: true,
      message: `Test email dispatched to ${targetEmail} via Resend.`,
      result,
    });
  }

  return res.status(500).json({
    success: false,
    error: result.error || 'Failed to dispatch test email',
  });
});

export default router;
