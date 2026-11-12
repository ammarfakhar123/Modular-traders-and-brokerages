import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Package,
  Ship,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Globe2,
  Users,
  Compass,
  FileText,
  BadgeCheck,
  Wheat,
} from 'lucide-react';
import { useProductBySlug } from '@/repositories/productRepository';
import { siteConfig } from '@/config/site';

export default function ProductDetailPage({ onOpenQuoteWithProduct }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { product, loading } = useProductBySlug(slug);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#FAF8F3] flex items-center justify-center text-[#072B1F] font-mono text-sm">
        Retrieving verified commodity specifications...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-sans text-3xl font-extrabold text-[#072B1F] mb-3">Item Not Found</h2>
        <p className="text-slate-600 mb-6 text-sm max-w-md">
          The requested rice variety or brokerage listing could not be found. Please browse our complete catalog.
        </p>
        <Link
          to="/products"
          className="bg-[#072B1F] text-[#CFA744] hover:text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition"
        >
          View All Products &amp; Services
        </Link>
      </div>
    );
  }

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Modular Traders and Brokerage, I would like to inquire about: ${product.name}.\n\nCategory: ${product.category}\nHeadquarters: Karachi, Pakistan`
    );
    window.open(`https://wa.me/${siteConfig.contact.phones.whatsappClean}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-24 pb-24 bg-[#FAF8F3] min-h-screen text-slate-800">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#D5E5DC] py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#072B1F] transition font-medium">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#072B1F] transition font-medium">
              Products &amp; Services
            </Link>
            <span>/</span>
            <span className="text-[#072B1F] font-bold truncate max-w-xs">{product.name}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#072B1F] hover:text-[#155437] font-bold text-xs transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Imagery & Core Logistics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-[#072B1F] border border-[#D5E5DC] shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#072B1F] border border-[#D5E5DC] shadow-sm">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CFA744] text-[#072B1F] shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span>{product.isService ? 'Brokerage Hub: Karachi' : `Avg Grain: ${product.grainLength}`}</span>
                  <span className="text-[#EADBBD] font-bold">Cultivating Trust</span>
                </div>
              </div>
            </div>

            {/* Origin & Port Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#D5E5DC] shadow-sm space-y-4">
              <h4 className="font-sans text-sm font-bold text-[#072B1F] uppercase tracking-wider border-b border-[#D5E5DC] pb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#155437]" />
                <span>Trade &amp; Sourcing Logistics</span>
              </h4>

              <div className="flex items-start gap-3 text-xs text-slate-700">
                <MapPin className="w-4 h-4 text-[#155437] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Sourcing Origin:</span>
                  <span>{product.origin}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-700">
                <Ship className="w-4 h-4 text-[#155437] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Export Dispatch Seaports:</span>
                  <span>{product.dispatchPorts}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#155437] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Commercial Positioning:</span>
                  <span>{product.tagline}</span>
                </div>
              </div>
            </div>

            {/* Quick Inquiry CTA Widget */}
            <div className="rounded-3xl bg-[#072B1F] p-6 text-white border border-[#155437] shadow-md space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#CFA744] font-bold">
                <FileText className="w-4 h-4" /> Direct Trade Desk Inquiry
              </div>
              <h4 className="font-sans text-xl font-bold text-white">
                {product.isService ? 'Discuss Sourcing & Brokerage' : 'Request Commercial Export Quote'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Connect directly with our Karachi headquarters for customized volume discussions, Incoterms (FOB / CIF), and supplier coordination.
              </p>
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={() => onOpenQuoteWithProduct(product)}
                  className="w-full bg-[#CFA744] hover:bg-[#b89336] text-[#072B1F] font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2 transition"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="w-4 h-4 text-[#072B1F]" />
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4 text-[#CFA744]" />
                  <span>Chat With Us on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Product / Service Profile */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E5DC] shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-[#155437] block mb-2">
                {product.category} &bull; Product Dossier
              </span>
              <h1 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#072B1F] mb-3">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-sans">
                {product.fullDescription}
              </p>

              {/* Tagline highlight */}
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EADBBD] text-xs text-[#072B1F] flex items-center gap-3">
                <BadgeCheck className="w-5 h-5 text-[#CFA744] flex-shrink-0" />
                <span className="font-semibold italic">&ldquo;{product.tagline}&rdquo;</span>
              </div>
            </div>

            {/* Available Processing Types */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E5DC] shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#D5E5DC]">
                <Wheat className="w-5 h-5 text-[#155437]" />
                <h3 className="font-sans text-lg font-bold text-[#072B1F]">
                  Available Processing Types
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                This variety is processed and supplied across three core industrial processing forms to meet specific culinary and commercial requirements:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#D5E5DC] flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white text-[#072B1F] border border-slate-200 mb-2">
                      Raw Milled
                    </span>
                    <h4 className="font-sans text-sm font-bold text-[#072B1F] mb-1">
                      White (Raw)
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Naturally milled, silky polished white rice preserving authentic fragrance and traditional fluffy tenderness.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#D5E5DC] flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#EAF5EF] text-[#155437] border border-[#BDE3CF] mb-2">
                      Hydro-Cured
                    </span>
                    <h4 className="font-sans text-sm font-bold text-[#072B1F] mb-1">
                      Parboiled (Sella)
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Hydro-thermally steam-cured (Golden &amp; White/Creamy Sella) with ultra-hard kernels that resist breakage during heavy cooking.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#D5E5DC] flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#FAF0D9] text-[#8B6508] border border-[#EADBBD] mb-2">
                      Steam Cured
                    </span>
                    <h4 className="font-sans text-sm font-bold text-[#072B1F] mb-1">
                      Steamed
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      High-pressure steam-cured before milling to lock in starch structure and deliver maximum post-cooking length.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Quality Parameters Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E5DC] shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D5E5DC]">
                <FileText className="w-5 h-5 text-[#155437]" />
                <h3 className="font-sans text-lg font-bold text-[#072B1F]">
                  Export Quality Parameters &amp; Lab Standards
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs mb-4">
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Avg. Grain Length (AGL)</span>
                  <span className="font-bold text-[#072B1F] text-sm">{product.grainLength || 'Standard Export'}</span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Moisture Content</span>
                  <span className="font-bold text-slate-800 text-sm">{product.moisture || 'Max 12.5%'}</span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Broken Ratio</span>
                  <span className="font-bold text-slate-800 text-sm">{product.brokenRatio || 'Max 2.0%'}</span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Purity &amp; Sortex</span>
                  <span className="font-bold text-slate-800 text-sm">{product.purity || '95% Min, 100% Sortex'}</span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Crop Year / Harvest</span>
                  <span className="font-bold text-slate-800 text-sm">{product.cropYear || 'Fresh 2025 / 2026'}</span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Milling Grade</span>
                  <span className="font-bold text-[#155437] text-sm">Silky Sortex Clean</span>
                </div>
              </div>

              {product.exportQuality && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong className="text-slate-900 block mb-1">Quality Tolerances:</strong>
                  <span>{product.exportQuality}</span>
                </div>
              )}
            </div>

            {/* Pesticide Wash & Food Safety Assurance Card */}
            <div className="bg-[#EAF5EF] rounded-3xl p-6 sm:p-8 border border-[#BDE3CF] shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-[#155437]" />
                <h3 className="font-sans text-lg font-bold text-[#072B1F]">
                  Pesticide-Washed &amp; Residue-Tested Processing
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {product.pesticideWash ||
                  'All rice consignments undergo high-pressure hygienic water polishing, double-stage optical color sorting, and verified laboratory testing to ensure zero chemical taints and full compliance with international Maximum Residue Limits (MRL) for the European Union, GCC, and US FDA standards.'}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-bold text-[#155437]">
                <span className="px-3 py-1 rounded-full bg-white border border-[#BDE3CF] shadow-2xs">
                  &bull; 100% Optical Sortex Cleaned
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-[#BDE3CF] shadow-2xs">
                  &bull; EU / GCC / FDA MRL Compliant
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-[#BDE3CF] shadow-2xs">
                  &bull; Pre-Shipment Inspection (SGS / Bureau Veritas)
                </span>
              </div>
            </div>

            {/* Key Verified Characteristics */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E5DC] shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D5E5DC]">
                <ShieldCheck className="w-5 h-5 text-[#155437]" />
                <h3 className="font-sans text-lg font-bold text-[#072B1F]">
                  Key Characteristics (Verified)
                </h3>
              </div>

              <div className="space-y-3">
                {(product.characteristics || []).map((char, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#155437] flex-shrink-0 mt-0.5" />
                    <span>{char}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable Target Buyers / Markets */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E5DC] shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#D5E5DC]">
                <Users className="w-5 h-5 text-[#CFA744]" />
                <h3 className="font-sans text-lg font-bold text-[#072B1F]">
                  Suitable Target Buyers &amp; Supported Markets
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.targetMarkets}
              </p>
            </div>

            {/* Packaging & Logistics Configurations */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E5DC] shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#D5E5DC]">
                <Package className="w-5 h-5 text-[#155437]" />
                <h3 className="font-sans text-lg font-bold text-[#072B1F]">
                  {product.isService ? 'Trade Coordination Formats' : 'Export Packaging Options'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {(product.packagingOptions || []).map((pkg, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-[#D5E5DC] bg-[#FAF8F3] flex items-center gap-3 text-xs text-slate-800 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#155437] flex-shrink-0" />
                    <span>{pkg}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#EAF5EF] border border-[#BDE3CF] text-xs text-[#072B1F] flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-[#155437] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-0.5">International Export Dispatch:</strong>
                  <span className="text-slate-700">
                    Shipments coordinated directly from Karachi Port (KPT) and Port Muhammad Bin Qasim (PQ) under transparent commercial terms (FOB / CIF) tailored to buyer destinations worldwide.
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenQuoteWithProduct(product)}
                className="flex-1 bg-[#072B1F] hover:bg-[#155437] text-[#CFA744] hover:text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2 transition"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-[#CFA744]" />
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="bg-white hover:bg-slate-50 text-[#072B1F] border border-[#D5E5DC] px-6 py-4 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#155437]" />
                <span>Chat With Us on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
