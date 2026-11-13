import { Router, Request, Response } from 'express';
import { getSupabase } from '../services/supabaseService';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware';
import { DEFAULT_CATALOG } from '../data/initialCatalog';

const router = Router();

// In-memory runtime cache/mirror to ensure instant response if Supabase table is cold
let inMemoryProducts: any[] = [...DEFAULT_CATALOG];

/**
 * GET /api/products
 * Public or admin product catalog listing
 */
router.get('/', async (req: Request, res: Response) => {
  const includeAll = req.query.all === 'true' || req.query.admin === 'true';

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('order', { ascending: true, nullsFirst: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      // Normalize database rows
      const mapped = data.map(normalizeProductFromDb);
      const filtered = includeAll ? mapped : mapped.filter((p) => p.active !== false);
      return res.json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (err) {
    console.warn('[ProductsAPI] Supabase fetch error, using runtime cache:', err);
  }

  // Fallback to in-memory catalog
  const filtered = includeAll ? inMemoryProducts : inMemoryProducts.filter((p) => p.active !== false);
  return res.json({ success: true, count: filtered.length, data: filtered });
});

/**
 * GET /api/products/:slugOrId
 */
router.get('/:slugOrId', async (req: Request, res: Response) => {
  const { slugOrId } = req.params;

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return res.json({ success: true, data: normalizeProductFromDb(data) });
    }
  } catch (err) {
    console.warn('[ProductsAPI] Single product lookup fallback:', err);
  }

  const match = inMemoryProducts.find((p) => p.slug === slugOrId || p.id === slugOrId);
  if (match) {
    return res.json({ success: true, data: match });
  }

  return res.status(404).json({ success: false, error: 'Product not found.' });
});

/**
 * POST /api/products (Admin Only)
 */
router.post('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const payload = req.body || {};
  if (!payload.name) {
    return res.status(400).json({ success: false, error: 'Product name is required.' });
  }

  const newId = payload.id || `prod-${Date.now()}`;
  const slug =
    payload.slug ||
    payload.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const newProduct = {
    id: newId,
    slug,
    name: payload.name,
    category: payload.category || 'Basmati Rice',
    tagline: payload.tagline || '',
    shortDescription: payload.shortDescription || '',
    fullDescription: payload.fullDescription || '',
    grainLength: payload.grainLength || '',
    moisture: payload.moisture || 'Max 12.5%',
    brokenRatio: payload.brokenRatio || 'Max 2.0%',
    purity: payload.purity || '95% Minimum',
    cropYear: payload.cropYear || 'Fresh 2025 / 2026 Harvest',
    processingTypes: Array.isArray(payload.processingTypes)
      ? payload.processingTypes
      : ['White (Raw)', 'Parboiled (Sella)', 'Steamed'],
    pesticideWash: payload.pesticideWash || '',
    exportQuality: payload.exportQuality || '',
    characteristics: Array.isArray(payload.characteristics) ? payload.characteristics : [],
    targetMarkets: payload.targetMarkets || '',
    packagingOptions: Array.isArray(payload.packagingOptions) ? payload.packagingOptions : [],
    origin: payload.origin || 'Pakistan',
    dispatchPorts: payload.dispatchPorts || 'Karachi Port (KPT) & Port Qasim (PQ), Pakistan',
    image: payload.image || '/images/products/super-kernel.jpg',
    badge: payload.badge || 'Export Grade A',
    active: payload.active !== false,
    order: payload.order || inMemoryProducts.length + 1,
    specs: payload.specs || {},
  };

  try {
    const supabase = getSupabase();
    await supabase.from('products').upsert({
      id: newProduct.id,
      slug: newProduct.slug,
      name: newProduct.name,
      category: newProduct.category,
      tagline: newProduct.tagline,
      short_description: newProduct.shortDescription,
      full_description: newProduct.fullDescription,
      grain_length: newProduct.grainLength,
      moisture: newProduct.moisture,
      broken_ratio: newProduct.brokenRatio,
      purity: newProduct.purity,
      crop_year: newProduct.cropYear,
      origin: newProduct.origin,
      image: newProduct.image,
      badge: newProduct.badge,
      active: newProduct.active,
      order: newProduct.order,
      specs: newProduct.specs,
      packaging_options: newProduct.packagingOptions,
    });
  } catch (err) {
    console.error('[ProductsAPI] Supabase insert warning:', err);
  }

  inMemoryProducts.push(newProduct);
  return res.status(201).json({ success: true, data: newProduct });
});

/**
 * PUT /api/products/:id (Admin Only)
 */
router.put('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body || {};

  const index = inMemoryProducts.findIndex((p) => p.id === id);
  if (index !== -1) {
    inMemoryProducts[index] = { ...inMemoryProducts[index], ...updates };
  }

  try {
    const supabase = getSupabase();
    const dbPayload: any = { updated_at: new Date().toISOString() };
    if (updates.name !== undefined) dbPayload.name = updates.name;
    if (updates.slug !== undefined) dbPayload.slug = updates.slug;
    if (updates.category !== undefined) dbPayload.category = updates.category;
    if (updates.tagline !== undefined) dbPayload.tagline = updates.tagline;
    if (updates.shortDescription !== undefined) dbPayload.short_description = updates.shortDescription;
    if (updates.fullDescription !== undefined) dbPayload.full_description = updates.fullDescription;
    if (updates.grainLength !== undefined) dbPayload.grain_length = updates.grainLength;
    if (updates.moisture !== undefined) dbPayload.moisture = updates.moisture;
    if (updates.brokenRatio !== undefined) dbPayload.broken_ratio = updates.brokenRatio;
    if (updates.purity !== undefined) dbPayload.purity = updates.purity;
    if (updates.cropYear !== undefined) dbPayload.crop_year = updates.cropYear;
    if (updates.origin !== undefined) dbPayload.origin = updates.origin;
    if (updates.image !== undefined) dbPayload.image = updates.image;
    if (updates.badge !== undefined) dbPayload.badge = updates.badge;
    if (updates.active !== undefined) dbPayload.active = updates.active;
    if (updates.order !== undefined) dbPayload.order = updates.order;
    if (updates.specs !== undefined) dbPayload.specs = updates.specs;
    if (updates.packagingOptions !== undefined) dbPayload.packaging_options = updates.packagingOptions;

    await supabase.from('products').update(dbPayload).eq('id', id);
  } catch (err) {
    console.warn('[ProductsAPI] Supabase update warning:', err);
  }

  return res.json({ success: true, data: index !== -1 ? inMemoryProducts[index] : updates });
});

/**
 * DELETE /api/products/:id (Admin Only)
 */
router.delete('/:id', requireAuth, async (_req: AuthenticatedRequest, res: Response) => {
  const { id } = _req.params;
  inMemoryProducts = inMemoryProducts.filter((p) => p.id !== id);

  try {
    const supabase = getSupabase();
    await supabase.from('products').delete().eq('id', id);
  } catch (err) {
    console.warn('[ProductsAPI] Supabase delete warning:', err);
  }

  return res.json({ success: true, message: 'Product deleted.' });
});

function normalizeProductFromDb(row: any): any {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    tagline: row.tagline || '',
    shortDescription: row.short_description || row.shortDescription || '',
    fullDescription: row.full_description || row.fullDescription || '',
    grainLength: row.grain_length || row.grainLength || '',
    moisture: row.moisture || 'Max 12.5%',
    brokenRatio: row.broken_ratio || row.brokenRatio || 'Max 2.0%',
    purity: row.purity || '95% Minimum',
    cropYear: row.crop_year || row.cropYear || '2025 / 2026 Harvest',
    processingTypes: row.processing_types || ['White (Raw)', 'Parboiled (Sella)', 'Steamed'],
    pesticideWash: row.pesticide_wash || '',
    exportQuality: row.export_quality || '',
    characteristics: row.characteristics || [],
    targetMarkets: row.target_markets || '',
    packagingOptions: row.packaging_options || ['25 kg PP Bags', '50 kg Export Sacks'],
    origin: row.origin || 'Pakistan',
    dispatchPorts: row.dispatch_ports || 'Karachi Port (KPT) & Port Qasim (PQ), Pakistan',
    image: row.image || '/images/products/super-kernel.jpg',
    badge: row.badge || 'Export Grade A',
    active: row.active !== false,
    order: row.order || 1,
    specs: row.specs || {},
  };
}

export default router;
