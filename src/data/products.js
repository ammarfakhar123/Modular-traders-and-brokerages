/**
 * Master Rice Catalog & Brokerage Services for Modular Traders and Brokerage
 * Strictly aligned with Official Business Requirements:
 * 
 * 1. Super Kernel Basmati Rice (Category: Basmati Rice)
 * 2. IRRI-6 Long Grain White Rice (Category: White Rice)
 * 3. IRRI-9 Long Grain Rice (Category: Long Grain Rice)
 * 4. PK-348 Long Grain Rice (Category: Non-Basmati Rice)
 * 5. Sindh Basmati / D-98 Rice (Category: Basmati Rice)
 * 6. IRRI-6 / PK Parboiled (Sella) Rice (Category: Parboiled Rice)
 * 7. Global Cross-Border Sourcing & Brokerage (Category: Trading & Brokerage Service)
 */

export const initialProducts = [
  {
    id: "prod-1",
    slug: "super-kernel-basmati-rice",
    name: "Super Kernel Basmati Rice",
    category: "Basmati Rice",
    tagline: "The Benchmark in Premium Pakistani Aromatic Basmati",
    shortDescription:
      "Aged, extra-long slender aromatic rice renowned for its delicate floral fragrance, non-sticky texture, and remarkable post-cooking elongation.",
    fullDescription:
      "Super Kernel Basmati Rice is globally celebrated as the crown jewel of Pakistani rice cultivation. Grown in the nutrient-rich, Himalayan-irrigated soils of Pakistan's historic rice bowls, this variety is carefully matured through natural aging to lock in its signature aroma and dry, separate grain elongation upon cooking.",
    grainLength: "7.2 – 7.4 mm avg",
    characteristics: [
      "Extra-long, naturally slender grain",
      "Distinctive natural aromatic fragrance",
      "Exceptional cooking elongation (up to 2x uncooked length)",
      "Non-sticky, separate fluffy grains after preparation",
      "Traditional controlled aging for enhanced culinary texture",
    ],
    targetMarkets:
      "Premium retail brands, high-end food service, Middle Eastern culinary distributors, European specialty importers, and gourmet banqueting.",
    packagingOptions: [
      "1 kg, 2 kg, 5 kg, 10 kg Retail Pouches / Bags",
      "25 kg, 50 kg Export Woven PP or Cotton Sacks",
      "Custom Private Label buyer specifications available",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab & Sindh Agricultural Basins)",
    image: "/images/products/super-kernel.jpg",
    badge: "Flagship Basmati",
    isService: false,
    order: 1,
  },
  {
    id: "prod-2",
    slug: "irri-6-long-grain-white-rice",
    name: "IRRI-6 Long Grain White Rice",
    category: "White Rice",
    tagline: "High-Volume Non-Basmati Staple with Proven Cooking Firmness",
    shortDescription:
      "High-volume, hard-milled long grain white rice offering dependable grain consistency, excellent transit resilience, and cost efficiency for mass distribution.",
    fullDescription:
      "Cultivated extensively in the fertile alluvial basins of Sindh, Pakistan, IRRI-6 Long Grain White Rice is the cornerstone of Pakistan's commercial rice export trade. Celebrated for its firm grain structure and resilience during long-distance ocean voyages, it provides dependable cooking properties and outstanding value for large-scale consumers.",
    grainLength: "6.0 – 6.2 mm avg",
    characteristics: [
      "Sturdy long-grain white kernel",
      "Firm cooking structure that holds shape well",
      "Available across standard commercial broken percentages (5%, 10%, 15%, 25%, 100% broken)",
      "High resilience in ocean transit and containerized storage",
      "Cost-effective staple solution for large-scale institutional supply",
    ],
    targetMarkets:
      "High-volume commercial importers, African national staples markets, food aid programs, wholesale distributors, and institutional catering.",
    packagingOptions: [
      "25 kg & 50 kg Heavy-Duty Polypropylene (PP) Sacks",
      "50 kg Jute Sacks for traditional trade corridors",
      "Bulk container liners and custom buyer branding",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Sindh Basin)",
    image: "/images/products/irri6.jpg",
    badge: "Volume Staple",
    isService: false,
    order: 2,
  },
  {
    id: "prod-3",
    slug: "irri-9-long-grain-rice",
    name: "IRRI-9 Long Grain Rice",
    category: "Long Grain Rice",
    tagline: "Slender-Kernel Commercial Grain for Food Service & Retail",
    shortDescription:
      "Slender, well-polished long grain rice that combines the visual elegance of higher-end varieties with competitive commercial pricing.",
    fullDescription:
      "IRRI-9 Long Grain Rice bridges the gap between commercial white rice and aromatic cultivars. Grown in the upper regions of Sindh and surrounding agricultural clusters, its slender kernel profile, high clarity, and firm texture upon cooking make it widely sought-after for commercial catering, pilaf dishes, and food service distribution.",
    grainLength: "6.6 – 6.8 mm avg",
    characteristics: [
      "Distinctively slender kernel profile",
      "Clean, uniform appearance with high grain clarity",
      "Moderate elongation and non-sticky cooking behavior",
      "Standard commercial 5% broken specification",
      "Appealing plate presentation for commercial dining",
    ],
    targetMarkets:
      "Food service operators, commercial restaurants, regional wholesalers, retail packaging brands, and Middle Eastern & African catering suppliers.",
    packagingOptions: [
      "5 kg, 10 kg, 20 kg, 25 kg, 50 kg PP Bags",
      "Private label OEM packaging with localized buyer labeling",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Upper Sindh & Bordering Belts)",
    image: "/images/products/irri9.jpg",
    badge: "Slender Long Grain",
    isService: false,
    order: 3,
  },
  {
    id: "prod-4",
    slug: "pk-348-long-grain-rice",
    name: "PK-348 Long Grain Rice",
    category: "Non-Basmati Rice",
    tagline: "Economical Long Grain Table Rice for Mass Supermarkets",
    shortDescription:
      "A versatile non-basmati long grain variety cultivated to deliver an appealing kernel length, tender eating texture, and economical sourcing terms.",
    fullDescription:
      "PK-348 Long Grain Rice (often grouped with PK-386 varieties) is specifically produced to provide buyers with an economical long-grain option that performs well in daily table consumption. It is popular among supermarket retail brands and mass distributors seeking affordable long-grain rice with dependable consumer satisfaction.",
    grainLength: "6.8 – 7.0 mm avg",
    characteristics: [
      "Consistent long-grain appearance",
      "Tender, pleasant mouthfeel after cooking",
      "Well-milled grain with clean optical grading",
      "Excellent commercial alternative for cost-conscious retail",
      "Flexible packaging formats for diverse retail channels",
    ],
    targetMarkets:
      "Supermarket chains, mass retail packaging companies, commodity distributors, and regional food import businesses across the Middle East, Africa, and Southeast Asia.",
    packagingOptions: [
      "5 kg, 10 kg, 25 kg, 50 kg Export Bags",
      "Custom branded retail bags with barcoding and multi-language print",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Punjab & Sindh Belts)",
    image: "/images/products/pk348.jpg",
    badge: "Popular Value",
    isService: false,
    order: 4,
  },
  {
    id: "prod-5",
    slug: "sindh-basmati-d-98-rice",
    name: "Sindh Basmati / D-98 Rice",
    category: "Basmati Rice",
    tagline: "Historic Sindh Delta Heritage Grain with Distinct Earthy Fragrance",
    shortDescription:
      "A historic aromatic cultivar native to the southern Indus basin, celebrated for its unique terroir aroma, dense kernel strength, and culinary resilience.",
    fullDescription:
      "D-98, traditionally known as Sindh Basmati, has been cultivated in the historic agricultural areas of Sindh for decades. Benefiting from the unique alluvial soil and climate of the Indus River basin, D-98 develops a rich, distinct fragrance and hearty grain body that holds up exceptionally well under diverse traditional and regional cooking methods.",
    grainLength: "6.5 – 6.7 mm avg",
    characteristics: [
      "Authentic heritage basmati cultivar of Sindh origin",
      "Hearty kernel density that resists breakage in heavy cooking",
      "Pleasing, natural regional aromatic profile",
      "Traditional favorite in ethnic and regional diaspora markets",
      "Dependable quality from established regional millers",
    ],
    targetMarkets:
      "Ethnic food importers, specialty grocery distributors, traditional regional markets, and diaspora retail networks worldwide.",
    packagingOptions: [
      "10 kg, 20 kg, 25 kg, 50 kg Woven Bags",
      "Private label customer branding",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Sindh Indus Basin)",
    image: "/images/products/sindh-basmati.jpg",
    badge: "Heritage Aromatic",
    isService: false,
    order: 5,
  },
  {
    id: "prod-6",
    slug: "irri-6-pk-parboiled-sella-rice",
    name: "IRRI-6 / PK Parboiled (Sella) Rice",
    category: "Parboiled Rice",
    tagline: "Hydro-Thermally Cured Golden & White Grain for Heavy Cooking",
    shortDescription:
      "Nutrient-enriched, steam-cured parboiled rice with extra-hard kernels that guarantee zero grain breakage and fluffy separation during commercial preparation.",
    fullDescription:
      "Our IRRI-6 and PK Parboiled (Sella) Rice undergoes a specialized hydrothermal steaming and drying process prior to hulling. This process infuses natural vitamins from the paddy husk into the grain kernel, resulting in an exceptionally firm, golden or creamy kernel that never clumps or breaks during large-scale cooking, making it the industry standard for catering and institutional dining.",
    grainLength: "6.4 – 7.2 mm avg (depending on base grain: IRRI or PK)",
    characteristics: [
      "Hydro-thermally steamed and dried for maximum kernel hardness",
      "Virtually zero broken grains during vigorous commercial cooking",
      "Separate, fluffy grain texture with superior holding stability",
      "High nutritional retention due to parboiling curing",
      "Extended shelf life and excellent transit resilience",
    ],
    targetMarkets:
      "Commercial catering companies, hotel banqueting facilities, Middle Eastern & African rice wholesalers, institutional canteens, and bulk importers.",
    packagingOptions: [
      "20 kg, 25 kg, 40 kg, 50 kg Heavy-Duty PP Bags",
      "1-Ton Jumbo Bags for bulk repackaging",
      "Custom buyer brand artwork and multi-lingual printing",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (Sindh & Punjab Milling Clusters)",
    image: "/images/products/sella.jpg",
    badge: "Heavy Cooking Spec",
    isService: false,
    order: 6,
  },
  {
    id: "prod-7",
    slug: "global-cross-border-sourcing-brokerage",
    name: "Global Cross-Border Sourcing & Brokerage",
    category: "Trading & Brokerage Service",
    tagline: "Connecting International Buyers with Trusted Agricultural Producers",
    shortDescription:
      "Professional agritrade brokerage connecting international buyers, distributors, and importers with vetted Pakistani rice millers and agricultural commodity producers.",
    fullDescription:
      "Modular Traders and Brokerage acts as an independent, professional commodity brokerage firm headquartered in Karachi, Pakistan. We specialize in bridging the gap between local agricultural producers and global buyers by understanding exact buyer specifications, identifying accredited suppliers, structuring transparent commercial negotiations, and providing comprehensive shipment and documentation coordination from Karachi ports to worldwide destinations.",
    grainLength: "Custom Specifications as Required",
    characteristics: [
      "Direct connection to vetted Pakistani rice millers and suppliers",
      "Transparent brokerage terms and clear commercial discussions",
      "Comprehensive buyer requirement analysis (variety, grade, packaging)",
      "Trade coordination covering export documentation and vessel scheduling",
      "Dedicated relationship management fostering dependable long-term partnerships",
    ],
    targetMarkets:
      "International commodity buyers, grain importers, overseas distributors, wholesale trading companies, and food processors seeking dependable sourcing from Pakistan.",
    packagingOptions: [
      "All standard export packaging formats accommodated",
      "FCL containerized shipments (20ft / 40ft)",
      "Breakbulk and bulk vessel coordination",
    ],
    dispatchPorts: "Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ), Karachi, Pakistan",
    origin: "Pakistan (National Agricultural Supply Chains)",
    image: "/images/hero-banner.jpg",
    badge: "Core Brokerage",
    isService: true,
    order: 7,
  },
];
