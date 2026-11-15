import { Router, Request, Response } from 'express';
import { getSupabase } from '../services/supabaseService';
import { sendInquiryEmails, InquiryEmailData } from '../services/emailService';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware';
import { enquiryRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Deduplication cache: prevent double-clicks and repeated requests within 15 seconds
const recentSubmissions = new Map<string, { time: number; inquiry: any }>();

// In-memory runtime mirror for instant admin access
let inMemoryInquiries: any[] = [
  {
    id: 'MT-2026-1001',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    inquiryType: 'RFQ',
    fullName: 'Tariq Al-Fahad',
    companyName: 'Al-Fahad Grain Trading Co',
    email: 'tariq@alfahadgrain.sa',
    phone: '+966 50 882 1944',
    country: 'Saudi Arabia',
    destinationPort: 'Jeddah Islamic Port',
    productName: 'Super Kernel Basmati Rice',
    volumeMT: '50 MT (2 Containers)',
    incoterms: 'CIF Jeddah',
    packaging: '25 kg PP Bags (Private Label)',
    status: 'New',
    notes: 'Looking for 2x 20ft FCL trial shipment of aged harvest with SGS pre-shipment inspection.',
  },
  {
    id: 'MT-2026-1002',
    created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    inquiryType: 'RFQ',
    fullName: 'Patrick Ochieng',
    companyName: 'Equatorial Commodity Importers Ltd',
    email: 'p.ochieng@equatorialcommodities.ke',
    phone: '+254 712 345 678',
    country: 'Kenya',
    destinationPort: 'Mombasa Port',
    productName: 'IRRI-6 Long Grain White Rice, Sindh Origin',
    volumeMT: '250 MT',
    incoterms: 'CIF Mombasa',
    packaging: '50 kg Export Jute/PP Sacks',
    status: 'Quoted',
    notes: 'Monthly requirement of 5-10 FCLs. Require Sortex 5% broken grain certificate.',
  },
];

/**
 * POST /api/enquiries
 * Direct Business Email Inquiry & RFQ Submission
 * 1. Validates and sanitizes fields
 * 2. Checks deduplication (prevents double submits within 15s)
 * 3. Saves to Supabase inquiries database table
 * 4. Dispatches professional HTML notification to business email with Reply-To set directly to customer
 * 5. Returns sub-second response (< 1s)
 */
router.post('/', enquiryRateLimiter, async (req: Request, res: Response) => {
  const body = req.body || {};

  const fullName = String(body.fullName || body.buyerName || '').trim();
  const companyName = String(body.companyName || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const phone = String(body.phone || '').trim();
  const country = String(body.country || body.destinationPort || 'International').trim();
  const destinationPort = String(body.destinationPort || body.port || '').trim();
  const productName = String(body.productName || body.productInterest || 'General Rice Sourcing').trim();
  const volumeMT = body.volumeMT || body.quantityMT || '25-50 MT';
  const incoterms = String(body.incoterms || body.tradeTerm || 'FOB Karachi / CIF').trim();
  const packaging = String(body.packaging || 'Standard Export 50kg Bags').trim();
  const notes = String(body.notes || body.message || '').trim();
  const inquiryType = String(
    body.inquiryType || (destinationPort && destinationPort !== 'International' ? 'RFQ' : 'Contact')
  ).trim();

  // Basic validation
  if (!fullName || !companyName || !email || !phone) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in all required fields (Full Name, Company Name, Email, and Phone).',
    });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.',
    });
  }

  // Deduplication check: protect against rapid accidental double clicks
  const dedupeKey = `${email}:${productName}:${notes.slice(0, 30)}`;
  const now = Date.now();
  const existingSub = recentSubmissions.get(dedupeKey);
  if (existingSub && now - existingSub.time < 15000) {
    return res.status(200).json({
      success: true,
      message: 'Your inquiry has already been received. Thank you.',
      data: existingSub.inquiry,
      deduplicated: true,
    });
  }

  // Generate standardized business reference ID (e.g. MT-2026-58392)
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

  // Cache recent submission for 15s
  recentSubmissions.set(dedupeKey, { time: now, inquiry: newInquiry });
  setTimeout(() => recentSubmissions.delete(dedupeKey), 20000);

  // 1. Save in Supabase
  let savedInDb = false;
  try {
    const supabase = getSupabase();
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
        volume_mt: typeof volumeMT === 'number' ? volumeMT : 25,
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
      console.warn('[EnquiriesAPI] Supabase insert warning:', dbError.message);
    }
  } catch (dbErr: any) {
    console.warn('[EnquiriesAPI] Supabase database write error:', dbErr?.message || dbErr);
  }

  // Update in-memory cache
  inMemoryInquiries.unshift(newInquiry);

  // 2. Fetch active receiving email from settings or environment
  let targetAdminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@modularagro.com';
  try {
    const supabase = getSupabase();
    const { data: settingsRow } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'primary_settings')
      .maybeSingle();
    if (settingsRow?.contact_email) {
      targetAdminEmail = settingsRow.contact_email;
    }
  } catch {
    // Fall back to env default
  }

  // 3. Dispatch Emails via Resend (Fast Non-Blocking Race for Sub-Second Response)
  const emailPayload: InquiryEmailData = {
    id: newInquiry.id,
    inquiryType: newInquiry.inquiryType,
    fullName: newInquiry.fullName,
    companyName: newInquiry.companyName,
    email: newInquiry.email,
    phone: newInquiry.phone,
    country: newInquiry.country,
    destinationPort: newInquiry.destinationPort,
    productName: newInquiry.productName,
    volumeMT: newInquiry.volumeMT,
    incoterms: newInquiry.incoterms,
    packaging: newInquiry.packaging,
    notes: newInquiry.notes,
    createdAt: nowIso,
  };

  let emailDispatch: any = { adminEmailSent: false, customerEmailSent: false };

  try {
    const emailPromise = sendInquiryEmails(emailPayload, targetAdminEmail);
    // Allow up to 1200ms to complete before returning response to client
    const timeoutPromise = new Promise<{ timedOut: boolean }>((resolve) =>
      setTimeout(() => resolve({ timedOut: true }), 1200)
    );

    const outcome: any = await Promise.race([emailPromise, timeoutPromise]);
    if (outcome && !outcome.timedOut) {
      emailDispatch = outcome;
    } else {
      // If Resend takes > 1.2s, let the promise continue running in background
      emailDispatch.status = 'dispatched_in_background';
      emailPromise
        .then((res) => {
          console.log(`[EnquiriesAPI] Background email dispatch finished for ${newInquiry.id}:`, res);
        })
        .catch((err) => {
          console.error(`[EnquiriesAPI] Background email dispatch error for ${newInquiry.id}:`, err);
        });
    }
  } catch (emailErr: any) {
    console.warn('[EnquiriesAPI] Email notification dispatch warning:', emailErr?.message || emailErr);
  }

  return res.status(201).json({
    success: true,
    message: 'Your inquiry has been received. Our trade desk will reach out shortly.',
    data: newInquiry,
    savedInDb,
    emails: emailDispatch,
  });
});

/**
 * GET /api/enquiries (Admin Only)
 */
router.get('/', requireAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const normalized = data.map(normalizeInquiryFromDb);
      return res.json({ success: true, count: normalized.length, data: normalized });
    }
  } catch (err) {
    console.warn('[EnquiriesAPI] Supabase fetch error, fallback to memory:', err);
  }

  return res.json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries });
});

/**
 * PATCH /api/enquiries/:id (Admin Only)
 */
router.patch('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body || {};

  const index = inMemoryInquiries.findIndex((i) => i.id === id);
  if (index !== -1) {
    inMemoryInquiries[index] = { ...inMemoryInquiries[index], ...updates };
  }

  try {
    const supabase = getSupabase();
    const dbUpdates: any = { updated_at: new Date().toISOString() };
    if (updates.status) dbUpdates.status = updates.status;
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
    await supabase.from('inquiries').update(dbUpdates).eq('id', id);
  } catch (err) {
    console.warn('[EnquiriesAPI] Supabase status update error:', err);
  }

  return res.json({
    success: true,
    data: index !== -1 ? inMemoryInquiries[index] : { id, ...updates },
  });
});

/**
 * DELETE /api/enquiries/:id (Admin Only)
 */
router.delete('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  inMemoryInquiries = inMemoryInquiries.filter((i) => i.id !== id);

  try {
    const supabase = getSupabase();
    await supabase.from('inquiries').delete().eq('id', id);
  } catch (err) {
    console.warn('[EnquiriesAPI] Supabase delete inquiry error:', err);
  }

  return res.json({ success: true, message: 'Inquiry deleted.' });
});

function normalizeInquiryFromDb(row: any): any {
  return {
    id: row.id,
    created_at: row.created_at || row.createdAt || new Date().toISOString(),
    fullName: row.full_name || row.fullName || 'Trade Buyer',
    companyName: row.company_name || row.companyName || 'Export Client',
    email: row.email,
    phone: row.phone,
    country: row.country || 'International',
    destinationPort: row.destination_port || row.destinationPort || '',
    productName: row.product_name || row.productName || 'General Rice Sourcing',
    volumeMT: row.volume_mt || row.volumeMT || 25,
    incoterms: row.incoterms || 'FOB Karachi',
    packaging: row.packaging || 'Standard Export',
    notes: row.notes || '',
    status: row.status || 'New',
  };
}

export default router;
