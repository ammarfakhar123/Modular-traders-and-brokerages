-- ==============================================================================
-- MODULAR TRADERS AND BROKERAGE - SUPABASE POSTGRESQL SCHEMA
-- Description: Complete Database Schema for Products, Inquiries, Site Settings,
-- Storage Buckets, and Row Level Security (RLS) Policies.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT ('prod-' || floor(extract(epoch from now()) * 1000)::text),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Basmati', 'Non-Basmati', 'Parboiled', 'Brokerage')),
    grain_length TEXT,
    aroma TEXT,
    crop_year TEXT DEFAULT '2025 / 2026 Harvest',
    origin TEXT DEFAULT 'Sindh, Pakistan',
    tagline TEXT,
    short_description TEXT,
    full_description TEXT,
    image TEXT,
    active BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    "order" INTEGER DEFAULT 1,
    badge TEXT DEFAULT 'Grade A',
    broken_ratio TEXT DEFAULT 'Max 2%',
    moisture TEXT DEFAULT 'Max 12.5%',
    purity TEXT DEFAULT '95% Minimum',
    specs JSONB DEFAULT '{}'::jsonb,
    packaging_options JSONB DEFAULT '["25 kg PP Bags", "50 kg Export Sacks", "Bulk Jumbo Bags"]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. INQUIRIES TABLE (B2B Export Quotations)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY DEFAULT ('inq-' || floor(extract(epoch from now()) * 1000)::text),
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    destination_port TEXT,
    product_name TEXT,
    volume_mt NUMERIC DEFAULT 25,
    incoterms TEXT DEFAULT 'FOB Karachi',
    packaging TEXT DEFAULT '50 kg Export Jute/PP Sacks',
    notes TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Quoted', 'Negotiating', 'Closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary_settings',
    site_name TEXT DEFAULT 'Modular Traders and Brokerage',
    tagline TEXT DEFAULT 'Cultivating Trust',
    headquarters_address TEXT DEFAULT 'Sheikh Zayed Road, Dubai, UAE',
    contact_email TEXT DEFAULT 'trade@modulartraders.com',
    contact_phone TEXT DEFAULT '+971 4 XXX XXXX',
    contact_whatsapp TEXT DEFAULT '+971 50 123 4567',
    working_hours TEXT DEFAULT 'Monday to Friday, 9:00 am to 5:00 pm Gulf Standard Time',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read active products; Authenticated users can manage all
CREATE POLICY "Public can view active products" 
ON public.products FOR SELECT 
USING (active = true);

CREATE POLICY "Admins have full access to products" 
ON public.products FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Inquiries: Anyone can insert inquiries; Authenticated admins can view & update
CREATE POLICY "Public can submit inquiries" 
ON public.inquiries FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Admins can view and manage inquiries" 
ON public.inquiries FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Site Settings: Public can read; Authenticated admins can update
CREATE POLICY "Public can read site settings" 
ON public.site_settings FOR SELECT 
USING (true);

CREATE POLICY "Admins can update site settings" 
ON public.site_settings FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 6. STORAGE BUCKET FOR PRODUCT IMAGES
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- 7. INITIAL SEED DATA (7 RICE PRODUCTS)
INSERT INTO public.products (
    id, slug, name, category, grain_length, aroma, crop_year, origin, 
    tagline, short_description, full_description, image, active, featured, "order",
    badge, broken_ratio, moisture, purity, specs, packaging_options
) VALUES
(
    'prod-1',
    'pakistan-super-kernel-basmati-rice',
    'Pakistan Super Kernel Basmati Rice',
    'Basmati',
    '7.4 mm',
    'Rich Distinctive Floral Aroma',
    '2025 / 2026 Harvest (Aged 12-24 Months)',
    'Sindh & Punjab Basin, Pakistan',
    'The Undisputed Crown Jewel of Pakistani Basmati',
    'World-renowned aged long grain basmati rice, Sortex cleaned with an exceptional cooking elongation ratio of 2x+.',
    'Pakistan Super Kernel Basmati is globally celebrated as the premier standard in aromatic rice. Aged under humidity-controlled silos for 12 to 24 months to enhance cooking elongation and eliminate stickiness.',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80',
    true, true, 1, 'Crown Jewel', 'Max 2.0%', 'Max 12.0%', '98.0% Minimum',
    '{"grainLengthRaw": "7.4 mm avg", "cookedLength": "15.0 - 16.5 mm", "whiteness": "38 - 42 Kett", "cropYear": "2025/2026", "millingDegree": "Well Milled, 100% Double Polished, Sortex Cleaned"}'::jsonb,
    '["1 kg, 5 kg, 10 kg BOPP Designer Pouches", "25 kg & 50 kg Woven PP / Cotton Bags", "1000 kg Jumbo Bulk Bags"]'::jsonb
),
(
    'prod-2',
    'irri-6-long-grain-white-rice-sindh',
    'IRRI-6 Long Grain White Rice, Sindh Origin',
    'Non-Basmati',
    '6.0 mm - 6.2 mm',
    'Neutral, Clean Staple',
    '2025 / 2026 Harvest',
    'Sindh (Larkana, Jacobabad, Dadu Basin), Pakistan',
    'Sindh Origin High-Volume Global Staple Benchmark',
    'High-volume commercial white rice with firm cooking characteristics. The preferred staple across African, GCC, and Asian food markets.',
    'Cultivated along the fertile Indus River delta in Sindh province. IRRI-6 is Pakistan''s leading non-basmati export volume driver, offering consistent grain size, excellent shelf-life, and superior cost-efficiency.',
    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=80',
    true, true, 2, 'Volume Benchmark', 'Available in 5%, 10%, 15%, 25% or 100% Broken', 'Max 13.5%', '95.0% Minimum',
    '{"grainLengthRaw": "6.0 - 6.2 mm avg", "cookedLength": "10.5 - 11.5 mm", "whiteness": "40 - 44 Kett", "cropYear": "2025/2026", "millingDegree": "Double Silky Polished, Optical Sortex Cleaned"}'::jsonb,
    '["25 kg & 50 kg Export Quality Woven PP Bags", "Breakbulk vessel charter bags", "Custom buyer-branded multiwall packaging"]'::jsonb
),
(
    'prod-3',
    'irri-9-long-grain-white-rice',
    'IRRI-9 Long Grain White Rice',
    'Non-Basmati',
    '6.8 mm',
    'Subtle Commercial Sweetness',
    '2025 / 2026 Harvest',
    'Upper Sindh & Punjab Borders, Pakistan',
    'Slender Medium-Long Grain with Superior Firmness',
    'A slender, non-sticky premium non-basmati variety. Popular in Middle Eastern and East African commercial kitchens.',
    'IRRI-9 bridges the gap between commercial long grain rice and premium basmati. Its slender appearance, higher elongation ratio, and firm texture make it ideal for pilaf, biryani, and commercial catering.',
    'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1200&q=80',
    true, false, 3, 'Premium Commercial', 'Max 3.0%', 'Max 12.5%', '96.0% Minimum',
    '{"grainLengthRaw": "6.8 mm avg", "cookedLength": "12.0 - 13.5 mm", "whiteness": "40 - 43 Kett", "cropYear": "2025/2026", "millingDegree": "100% Double Polished, Optical Sortex"}'::jsonb,
    '["10 kg, 20 kg, 25 kg, 50 kg PP / Jute Bags", "Private label buyer printing available"]'::jsonb
),
(
    'prod-4',
    'pk-386-non-basmati-rice',
    'PK-386 Fragrant Long Grain Rice',
    'Non-Basmati',
    '6.8 mm - 7.0 mm',
    'Pleasing Delicate Fragrance',
    '2025 / 2026 Harvest',
    'Sindh & Punjab Agricultural Belts, Pakistan',
    'Economical Aromatic Table Rice for Mass Distribution',
    'Often celebrated as an affordable aromatic alternative to Basmati with uniform grain shape and tender cooking.',
    'PK-386 is cultivated specifically to deliver a basmati-like eating experience at a competitive commercial price. Popular among retail supermarket chains across the GCC, Africa, and Southeast Asia.',
    'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1200&q=80',
    true, false, 4, 'Economical Aromatic', 'Max 4.0%', 'Max 12.5%', '95.0% Minimum',
    '{"grainLengthRaw": "6.8 - 7.0 mm avg", "cookedLength": "12.5 - 13.5 mm", "whiteness": "38 - 42 Kett", "cropYear": "2025/2026", "millingDegree": "Sortex Cleaned, Silky Polished"}'::jsonb,
    '["5 kg, 10 kg, 25 kg, 50 kg PP Bags", "Custom export master cartons"]'::jsonb
),
(
    'prod-5',
    'sindh-basmati-d98-heritage-rice',
    'Sindh Basmati / D-98 Heritage Rice',
    'Basmati',
    '6.6 mm',
    'Authentic Earthy Sindhi Basmati Aroma',
    '2025 / 2026 Harvest',
    'Historic Sindh Indus Basin (Thatta & Badin), Pakistan',
    'Ancient Indus Delta Cultivar with High Kernel Strength',
    'A heritage Basmati variety grown in the unique microclimate of southern Sindh, famed for its distinct aroma and rich mineral taste.',
    'D-98 (Sindh Basmati) has been cultivated in the southern Indus Delta for decades. It delivers an unmistakably authentic aroma, rich grain density, and resilience under commercial culinary preparation.',
    'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=1200&q=80',
    true, false, 5, 'Indus Heritage', 'Max 3.0%', 'Max 12.5%', '96.0% Minimum',
    '{"grainLengthRaw": "6.6 mm avg", "cookedLength": "12.0 - 13.0 mm", "whiteness": "38 - 41 Kett", "cropYear": "2025/2026", "millingDegree": "Double Polished Sortex"}'::jsonb,
    '["10 kg, 25 kg, 50 kg PP / Jute Bags", "Bulk container liner options"]'::jsonb
),
(
    'prod-6',
    'parboiled-sella-rice-varieties-irri-pk',
    'Parboiled (Sella) Rice Varieties (IRRI-6 / PK / Basmati)',
    'Parboiled',
    '6.4 mm - 7.5 mm',
    'Nutty, Warm Steamed Aroma',
    '2025 / 2026 Harvest',
    'Sindh & Punjab Milling Clusters, Pakistan',
    'Extra-Hard Kernels, Zero Breakage During Heavy Cooking',
    'Hydro-thermally soaked and steam-cured golden and white sella rice. Guaranteed non-sticky grains for massive catering and industrial kitchens.',
    'Our Parboiled Sella grains undergo controlled hydrostatic soaking and high-pressure steaming before precision milling. This locks essential paddy nutrients into the endosperm, creating an exceptionally resilient kernel.',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
    true, true, 6, 'Heavy Kitchen Essential', 'Max 1.0% - 2.0%', 'Max 12.0%', '98.0% Minimum',
    '{"grainLengthRaw": "6.4 mm (IRRI) up to 7.5 mm (Basmati)", "cookedLength": "13.0 - 17.0 mm", "color": "Golden Sella / Creamy White Sella", "cropYear": "2025/2026", "millingDegree": "Optical Sortex Cleaned, Triple Silky Polished"}'::jsonb,
    '["20 kg, 25 kg, 40 kg, 50 kg Heavy-Duty PP Sacks", "Bulk 1-Ton Jumbo Bags"]'::jsonb
),
(
    'prod-7',
    'custom-sourcing-and-global-brokerage-requests',
    'Custom Agricultural Sourcing & Global Brokerage Requests',
    'Brokerage',
    'Tailored to Client Specifications',
    'As Requested',
    '2025 / 2026 Agricultural Season',
    'All Pakistan Origins & Global Freight Routes',
    'End-to-End Agri-Commodity Brokerage & Port Logistics',
    'Dedicated advisory, private mill allocations, quality inspection oversight, and charter vessel brokerage from Karachi to 30+ global ports.',
    'For multinational grain distributors, governmental food security tenders, and private brands requiring tailored quality specs. Modular Traders acts as your dedicated brokerage desk headquartered in Dubai.',
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    true, true, 7, 'Brokerage Service', 'Custom Specification (Down to 1% Broken)', 'Guaranteed Contractual Limit', 'Lab Certified',
    '{"contractTerms": "FOB Karachi / CIF / CFR Worldwide", "minimumOrder": "1x 20ft FCL (approx. 25-27 Metric Tons)", "inspection": "Pre-shipment SGS, Cotecna, Bureau Veritas or Intertek", "paymentTerms": "Irrevocable Confirmed L/C at sight, CAD, or T/T escrow"}'::jsonb,
    '["Private Label Packaging (Full Gravure / Flexo Printing)", "5 kg, 10 kg, 20 kg, 25 kg, 50 kg PP/Jute/Non-Woven", "Breakbulk vessel sling bags / 1-Ton Jumbo Bags"]'::jsonb
);

-- End of Supabase Schema
