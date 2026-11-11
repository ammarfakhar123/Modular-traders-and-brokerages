/**
 * Central Site Configuration for Modular Traders and Brokerage
 * Strictly aligned with Official Business Information & Client Specifications
 * 
 * NOTE: All contact details, addresses, phone numbers, and company metadata
 * live strictly in this file. NEVER hardcode contact information in individual components.
 */

export const siteConfig = {
  name: "Modular Traders and Brokerage",
  legalName: "Modular Traders and Brokerage",
  tagline: "Cultivating Trust",
  category: "Agricultural Commodity Trading & Global Rice Export",
  establishedYear: 2026,
  location: "Karachi, Pakistan",
  
  description:
    "Karachi-based agricultural commodity trading and brokerage company specializing in premium Pakistani rice sourcing, agricultural trading, and international rice exports. Connecting local producers and millers with international buyers.",
  
  mission:
    "To streamline global access to Pakistan's exceptional agricultural yield through transparent brokerage, seamless trade coordination, and trusted long-term partnerships.",
  
  vision:
    "To become a globally recognized and preferred agricultural trading partner, renowned for ethical trade practices, consistent reliability, and customer satisfaction.",
  
  motto:
    "Cultivating Trust. Every shipment, document, and commercial conversation is built on integrity, transparency, and dependable trade execution.",

  // 6 Core Values as specifically required
  coreValues: [
    {
      id: "quality",
      number: "01",
      title: "Quality",
      summary: "Strict adherence to product standards.",
      description:
        "We prioritize rigorous quality standards at every stage of sourcing, ensuring rice varieties meet verified contract specifications and buyer expectations.",
      icon: "Award",
    },
    {
      id: "transparency",
      number: "02",
      title: "Transparency",
      summary: "Honest and clear commercial discussions.",
      description:
        "Open, honest, and straightforward communication across contracts, pricing, sourcing origins, and trade coordination with zero hidden terms.",
      icon: "FileCheck",
    },
    {
      id: "trust",
      number: "03",
      title: "Trust",
      summary: "The bedrock of commodity trading.",
      description:
        "True to our tagline 'Cultivating Trust', we believe enduring business is earned through consistency, ethical conduct, and honoring commitments.",
      icon: "ShieldCheck",
    },
    {
      id: "reliability",
      number: "04",
      title: "Reliability",
      summary: "Dependable execution shipment after shipment.",
      description:
        "Committed dispatch schedules, proactive trade coordination, and dependable operational follow-through for every international consignment.",
      icon: "Clock",
    },
    {
      id: "customer-commitment",
      number: "05",
      title: "Customer Commitment",
      summary: "Dedicated to buyer and supplier success.",
      description:
        "We understand buyer requirements in depth, providing responsive service and tailored trade solutions for global importers and distributors.",
      icon: "HeartHandshake",
    },
    {
      id: "long-term-partnerships",
      number: "06",
      title: "Long-Term Partnerships",
      summary: "Building sustainable trade relationships.",
      description:
        "We focus on creating enduring, mutually beneficial commercial relationships rather than one-off transactional deals.",
      icon: "Users",
    },
  ],

  // 6 Main Business Activities (What We Do)
  activities: [
    {
      id: "act-1",
      title: "Premium Pakistani Rice Sourcing",
      desc: "Direct procurement and supplier identification across Pakistan's premier rice-growing belts in Sindh and Punjab.",
    },
    {
      id: "act-2",
      title: "Agricultural Commodity Trading",
      desc: "Structured trading operations connecting agricultural supply chains with international market demand.",
    },
    {
      id: "act-3",
      title: "International Rice Export Facilitation",
      desc: "Facilitating cross-border shipments, container allocations, and export clearance from Karachi seaports.",
    },
    {
      id: "act-4",
      title: "Supplier and Buyer Connections",
      desc: "Bridging vetted Pakistani rice millers and agricultural producers with qualified overseas importers and distributors.",
    },
    {
      id: "act-5",
      title: "Cross-Border Sourcing & Brokerage",
      desc: "Independent, professional brokerage services ensuring fair terms, contract clarity, and smooth commercial negotiations.",
    },
    {
      id: "act-6",
      title: "Trade Coordination & Logistics Support",
      desc: "Comprehensive trade assistance covering documentation, vessel schedules, container stuffing, and shipping updates.",
    },
  ],

  // 5-Step Working Process (How We Work)
  workProcess: [
    {
      step: "01",
      title: "Understanding International Buyer Requirements",
      desc: "Reviewing specific variety demands, quality preferences, target markets, volume needs, and preferred Incoterms (FOB/CFR/CIF).",
    },
    {
      step: "02",
      title: "Identifying Suitable Rice Varieties & Suppliers",
      desc: "Matching buyer specifications with vetted Pakistani rice millers and producers with verified crop origin and milling capabilities.",
    },
    {
      step: "03",
      title: "Coordinating Sourcing & Commercial Discussions",
      desc: "Facilitating transparent price discussions, sample evaluations, and mutually agreed contractual terms between buyer and seller.",
    },
    {
      step: "04",
      title: "Supporting Trade & Shipment Coordination",
      desc: "Assisting with export documentation, container loading at Karachi Port or Port Qasim, and regular maritime transit tracking.",
    },
    {
      step: "05",
      title: "Maintaining Professional Communication",
      desc: "Providing continuous post-dispatch updates, documentation support, and ongoing relationship management for future trade cycles.",
    },
  ],

  // Target Export Markets (International Corridors)
  targetCorridors: [
    {
      corridor: "Middle East & GCC",
      priority: "Established Market",
      ports: ["Jeddah Islamic Port", "Hamad Port (Qatar)", "Sohar Port (Oman)", "Dammam"],
      leadProducts: "Super Kernel Basmati, Parboiled (Sella) Rice",
      routeType: "Regular ocean container liners and scheduled sailings",
    },
    {
      corridor: "East Africa",
      priority: "High-Volume Destination",
      ports: ["Mombasa (Kenya)", "Dar es Salaam (Tanzania)", "Djibouti Port", "Mogadishu (Somalia)"],
      leadProducts: "IRRI-6 Long Grain White Rice, Parboiled Sella",
      routeType: "FCL container programmes and bulk breakbulk charters",
    },
    {
      corridor: "Southeast Asia",
      priority: "Growth Market",
      ports: ["Port Klang (Malaysia)", "Tanjung Priok (Indonesia)", "Manila (Philippines)"],
      leadProducts: "Long Grain White Rice, IRRI-9, PK-348",
      routeType: "Direct container liners and regional distribution hubs",
    },
    {
      corridor: "Europe & Global Markets",
      priority: "Quality-Sensitive",
      ports: ["Rotterdam (Netherlands)", "Antwerp (Belgium)", "Felixstowe (UK)"],
      leadProducts: "Super Kernel Basmati, Sindh Basmati / D-98",
      routeType: "Containerized shipments meeting international compliance standards",
    },
  ],

  workingHours: {
    display: "To be confirmed by the client",
    note: "Inquiries submitted online or via WhatsApp are logged and responded to promptly by our trading desk.",
  },

  contact: {
    businessName: "Modular Traders and Brokerage",
    headquarters: {
      country: "Pakistan",
      city: "Karachi",
      postalCode: "75500",
      area: "Defence Housing Authority (DHA), Phase 6",
      commercialArea: "Shahbaz Commercial Area",
      lane: "4 Shahbaz Commercial Ln",
      building: "Z Signature, 46-C",
      fullAddress:
        "Z Signature, 46-C, 4 Shahbaz Commercial Ln, Shahbaz Commercial Area, Phase 6, Defence Housing Authority (DHA), Karachi, 75500, Pakistan.",
      mapCoordinates: {
        lat: 24.8055,
        lng: 67.0620,
      },
    },
    shippingHubs: {
      ports: ["Karachi Port (KPT)", "Port Muhammad Bin Qasim (PQ)"],
      displayLocation: "Dispatched through Karachi Port (KPT) & Port Qasim (PQ), Karachi, Pakistan",
    },
    phones: {
      primary: "+92 3144447656",
      whatsapp: "+92 3144447656",
      whatsappClean: "923144447656",
      whatsappDisplay: "+92 314 4447656",
    },
    emails: {
      inquiries: "To be confirmed by the client",
      display: "To be confirmed by the client",
      inquiryPlaceholder: "inquiries@modulartraders.com",
    },
    socials: {
      whatsapp: "https://wa.me/923144447656",
      linkedin: "https://www.linkedin.com/company/modular-traders-and-brokerage",
    },
  },
};
