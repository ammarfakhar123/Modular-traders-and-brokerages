-- ==============================================================================
-- MODULAR TRADERS AND BROKERAGE - COMPLETE SUPABASE SQL SCHEMA
-- Target Database: https://ptjwbwxwemwmhbogwaeh.supabase.co
-- Description: Creates products, inquiries, site_settings tables, RLS policies,
-- storage buckets, and seeds all 12 signature export varieties.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT ('prod-' || floor(extract(epoch from now()) * 1000)::text),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    tagline TEXT,
    short_description TEXT,
    full_description TEXT,
    grain_length TEXT,
    moisture TEXT DEFAULT 'Max 12.5%',
    broken_ratio TEXT DEFAULT 'Max 2%',
    purity TEXT DEFAULT '95% Minimum',
    crop_year TEXT DEFAULT 'Fresh 2025 / 2026 Harvest',
    processing_types JSONB DEFAULT '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    pesticide_wash TEXT,
    export_quality TEXT,
    characteristics JSONB DEFAULT '[]'::jsonb,
    target_markets TEXT,
    packaging_options JSONB DEFAULT '["10 kg, 25 kg, 50 kg PP Sacks"]'::jsonb,
    origin TEXT DEFAULT 'Pakistan (Punjab & Sindh Belts)',
    dispatch_ports TEXT DEFAULT 'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    image TEXT,
    badge TEXT DEFAULT 'Export Grade A',
    active BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    "order" INTEGER DEFAULT 1,
    specs JSONB DEFAULT '{}'::jsonb,
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
    volume_mt TEXT DEFAULT '25-50 MT',
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
    headquarters_address TEXT DEFAULT 'Z Signature, 46-C, 4 Shahbaz Commercial Ln, Shahbaz Commercial Area, Phase 6, DHA, Karachi, 75500, Pakistan',
    contact_email TEXT DEFAULT 'info@modularagro.com',
    contact_phone TEXT DEFAULT '+92 3144447656',
    contact_whatsapp TEXT DEFAULT '+92 3144447656',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Products Policies: Public can read active products; Authenticated users have full access
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
CREATE POLICY "Public can view active products" 
ON public.products FOR SELECT 
USING (active = true);

DROP POLICY IF EXISTS "Admins have full access to products" ON public.products;
CREATE POLICY "Admins have full access to products" 
ON public.products FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Inquiries Policies: Public can insert inquiries; Authenticated admins can view & update
DROP POLICY IF EXISTS "Public can submit inquiries" ON public.inquiries;
CREATE POLICY "Public can submit inquiries" 
ON public.inquiries FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage inquiries" ON public.inquiries;
CREATE POLICY "Admins can view and manage inquiries" 
ON public.inquiries FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Site Settings Policies: Public can read; Authenticated admins can update
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
CREATE POLICY "Public can read site settings" 
ON public.site_settings FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
CREATE POLICY "Admins can update site settings" 
ON public.site_settings FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 6. STORAGE BUCKET FOR PRODUCT MEDIA
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- 7. SEED SITE SETTINGS
INSERT INTO public.site_settings (id, site_name, tagline, headquarters_address, contact_email, contact_phone, contact_whatsapp)
VALUES (
    'primary_settings',
    'Modular Traders and Brokerage',
    'Cultivating Trust',
    'Z Signature, 46-C, 4 Shahbaz Commercial Ln, Shahbaz Commercial Area, Phase 6, DHA, Karachi, 75500, Pakistan',
    'info@modularagro.com',
    '+92 3144447656',
    '+92 3144447656'
)
ON CONFLICT (id) DO UPDATE SET
    headquarters_address = EXCLUDED.headquarters_address,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone,
    contact_whatsapp = EXCLUDED.contact_whatsapp;

-- 8. SEED ALL 12 EXPORT RICE VARIETIES
INSERT INTO public.products (
    id, slug, name, category, tagline, short_description, full_description,
    grain_length, moisture, broken_ratio, purity, crop_year, processing_types,
    pesticide_wash, export_quality, characteristics, target_markets, packaging_options,
    origin, dispatch_ports, image, badge, active, "order"
) VALUES
(
    'prod-1',
    '1121-basmati-rice',
    '1121 Basmati Rice',
    'Basmati Rice',
    'Extra-Long Grain Kainat Benchmark with Extraordinary Cooking Elongation',
    'World-renowned extra-long grain Kainat Basmati delivering exceptional kernel length, delicate fragrance, and slender separate grains.',
    '1121 Basmati Rice (Kainat) is celebrated worldwide as the benchmark for extra-long grain aromatic rice. Cultivated in the fertile Himalayan-fed river basins of Punjab and upper Sindh, each slender grain expands up to 2.5 times its raw length upon cooking without splitting or sticking.',
    '8.35 – 8.4 mm avg',
    'Max 12.5%',
    'Max 1.0% – 2.0%',
    '96% Minimum, 100% Optical Sortex Clean',
    'Fresh 2025 / 2026 Harvest & Naturally Aged',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (100% Sortex Cleaned, fully compliant with EU, GCC & US FDA MRL standards).',
    'Export Grade A / Silky Double Polished, Chalky Grains < 2.0%, Damaged/Discolored < 0.5%, Foreign Matter Nil.',
    '["World-renowned extra-long raw kernel (8.35 – 8.4 mm avg)", "Tremendous post-cooking elongation reaching 20–22 mm", "Available across White (Raw), Parboiled, and Steamed forms"]'::jsonb,
    'GCC, United Kingdom, European Union, North America, and Specialty Banqueting.',
    '["1 kg, 2 kg, 5 kg, 10 kg Retail Pouches", "20 kg, 25 kg, 40 kg, 50 kg Heavy-Duty PP Sacks", "Custom Private Label OEM Packaging"]'::jsonb,
    'Pakistan (Punjab & Sindh Himalayan-fed Basins)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/1121-kainat.jpg',
    'Extra-Long Grain 8.4mm',
    true,
    1
),
(
    'prod-2',
    'super-kernel-basmati-rice',
    'Super Kernel Basmati Rice',
    'Basmati Rice',
    'The Traditional Pride of Punjab with Exquisite Floral Aroma',
    'Heritage Pakistani Basmati offering delicate kernel structure, distinct floral scent, and tender cooked sweetness.',
    'Pakistan Super Kernel Basmati is globally celebrated as the premier standard in traditional aromatic rice. Aged under humidity-controlled conditions to enhance cooking elongation and eliminate stickiness.',
    '7.2 – 7.4 mm avg',
    'Max 12.5%',
    'Max 1.5% – 2.0%',
    '95% Minimum, Aged Stock',
    'Naturally Aged 12–24 Months',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned, EU & GCC MRL Compliant).',
    'Export Grade A / Optical Sortex Cleaned, Chalky < 2.0%, Damaged < 0.5%, Foreign Matter Nil.',
    '["Authentic heritage Pakistani aroma profile", "Supplied in Raw White, Parboiled (Sella), and Steamed grades", "Aged for authentic culinary richness"]'::jsonb,
    'Middle East, Europe, North America, and Global Gourmet Retail.',
    '["5 kg, 10 kg, 20 kg, 25 kg, 50 kg PP / Jute Bags", "Customized Private Label Bags"]'::jsonb,
    'Pakistan (Punjab Heartlands - Chenab & Ravi Basins)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/super-kernel.jpg',
    'Aromatic Heritage',
    true,
    2
),
(
    'prod-3',
    'super-basmati-rice',
    'Super Basmati Rice',
    'Basmati Rice',
    'Premium Long Grain Aromatic Basmati for Discerning Table Service',
    'Versatile, highly aromatic Pakistani Super Basmati with excellent grain integrity and elongation.',
    'Super Basmati is an established, dependable cultivar representing the best of modern Pakistani aromatic agriculture.',
    '7.1 – 7.3 mm avg',
    'Max 12.5%',
    'Max 2.0%',
    '95% Minimum',
    '2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned).',
    'Export Grade A / Silky Polished Sortex.',
    '["Distinct sweet Basmati aroma", "Available in Raw, Sella, and Steamed forms", "Firm, slender grains with dry separation"]'::jsonb,
    'Middle East, Europe, and Global Distributors.',
    '["10 kg, 20 kg, 25 kg, 50 kg PP Bags", "Custom Private Label"]'::jsonb,
    'Pakistan (Punjab River Valleys)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/pk385.jpg',
    'Export Standard',
    true,
    3
),
(
    'prod-4',
    'pk-385-basmati-rice',
    'PK-385 Basmati Rice',
    'Basmati Rice',
    'Historic Basmati Cultivar Renowned for Sweet Fragrance and Delicate Texture',
    'Classic Pakistani cultivar with an unmistakable aroma and delicate, separate grains upon cooking.',
    'PK-385 is one of Pakistan''s most storied aromatic varieties, treasured for generations for its intense natural fragrance and delicate eating texture.',
    '6.8 – 7.0 mm avg',
    'Max 12.5%',
    'Max 2.0%',
    '95% Minimum',
    '2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned).',
    'Export Grade A / Optical Sortex Cleaned.',
    '["Historic cultivar with intense floral aroma", "Supplied in Raw White, Sella, and Steamed variations", "Soft and tender mouthfeel after cooking"]'::jsonb,
    'GCC, North America, Southeast Asia, and Retail Packs.',
    '["10 kg, 20 kg, 25 kg, 50 kg PP / Jute Sacks", "Private Label Branding and Bulk Packaging"]'::jsonb,
    'Pakistan (Punjab Agricultural Belts)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/super-kernel.jpg',
    'Classic Punjab Basmati',
    true,
    4
),
(
    'prod-5',
    'pk-515-basmati-rice',
    'PK-515 Basmati Rice',
    'Basmati Rice',
    'Modern High-Yielding Basmati with Refined Slender Grain Profile',
    'A high-performing contemporary Basmati variety engineered for excellent grain clarity and aromatic richness.',
    'PK-515 Basmati Rice is an advanced aromatic cultivar bred to combine authentic Basmati characteristics with vigorous field resilience and high milling recovery.',
    '7.0 – 7.2 mm avg',
    'Max 12.5%',
    'Max 2.0%',
    '95% Minimum',
    '2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned).',
    'Export Grade A / Optical Sortex Silky Polished.',
    '["High kernel clarity with minimal chalkiness", "Pleasant natural Basmati aroma and tender cooked texture", "Supplied in White, Parboiled, and Steamed"]'::jsonb,
    'Middle East, Southeast Asia, Africa, and International Retail Brands.',
    '["5 kg, 10 kg, 25 kg, 50 kg Export Bags", "Customized Private Label packaging"]'::jsonb,
    'Pakistan (Punjab & Upper Sindh Belts)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/sindh-basmati.jpg',
    'High-Yield Basmati',
    true,
    5
),
(
    'prod-6',
    'basmati-1692-rice',
    'Basmati 1692 Rice',
    'Basmati Rice',
    'Early-Maturity Slender Basmati with Crisp Cooking Separation',
    'Early-harvest aromatic variety with an impressive slender grain length, bright white appearance, and superb elongation.',
    'Basmati 1692 is an early-maturing, semi-dwarf aromatic variety that delivers extraordinary grain aesthetics and high post-cooking elongation.',
    '7.3 – 7.5 mm avg',
    'Max 12.5%',
    'Max 1.5% – 2.0%',
    '95% Minimum',
    'Fresh 2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (100% Sortex Cleaned).',
    'Export Grade A / Double Polished Optical Sortex.',
    '["Extra-slender kernel profile (7.3 – 7.5 mm avg)", "Rapid post-cooking elongation with non-sticky grains", "Bright, radiant white milling appearance"]'::jsonb,
    'Middle East, Europe, Africa, and Global Retail Chains.',
    '["1 kg, 5 kg, 10 kg, 25 kg, 50 kg PP / Jute Bags"]'::jsonb,
    'Pakistan (Punjab Basmati Growing Belts)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/1121-kainat.jpg',
    'Slender Modern Basmati',
    true,
    6
),
(
    'prod-7',
    'basmati-1718-rice',
    'Basmati 1718 Rice',
    'Basmati Rice',
    'Advanced Disease-Resistant Basmati Line with Superior Grain Uniformity',
    'An upgraded cultivar of 1121 offering similar elongation and kernel length with enhanced crop purity and cooking firmness.',
    'Basmati 1718 is a premier agricultural milestone, evolved from the pedigree of 1121 to offer enhanced resistance to crop lodging while matching 1121''s legendary elongated presentation.',
    '8.2 – 8.35 mm avg',
    'Max 12.5%',
    'Max 1.5% – 2.0%',
    '95% Minimum',
    'Fresh 2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned).',
    'Export Grade A / Silky Polished Sortex.',
    '["Comparable elongation to 1121 (up to 20 mm cooked)", "Uniform grain geometry with ultra-low broken percentage", "Processed into White, Golden Sella, and Steamed"]'::jsonb,
    'GCC (Saudi Arabia, UAE, Oman), Europe, and North America.',
    '["5 kg, 10 kg, 20 kg, 25 kg, 50 kg PP Bags"]'::jsonb,
    'Pakistan (Punjab Core Rice Belts)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/1121-kainat.jpg',
    'Upgraded 1121 Pedigree',
    true,
    7
),
(
    'prod-8',
    'basmati-1509-rice',
    'Basmati 1509 Rice',
    'Basmati Rice',
    'Quick-Cooking Extra Long Basmati with Outstanding Plate Economy',
    'A high-yielding long grain aromatic variety delivering extraordinary elongation at highly competitive volume pricing.',
    'Basmati 1509 has become an international commercial favorite for large-scale foodservice operators, offering extra-long grain elongation comparable to 1121 at an attractive volume cost point.',
    '8.2 – 8.4 mm avg',
    'Max 12.5%',
    'Max 2.0%',
    '95% Minimum',
    'Fresh 2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned).',
    'Export Grade A / Silky Sortex Cleaned.',
    '["Remarkable elongation ratio (over 2x raw length)", "Delicate natural aroma with soft cooked kernel", "Offered in White (Raw), Parboiled (Sella), and Steamed forms"]'::jsonb,
    'Middle East, Africa, UK, and Commercial Foodservice Distributors.',
    '["10 kg, 25 kg, 50 kg PP Bags, Custom Retail Packs"]'::jsonb,
    'Pakistan (Punjab & Northern Sindh)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/super-kernel.jpg',
    'Extra-Long Economy Basmati',
    true,
    8
),
(
    'prod-9',
    'irri-6-long-grain-rice',
    'IRRI-6 Long Grain Rice',
    'Non-Basmati Rice',
    'Pakistan''s Flagship Volume Export White Rice for Global Food Security',
    'The premier commercial staple export rice of Sindh, Pakistan, trusted by bulk commodity buyers worldwide.',
    'Cultivated extensively along the fertile Indus River basin across Sindh province, IRRI-6 is Pakistan''s leading non-basmati export volume driver, offering dependable grain hardness, low broken rates, and unmatched cost-efficiency for bulk food security distribution.',
    '6.0 – 6.2 mm avg',
    'Max 13.0% – 14.0%',
    '5%, 10%, 15%, 25%, 100% Broken',
    '95% Minimum, 100% Sortex Clean',
    'Fresh 2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned).',
    'Export Grade A / Silky Polished Sortex.',
    '["Firm, robust kernel with high milling recovery", "Flexible broken percentages: 5% (Sortex), 10%, 15%, 25%, and 100% Broken", "Supplied in Raw White, Parboiled, and Steamed"]'::jsonb,
    'Africa, China, Southeast Asia, Middle East, and United Nations tenders.',
    '["25 kg, 50 kg Export Polypropylene (PP) Sacks", "1000 kg Jumbo Bags"]'::jsonb,
    'Pakistan (Sindh Province - Larkana, Jacobabad, Dadu)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/irri6.jpg',
    'Volume Staple',
    true,
    9
),
(
    'prod-10',
    'irri-9-c9-long-grain-rice',
    'IRRI-9 / C9 Long Grain Rice',
    'Non-Basmati Rice',
    'Slender Long Grain Non-Basmati with Clean Optical Clarity',
    'Slender, well-polished commercial long grain rice delivering an attractive visual presentation and tender cooking texture.',
    'IRRI-9 (commonly classified as C9) is a slender non-basmati long-grain rice grown extensively in upper Sindh and Punjab. Offering an average kernel length of 6.8 mm, it bridges the gap between commercial white rice and premium table varieties.',
    '6.8 mm avg',
    'Max 13.0%',
    'Max 2.0% – 5.0%',
    '95% Minimum, 100% Sortex Clean',
    'Fresh 2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned).',
    'Export Grade A / Silky Polished Sortex Clean.',
    '["Slender, uniform kernel profile (6.8 mm avg length)", "High optical clarity with minimal chalkiness", "Available in Raw White, Parboiled (Sella), and Steamed"]'::jsonb,
    'Africa, Europe, Foodservice Operators, and Supermarket Retailers.',
    '["5 kg, 10 kg, 20 kg, 25 kg, 50 kg PP Bags", "Custom OEM Packaging"]'::jsonb,
    'Pakistan (Upper Sindh & Punjab Belts)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/irri9.jpg',
    'Slender Non-Basmati',
    true,
    10
),
(
    'prod-11',
    'pk-386-long-grain-white-rice',
    'PK-386 Long Grain White Rice',
    'Non-Basmati Rice',
    'Tender Cooking Non-Basmati Table Rice with Excellent Elongation',
    'Affordable everyday table rice offering soft cooking texture and grain separation similar to classic Basmati.',
    'PK-386 is cultivated across Punjab and Sindh to provide an affordable, high-quality non-basmati table rice that mimics the cooking characteristics and elongation of Basmati at an economical price point.',
    '6.7 – 6.9 mm avg',
    'Max 12.5% – 13.0%',
    'Max 2.0% – 5.0%',
    '95% Minimum, 100% Sortex Clean',
    'Fresh 2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned).',
    'Export Grade A / Silky Polished Sortex.',
    '["Delicate kernel with Basmati-like cooking elongation", "High visual clarity and low chalkiness", "Supplied in Raw White, Parboiled, and Steamed grades"]'::jsonb,
    'Middle East, East Africa, Commercial Caterers, and Retail Chains.',
    '["10 kg, 20 kg, 25 kg, 50 kg PP Bags"]'::jsonb,
    'Pakistan (Punjab Rice Belt)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/sindh-basmati.jpg',
    'Table Quality',
    true,
    11
),
(
    'prod-12',
    'ks-282-long-grain-rice',
    'KS-282 Long Grain Rice',
    'Non-Basmati Rice',
    'Robust Commercial Long Grain Non-Basmati for Bulk Catering & Parboiling',
    'Strong-grained non-basmati variety with exceptional parboiling properties and high resistance to over-cooking.',
    'KS-282 is a heavy-duty, long-grain non-basmati cultivar bred for outstanding grain firmness and high starch density, making it virtually immune to breakage or stickiness during extensive commercial preparation.',
    '6.6 – 6.8 mm avg',
    'Max 13.0%',
    'Max 3.0% – 5.0%',
    '95% Minimum, 100% Sortex Clean',
    'Fresh 2025 / 2026 Harvest',
    '["White (Raw)", "Parboiled (Sella)", "Steamed"]'::jsonb,
    'Pesticide Residue-Washed & Tested (Sortex 100% Cleaned).',
    'Export Grade A / Silky Polished Sortex Clean.',
    '["Hard, resilient kernel ideal for institutional cooking", "Exceptional elongation in Golden Sella / Parboiled form", "Processed in Raw White, Parboiled, and Steamed forms"]'::jsonb,
    'Middle East, Africa, Central Asia, and Industrial Food Processing.',
    '["25 kg, 50 kg Export Bags", "1000 kg Jumbo Bags"]'::jsonb,
    'Pakistan (Punjab & Sindh Basins)',
    'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan',
    '/images/products/irri6.jpg',
    'Robust Long Grain',
    true,
    12
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    tagline = EXCLUDED.tagline,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    grain_length = EXCLUDED.grain_length,
    moisture = EXCLUDED.moisture,
    broken_ratio = EXCLUDED.broken_ratio,
    purity = EXCLUDED.purity,
    crop_year = EXCLUDED.crop_year,
    processing_types = EXCLUDED.processing_types,
    pesticide_wash = EXCLUDED.pesticide_wash,
    export_quality = EXCLUDED.export_quality,
    characteristics = EXCLUDED.characteristics,
    target_markets = EXCLUDED.target_markets,
    packaging_options = EXCLUDED.packaging_options,
    origin = EXCLUDED.origin,
    dispatch_ports = EXCLUDED.dispatch_ports,
    image = EXCLUDED.image,
    badge = EXCLUDED.badge,
    active = EXCLUDED.active,
    "order" = EXCLUDED."order";

-- 9. SEED DEMO INQUIRIES
INSERT INTO public.inquiries (
    id, full_name, company_name, email, phone, country, destination_port,
    product_name, volume_mt, incoterms, packaging, notes, status
) VALUES
(
    'inq-101',
    'Tariq Al-Fahad',
    'Al-Fahad Grain Trading Co',
    'tariq@alfahadgrain.sa',
    '+966 50 882 1944',
    'Saudi Arabia',
    'Jeddah Islamic Port',
    'Super Kernel Basmati Rice',
    '50 MT (2 Containers)',
    'CIF Jeddah',
    '25 kg PP Bags (Private Label)',
    'Looking for 2x 20ft FCL trial shipment of aged harvest with SGS pre-shipment inspection.',
    'New'
),
(
    'inq-102',
    'Patrick Ochieng',
    'Equatorial Commodity Importers Ltd',
    'p.ochieng@equatorialcommodities.ke',
    '+254 712 345 678',
    'Kenya',
    'Mombasa Port',
    'IRRI-6 Long Grain White Rice, Sindh Origin',
    '250 MT',
    'CIF Mombasa',
    '50 kg Export Jute/PP Sacks',
    'Monthly requirement of 5-10 FCLs. Require Sortex 5% broken grain certificate.',
    'Quoted'
)
ON CONFLICT (id) DO NOTHING;

-- Verification Query
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
