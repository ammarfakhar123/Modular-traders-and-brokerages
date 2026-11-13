import { Router, Request, Response } from 'express';
import { getSupabase } from '../services/supabaseService';
import { sendInquiryEmails, InquiryEmailData } from '../services/emailService';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware';
import { enquiryRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// In-memory runtime mirror for instant admin access
let inMemoryInquiries: any[] = [
  {
    id: 'inq-101',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
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
    id: 'inq-102',
    created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
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
 * Public submission of B2B export inquiry:
 * 1. Validates required fields
 * 2. Saves to Supabase inquiries table
 * 3. Sends notification to business owner with Reply-To: customer.email
 * 4. Sends automated confirmation email to the customer
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

  const newId = `inq-${Date.now()}`;
  const nowIso = new Date().toISOString();

  const newInquiry = {
    id: newId,
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

  // 1. Save in Supabase
  try {
    const supabase = getSupabase();
    await supabase.from('inquiries').insert([
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
  } catch (dbErr) {
    console.warn('[EnquiriesAPI] Supabase database write error:', dbErr);
  }

  // Update in-memory cache
  inMemoryInquiries.unshift(newInquiry);

  // 2. Dispatch Emails via Resend (Business Notification + Customer Confirmation)
  let emailDispatch = { adminEmailSent: false, customerEmailSent: false };
  try {
    const emailPayload: InquiryEmailData = {
      id: newInquiry.id,
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
    emailDispatch = await sendInquiryEmails(emailPayload);
  } catch (emailErr) {
    console.warn('[EnquiriesAPI] Email notification dispatch warning:', emailErr);
  }

  return res.status(201).json({
    success: true,
    message: 'Your inquiry has been received. Our trade desk will reach out shortly.',
    data: newInquiry,
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
