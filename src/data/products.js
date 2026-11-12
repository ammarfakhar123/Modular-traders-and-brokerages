/**
 * Master Rice Catalog for Modular Traders and Brokerage (Karachi, Pakistan)
 * 
 * Two Core Export Categories:
 * 1. Basmati Rice (8 Signature Varieties)
 * 2. Non-Basmati Rice (4 High-Volume Varieties)
 * 
 * Every product features:
 * - 3 Processing Types: White (Raw), Parboiled (Sella), and Steamed
 * - Export Quality Parameters (Length, Moisture, Broken %, Purity, Crop Year)
 * - Pesticide-Washed & Residue-Free Food Safety Certification
 */

export const initialProducts = [
  // ===========================================================================
  // CATEGORY 1: BASMATI RICE (8 VARIETIES)
  // ===========================================================================
  {
    id: "prod-1",
    slug: "1121-basmati-rice",
    name: "1121 Basmati Rice",
    category: "Basmati Rice",
    tagline: "Extra-Long Grain Kainat Benchmark with Extraordinary Cooking Elongation",
    shortDescription:
      "World-renowned extra-long grain Kainat Basmati delivering exceptional kernel length, delicate fragrance, and slender separate grains.",
    fullDescription:
      "1121 Basmati Rice (Kainat) is celebrated worldwide as the benchmark for extra-long grain aromatic rice. Cultivated in the fertile Himalayan-fed river basins of Punjab and upper Sindh, each slender grain expands up to 2.5 times its raw length upon cooking without splitting or sticking. Highly demanded across premium culinary establishments, royal banquets, and high-end retail packaging worldwide.",
    grainLength: "8.35 – 8.4 mm avg",
    moisture: "Max 12.5%",
    brokenRatio: "Max 1.0% – 2.0%",
    purity: "96% Minimum, 100% Optical Sortex Clean",
    cropYear: "Fresh 2025 / 2026 Harvest & Naturally Aged",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (100% Sortex Cleaned, high-pressure water polished, fully compliant with EU, GCC & US FDA MRL standards).",
    exportQuality:
      "Export Grade A / Silky Double Polished, Chalky Grains < 2.0%, Damaged/Discolored < 0.5%, Foreign Matter Nil.",
    characteristics: [
      "World-renowned extra-long raw kernel (8.35 – 8.4 mm avg)",
      "Tremendous post-cooking elongation reaching 20–22 mm",
      "Available across White (Raw), Parboiled (Golden & Creamy Sella), and Steamed forms",
      "Pesticide residue-washed and dual-camera optical Sortex cleaned",
      "Non-sticky, dry, and separate fluffy grain texture",
    ],
    targetMarkets:
      "GCC (Saudi Arabia, UAE, Qatar, Kuwait, Oman), United Kingdom, European Union, North America, and Specialty Banqueting.",
    packagingOptions: [
      "1 kg, 2 kg, 5 kg, 10 kg Retail Pouches / Non-Woven Zipper Bags",
      "20 kg, 25 kg, 40 kg, 50 kg Heavy-Duty PP / Cotton Sacks",
      "Custom Private Label OEM Packaging with buyer branding",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab & Upper Sindh Basins)",
    image: "/images/products/super-kernel.jpg",
    badge: "World's Longest Grain",
    isService: false,
    order: 1,
  },
  {
    id: "prod-2",
    slug: "super-kernel-basmati-rice",
    name: "Super Kernel Basmati Rice",
    category: "Basmati Rice",
    tagline: "The Benchmark in Premium Pakistani Aromatic Basmati",
    shortDescription:
      "Naturally aged, extra-long slender basmati prized for its signature sweet floral aroma, fluffy texture, and remarkable culinary performance.",
    fullDescription:
      "Super Kernel Basmati Rice is globally celebrated as the crown jewel of Pakistani agricultural exports. Grown exclusively in the historic Kalar basmati bowl of Punjab nourished by pristine glacier meltwaters, this variety undergoes meticulous natural curing and aging to lock in its distinct sweet floral aroma and signature slender elongation upon preparation.",
    grainLength: "7.2 – 7.4 mm avg",
    moisture: "Max 12.0%",
    brokenRatio: "Max 1.5% – 2.0%",
    purity: "95% Minimum, 100% Optical Sortex Clean",
    cropYear: "Naturally Aged 12–24 Months & Fresh Crop",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (100% Sortex Cleaned, hygienic water-polished, compliant with international MRL tolerances).",
    exportQuality:
      "Export Grade A / Silky Polished, Chalky < 2.0%, Damaged < 0.5%, Foreign Matter Nil.",
    characteristics: [
      "Renowned natural sweet floral fragrance",
      "Slender, needle-shaped uncooked kernel (7.2 – 7.4 mm)",
      "Available in White (Raw), Parboiled (Sella), and Steamed forms",
      "Pesticide residue-washed with certified international lab clearance",
      "Traditional controlled aging for maximum elongation and fluffiness",
    ],
    targetMarkets:
      "Middle East, United Kingdom, European Union, Australia, North America, and Gourmet Foodservice.",
    packagingOptions: [
      "1 kg, 2 kg, 5 kg, 10 kg Retail Packs",
      "20 kg, 25 kg, 40 kg, 50 kg PP / Cotton Bags",
      "Private Label Branding with barcoding & multi-lingual prints",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab Kalar Basmati Belt)",
    image: "/images/products/super-kernel.jpg",
    badge: "Flagship Basmati",
    isService: false,
    order: 2,
  },
  {
    id: "prod-3",
    slug: "super-basmati-rice",
    name: "Super Basmati Rice",
    category: "Basmati Rice",
    tagline: "Traditional Heritage Aromatic Cultivar with Delicate Grain Texture",
    shortDescription:
      "Classic traditional Basmati variety with rich nutty scent, delicate slender grain structure, and authentic heritage taste.",
    fullDescription:
      "Super Basmati Rice represents the time-honored pedigree of Pakistani aromatic rice cultivation. Milled to perfection and optical-sorted, it features an authentic nutty fragrance, delicate grain tenderness, and a clean, dry plate presentation that has made it a household favorite across international ethnic and culinary markets.",
    grainLength: "7.0 – 7.2 mm avg",
    moisture: "Max 12.5%",
    brokenRatio: "Max 2.0%",
    purity: "95% Minimum",
    cropYear: "2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (100% Sortex Cleaned, compliant with EU & GCC MRL standards).",
    exportQuality:
      "Export Grade A / Silky Sortex Cleaned, Chalky < 2.5%, Damaged < 0.5%.",
    characteristics: [
      "Authentic heritage Pakistani Basmati cultivar",
      "Natural nutty fragrance and delicate palate feel",
      "Offered in Raw White, Parboiled (Sella), and Steam milling",
      "Pesticide residue-washed and optical color sorted",
      "Dependable elongation and separate grain texture",
    ],
    targetMarkets:
      "Middle East, Europe, United Kingdom, Diaspora Retailers, and Banqueting.",
    packagingOptions: [
      "5 kg, 10 kg, 20 kg, 25 kg, 50 kg Export Bags",
      "Custom Packaging with Buyer Specifications",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab Basmati Bowl)",
    image: "/images/products/sindh-basmati.jpg",
    badge: "Traditional Aromatic",
    isService: false,
    order: 3,
  },
  {
    id: "prod-4",
    slug: "pk-385-basmati-rice",
    name: "PK-385 Basmati Rice",
    category: "Basmati Rice",
    tagline: "Historic Punjab Aromatic Strain with Superior Cooking Resilience",
    shortDescription:
      "An established Punjab aromatic variety combining pleasant aroma, firm kernel strength, and excellent value for commercial catering.",
    fullDescription:
      "PK-385 Basmati Rice has a distinguished history as one of the foundational commercial Basmati strains of Pakistan. Cultivated in the fertile soils of Punjab, it features a pronounced aromatic profile and hearty kernel resilience that resists breaking during prolonged cooking, making it widely favored by restaurant chains, caterers, and bulk retail packers.",
    grainLength: "6.8 – 7.0 mm avg",
    moisture: "Max 12.5%",
    brokenRatio: "Max 2.0%",
    purity: "95% Minimum",
    cropYear: "2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Multi-Stage Sortex Cleaned (EU / GCC MRL Compliant).",
    exportQuality:
      "Export Grade A / Well Milled Double Polished, Chalky < 2.5%, Damaged < 0.5%.",
    characteristics: [
      "Classic historical Punjab Basmati cultivar",
      "Hearty grain body that maintains structure under heavy steam cooking",
      "Available in Raw White, Sella (Parboiled), and Steam Rice",
      "Pesticide residue-washed with complete quality certification",
      "Cost-effective premium aromatic sourcing",
    ],
    targetMarkets:
      "Middle East, Central Asia, Europe, and Commercial Foodservice Distributors.",
    packagingOptions: [
      "10 kg, 20 kg, 25 kg, 50 kg PP / Jute Sacks",
      "Private Label Branding and Bulk Packaging",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab Agricultural Belts)",
    image: "/images/products/super-kernel.jpg",
    badge: "Classic Punjab Basmati",
    isService: false,
    order: 4,
  },
  {
    id: "prod-5",
    slug: "pk-515-basmati-rice",
    name: "PK-515 Basmati Rice",
    category: "Basmati Rice",
    tagline: "Modern High-Yielding Basmati with Refined Slender Grain Profile",
    shortDescription:
      "A high-performing contemporary Basmati variety engineered for excellent grain clarity, high milling yield, and aromatic richness.",
    fullDescription:
      "PK-515 Basmati Rice is an advanced aromatic cultivar bred to combine authentic Basmati characteristics with vigorous field resilience and high milling recovery. Featuring a bright, slender kernel and pleasing natural scent, it cooks to a soft, fluffy texture with remarkable grain separation.",
    grainLength: "7.0 – 7.2 mm avg",
    moisture: "Max 12.5%",
    brokenRatio: "Max 2.0%",
    purity: "95% Minimum",
    cropYear: "2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (Sortex 100% Cleaned, compliant with global food safety standards).",
    exportQuality:
      "Export Grade A / Optical Sortex Silky Polished, Chalky < 2.0%, Damaged < 0.5%.",
    characteristics: [
      "High kernel clarity with minimal chalkiness",
      "Pleasant natural Basmati aroma and tender cooked texture",
      "Supplied in White (Raw), Parboiled (Sella), and Steamed variations",
      "Pesticide residue-washed with zero chemical taint",
      "Excellent expansion ratio on cooking",
    ],
    targetMarkets:
      "Middle East, Southeast Asia, Africa, and International Retail Brands.",
    packagingOptions: [
      "5 kg, 10 kg, 25 kg, 50 kg Export Bags",
      "Customized Private Label packaging",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab & Upper Sindh Belts)",
    image: "/images/products/sindh-basmati.jpg",
    badge: "High-Yield Basmati",
    isService: false,
    order: 5,
  },
  {
    id: "prod-6",
    slug: "basmati-1692-rice",
    name: "Basmati 1692 Rice",
    category: "Basmati Rice",
    tagline: "Early-Maturity Slender Basmati with Crisp Cooking Separation",
    shortDescription:
      "Early-harvest aromatic variety with an impressive slender grain length, bright white appearance, and superb elongation.",
    fullDescription:
      "Basmati 1692 is an early-maturing, semi-dwarf aromatic variety that delivers extraordinary grain aesthetics and high post-cooking elongation. Grown across premier rice-growing belts, its clean, bright grains and mild floral fragrance make it a standout commercial choice for modern supermarket brands and international wholesalers.",
    grainLength: "7.3 – 7.5 mm avg",
    moisture: "Max 12.5%",
    brokenRatio: "Max 1.5% – 2.0%",
    purity: "95% Minimum",
    cropYear: "Fresh 2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (100% Sortex Cleaned, EU & GCC MRL Compliant).",
    exportQuality:
      "Export Grade A / Double Polished Optical Sortex, Chalky < 2.0%, Damaged < 0.5%.",
    characteristics: [
      "Extra-slender kernel profile (7.3 – 7.5 mm avg)",
      "Rapid post-cooking elongation with non-sticky grains",
      "Processed in White (Raw), Parboiled (Sella), and Steamed grades",
      "Pesticide residue-washed with complete traceability",
      "Bright, radiant white milling appearance",
    ],
    targetMarkets:
      "Middle East, Europe, Africa, and Global Retail Chains.",
    packagingOptions: [
      "1 kg, 5 kg, 10 kg, 25 kg, 50 kg PP / Jute Bags",
      "Private Label OEM packaging",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab & Sindh Basins)",
    image: "/images/products/super-kernel.jpg",
    badge: "Extra Slender Grain",
    isService: false,
    order: 6,
  },
  {
    id: "prod-7",
    slug: "basmati-1718-rice",
    name: "Basmati 1718 Rice",
    category: "Basmati Rice",
    tagline: "High-Resilience Premium Aromatic Rice with Robust Grain Strength",
    shortDescription:
      "An upgraded pedigree Basmati developed for superior resistance, long slender grains, rich aromatic profile, and minimal cooking breakage.",
    fullDescription:
      "Basmati 1718 represents modern agricultural excellence, combining natural resistance against adverse weather with the classic aromatic qualities of world-class Basmati. With an average uncooked kernel length of 7.3 to 7.6 mm, this variety expands substantially when cooked and preserves its structural integrity, making it ideal for royal biryanis, gourmet pilafs, and export retail.",
    grainLength: "7.3 – 7.6 mm avg",
    moisture: "Max 12.5%",
    brokenRatio: "Max 1.5% – 2.0%",
    purity: "96% Minimum",
    cropYear: "Fresh 2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (100% Sortex Cleaned, compliant with EU, GCC & FDA regulations).",
    exportQuality:
      "Export Grade A / Silky Double Polished, Chalky < 2.0%, Damaged < 0.5%.",
    characteristics: [
      "Exceptional kernel length and slender profile (7.3 – 7.6 mm)",
      "High culinary expansion with dry, fluffy separation",
      "Supplied in Raw White, Parboiled (Sella), and Steamed varieties",
      "Pesticide residue-washed under high-pressure water polishing",
      "Consistent aroma and tender texture",
    ],
    targetMarkets:
      "GCC Countries, Europe, North America, and High-End Food Service.",
    packagingOptions: [
      "2 kg, 5 kg, 10 kg, 20 kg, 25 kg, 50 kg Sacks",
      "Custom Buyer Packaging specifications",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab & Sindh Belts)",
    image: "/images/products/super-kernel.jpg",
    badge: "Premium Aromatic",
    isService: false,
    order: 7,
  },
  {
    id: "prod-8",
    slug: "basmati-1509-rice",
    name: "Basmati 1509 Rice",
    category: "Basmati Rice",
    tagline: "Extra-Long Slender Kernel with Rapid Cooking & High Plate Yield",
    shortDescription:
      "One of the longest Basmati grains available, offering exceptional cooking volume, pleasant aroma, and economical sourcing terms.",
    fullDescription:
      "Basmati 1509 is an extra-long grain variety renowned for its exceptional raw kernel length rivaling 1121, coupled with a faster cooking time and remarkable plate volume. Its long, slender grains elongate dramatically upon preparation while remaining light and non-sticky, making it extremely popular for both commercial catering and consumer retail packaging.",
    grainLength: "8.2 – 8.4 mm avg",
    moisture: "Max 12.5%",
    brokenRatio: "Max 1.5% – 2.0%",
    purity: "95% Minimum",
    cropYear: "Fresh 2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (100% Sortex Cleaned, certified safe from agrochemical residues).",
    exportQuality:
      "Export Grade A / Double Polished Sortex Clean, Chalky < 2.0%, Damaged < 0.5%.",
    characteristics: [
      "Extra-long raw grain (8.2 – 8.4 mm avg length)",
      "Tremendous post-cooking elongation and voluminous yield",
      "Available in Raw White, Parboiled (Sella), and Steam Rice",
      "Pesticide residue-washed with verified lab clearance",
      "Competitive commercial pricing for high-grade long-grain Basmati",
    ],
    targetMarkets:
      "Middle East, East Africa, Central Asia, and Wholesale Importers.",
    packagingOptions: [
      "5 kg, 10 kg, 20 kg, 25 kg, 50 kg Woven PP Bags",
      "Private Label Branding with custom graphics",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab Basmati Belts)",
    image: "/images/products/super-kernel.jpg",
    badge: "Extra Long Kernel",
    isService: false,
    order: 8,
  },

  // ===========================================================================
  // CATEGORY 2: NON-BASMATI RICE (4 HIGH-VOLUME VARIETIES)
  // ===========================================================================
  {
    id: "prod-9",
    slug: "irri-6-long-grain-white-rice",
    name: "IRRI-6 Long Grain White Rice",
    category: "Non-Basmati Rice",
    tagline: "High-Volume Commercial Non-Basmati Staple with Proven Transit Resilience",
    shortDescription:
      "Hard-milled long grain white rice offering exceptional transit durability, firm cooking texture, and unmatched value for mass consumption.",
    fullDescription:
      "Cultivated in the fertile alluvial delta of Sindh (Larkana, Jacobabad, Thatta, Dadu), IRRI-6 is the backbone of Pakistan's global non-basmati rice exports. Famous for its hard kernel structure and resilience during long ocean voyages, it provides dependable cooking properties and cost efficiency for national food programs and high-volume commercial markets.",
    grainLength: "6.0 mm avg",
    moisture: "Max 13.0% – 14.0%",
    brokenRatio: "5%, 10%, 15%, 25%, 100% Broken (As per buyer specification)",
    purity: "100% Sortex Cleaned",
    cropYear: "Fresh 2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (Hygienic multi-stage water polished and optical sortex cleaned, compliant with destination import standards).",
    exportQuality:
      "Export Grade / Well Milled Double Polished, Chalky Grains < 5.0%, Damaged/Discolored < 1.0%, Foreign Matter Nil.",
    characteristics: [
      "Sturdy, hard-milled kernel (6.0 mm avg length)",
      "High resilience during long-distance maritime transit",
      "Offered in Raw White, Parboiled (Sella), and Steamed varieties",
      "Pesticide residue-washed and dual-camera optical sorted",
      "Available across all standard commercial broken grades (5% to 100% broken)",
    ],
    targetMarkets:
      "Africa (افریقہ), Middle East (مشرق وسطیٰ), Food Security Programs, and Commercial Wholesalers.",
    packagingOptions: [
      "25 kg & 50 kg Heavy-Duty Polypropylene (PP) Sacks",
      "50 kg Jute Sacks for traditional trade corridors",
      "Bulk Container Liners and 1-Ton Jumbo Bags",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Sindh Basin: Larkana, Jacobabad, Dadu)",
    image: "/images/products/irri6.jpg",
    badge: "Volume Staple",
    isService: false,
    order: 9,
  },
  {
    id: "prod-10",
    slug: "irri-9-c9-long-grain-rice",
    name: "IRRI-9 / C9 Long Grain Rice",
    category: "Non-Basmati Rice",
    tagline: "Slender Long Grain Non-Basmati with Clean Optical Clarity",
    shortDescription:
      "Slender, well-polished commercial long grain rice delivering an attractive visual presentation and tender cooking texture.",
    fullDescription:
      "IRRI-9 (commonly classified as C9) is a slender non-basmati long-grain rice grown extensively in upper Sindh and Punjab. Offering an average kernel length of 6.8 mm, it bridges the gap between commercial white rice and premium table varieties, making it highly sought-after for catering, regional pilaf dishes, and retail packaging across Africa and Europe.",
    grainLength: "6.8 mm avg",
    moisture: "Max 13.0%",
    brokenRatio: "Max 2.0% – 5.0% (Customizable)",
    purity: "95% Minimum, 100% Sortex Clean",
    cropYear: "Fresh 2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (Hygienic water polished, compliant with European Union [EU] and African import food safety standards).",
    exportQuality:
      "Export Grade A / Silky Polished Sortex Clean, Chalky < 3.0%, Damaged < 0.5%, Foreign Matter Nil.",
    characteristics: [
      "Slender, uniform kernel profile (6.8 mm avg length)",
      "High optical clarity with minimal chalkiness",
      "Available in Raw White, Parboiled (Sella), and Steamed",
      "Pesticide residue-washed with EU import tolerance compliance",
      "Non-sticky, separate plate presentation",
    ],
    targetMarkets:
      "Africa (افریقہ), Europe (یورپ), Foodservice Operators, and Supermarket Retailers.",
    packagingOptions: [
      "5 kg, 10 kg, 20 kg, 25 kg, 50 kg PP Bags",
      "Custom OEM Buyer Packaging with multi-lingual label",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Upper Sindh & Punjab Belts)",
    image: "/images/products/irri9.jpg",
    badge: "Slender Non-Basmati",
    isService: false,
    order: 10,
  },
  {
    id: "prod-11",
    slug: "pk-386-long-grain-white-rice",
    name: "PK-386 Long Grain White Rice",
    category: "Non-Basmati Rice",
    tagline: "Tender Cooking Non-Basmati Table Rice with Excellent Elongation",
    shortDescription:
      "Popular long-grain table variety combining slender kernel length, tender bite, and cost efficiency for daily household and restaurant dining.",
    fullDescription:
      "PK-386 Long Grain Rice is one of Pakistan's most successful commercial table varieties. Often chosen as an economical alternative to Basmati, it features an uncooked grain length of 6.8 mm and cooks to a soft, fluffy texture with significant elongation. Widely exported across Middle Eastern and African commercial markets.",
    grainLength: "6.8 mm avg",
    moisture: "Max 12.5%",
    brokenRatio: "Max 2.0% – 5.0%",
    purity: "95% Minimum",
    cropYear: "Fresh 2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Tested (100% Sortex Cleaned, compliant with GCC and international health norms).",
    exportQuality:
      "Export Grade A / Double Polished Silky Milled, Chalky < 3.0%, Damaged < 0.5%.",
    characteristics: [
      "Consistent long grain profile (6.8 mm avg length)",
      "Tender, pleasant mouthfeel and pleasant plate presentation",
      "Offered in Raw White, Parboiled (Sella), and Steamed processing",
      "Pesticide residue-washed with complete quality documentation",
      "Economical alternative for commercial dining and packaging",
    ],
    targetMarkets:
      "Middle East (مشرق وسطیٰ), Africa (افریقہ), Mass Retailers, and Banqueting.",
    packagingOptions: [
      "5 kg, 10 kg, 25 kg, 50 kg Woven PP Sacks",
      "Private Label Branding with custom design",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab & Sindh Agricultural Basins)",
    image: "/images/products/pk348.jpg",
    badge: "Popular Table Rice",
    isService: false,
    order: 11,
  },
  {
    id: "prod-12",
    slug: "ks-282-long-grain-rice",
    name: "KS-282 Long Grain Rice",
    category: "Non-Basmati Rice",
    tagline: "Hearty Bold Kernel with High Milling Recovery & Cooking Strength",
    shortDescription:
      "Robust non-basmati long grain variety cultivated for high kernel density, disease resilience, and strong cooking firmness.",
    fullDescription:
      "KS-282 is a specialized non-basmati long-grain variety grown across the central agricultural belts of Sindh and Punjab. Known for its bold kernel structure and resilience during processing, it delivers high milling yield, minimal breakage during cooking, and rich nutritional value for institutional dining and bulk commodity distribution.",
    grainLength: "6.3 mm avg",
    moisture: "Max 13.0%",
    brokenRatio: "5%, 10%, 15% Broken (Customizable)",
    purity: "100% Sortex Cleaned",
    cropYear: "Fresh 2025 / 2026 Harvest",
    processingTypes: ["White (Raw)", "Parboiled (Sella)", "Steamed"],
    pesticideWash:
      "Pesticide Residue-Washed & Multi-Stage Sortex Cleaned (compliant with international food safety limits).",
    exportQuality:
      "Export Grade / Double Polished Silky Milled, Chalky < 4.0%, Damaged < 1.0%, Foreign Matter Nil.",
    characteristics: [
      "Bold, hearty kernel structure (6.3 mm avg length)",
      "High milling recovery and low breakage rate",
      "Available in Raw White, Parboiled (Sella), and Steamed processing",
      "Pesticide residue-washed and dual-stage optical sorted",
      "Excellent cooking firmness for heavy catering and institutional supply",
    ],
    targetMarkets:
      "Africa, Middle East, Central Asia, Bulk Wholesalers, and Institutional Catering.",
    packagingOptions: [
      "25 kg, 40 kg, 50 kg PP Sacks",
      "1-Ton Jumbo Bags for bulk discharge",
      "Custom Export Packaging with buyer specs",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Sindh & Punjab Agricultural Belts)",
    image: "/images/products/sella.jpg",
    badge: "Heavy Cooking Grain",
    isService: false,
    order: 12,
  },
];
