import React, { useState, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  ArrowRight,
  Wheat,
  CheckCircle2,
  Ship,
  Building2,
  FileCheck,
  Globe2,
  MessageSquare,
  ShieldCheck,
  Scale,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useProducts } from '@/repositories/productRepository';
import { siteConfig } from '@/config/site';

export default function ProductsPage({ onOpenQuoteWithProduct }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const { products, loading } = useProducts(true);

  // Mobile Carousel State & Ref
  const mobileProductScrollRef = useRef(null);
  const [mobileProductIdx, setMobileProductIdx] = useState(0);

  // Two Core Categories: Basmati Rice & Non-Basmati Rice
  const categories = [
    'All',
    'Basmati Rice',
    'Non-Basmati Rice',
  ];

  // Separate the 6 rice products from the brokerage service
  const riceProducts = useMemo(() => {
    return products.filter((p) => !p.isService);
  }, [products]);

  const brokerageService = useMemo(() => {
    return products.find((p) => p.isService) || null;
  }, [products]);

  // Filter the 6 rice products based on active category & search query
  const filteredRiceProducts = useMemo(() => {
    return riceProducts.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.grainLength && p.grainLength.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.targetMarkets && p.targetMarkets.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [riceProducts, activeCategory, searchQuery]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleMobileProductScroll = () => {
    if (!mobileProductScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileProductScrollRef.current;
    const idx = Math.round(scrollLeft / (clientWidth * 0.85));
    setMobileProductIdx(Math.min(Math.max(idx, 0), filteredRiceProducts.length - 1));
  };

  const scrollMobileProductTo = (idx) => {
    if (!mobileProductScrollRef.current) return;
    const w = mobileProductScrollRef.current.clientWidth * 0.85;
    mobileProductScrollRef.current.scrollTo({ left: idx * w, behavior: 'smooth' });
    setMobileProductIdx(idx);
  };

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-24 bg-[#FAF8F3] min-h-screen text-slate-800">
      {/* ========================================================
          1. PRODUCTS HERO BANNER
         ======================================================== */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 mb-8 sm:mb-12 relative overflow-hidden border-b border-[#D5E5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-3 sm:mb-4">
            <span className="w-5 sm:w-6 h-[2px] bg-[#B8860B]" />
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#072B1F]">
              Export Catalog &bull; Modular Traders and Brokerage
            </span>
          </div>

          <h1 className="font-sans text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#072B1F] tracking-tight mb-3 sm:mb-4 leading-tight">
            Pakistani Rice Export Portfolio &amp; <br />
            <span className="text-[#155437]">
              Commodity Brokerage
            </span>
          </h1>

          <p className="text-slate-600 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed">
            Headquartered in <strong>Karachi, Pakistan</strong>, Modular Traders and Brokerage connects international
            rice buyers, wholesalers, and distributors with verified agricultural producers and licensed rice millers.
            Explore our core collection of premium Pakistani rice varieties and global cross-border sourcing services.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            2. INTRODUCTION TO OUR RICE COLLECTION & FILTER CONTROLS
           ======================================================== */}
        <section className="mb-8 sm:mb-10">
          <div className="bg-white p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#D5E5DC] shadow-sm mb-6 sm:mb-8">
            <div className="max-w-3xl mb-5 sm:mb-6">
              <span className="text-[10px] xs:text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B] block mb-1">
                Verified Varietal Collection
              </span>
              <h2 className="font-sans text-xl xs:text-2xl sm:text-3xl font-extrabold text-[#072B1F] mb-2">
                Introduction to Our Rice Collection
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pakistan produces some of the world&apos;s most sought-after rice cultivars. Our portfolio encompasses
                celebrated aromatic Basmati varieties &mdash; famed for their natural fragrance and extraordinary cooking
                elongation &mdash; alongside high-volume, cost-effective long grain, white, and parboiled varieties grown in the
                nutrient-dense Indus delta and Punjab river basins.
              </p>
            </div>

            {/* Controls: Search and Categories */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-slate-100">
              {/* Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-200 flex-shrink-0 cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#072B1F] text-white shadow-sm'
                        : 'bg-[#FAF8F3] text-slate-700 hover:bg-slate-100 border border-[#D5E5DC]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search variety, grain length..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-full pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs text-slate-500 mb-6 font-mono font-medium px-1 sm:px-2">
            <span>Showing {filteredRiceProducts.length} of {riceProducts.length} verified rice products</span>
            <span>Export Loading: Karachi Port (KPT) &amp; Port Qasim (PQ)</span>
          </div>
        </section>

        {/* ========================================================
            3. RICE PRODUCTS GRID
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          {loading && products.length === 0 ? (
            <div className="py-24 text-center text-slate-400 font-mono text-sm">
              Retrieving product specifications...
            </div>
          ) : filteredRiceProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-[#D5E5DC] p-8">
              <p className="text-slate-600 text-sm font-semibold mb-2">
                No rice varieties match your current filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#155437] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* 1. MOBILE PHONE CAROUSEL (block md:hidden) */}
              <div className="block md:hidden mb-12">
                <div className="flex items-center justify-between mb-3.5 px-1">
                  <span className="text-[11px] font-mono font-bold text-[#155437]">
                    Variety {mobileProductIdx + 1} of {filteredRiceProducts.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => scrollMobileProductTo(Math.max(mobileProductIdx - 1, 0))}
                      disabled={mobileProductIdx === 0}
                      className="w-8 h-8 rounded-full bg-white border border-[#D5E5DC] flex items-center justify-center text-[#072B1F] disabled:opacity-30 transition cursor-pointer shadow-2xs"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollMobileProductTo(Math.min(mobileProductIdx + 1, filteredRiceProducts.length - 1))}
                      disabled={mobileProductIdx === filteredRiceProducts.length - 1}
                      className="w-8 h-8 rounded-full bg-white border border-[#D5E5DC] flex items-center justify-center text-[#072B1F] disabled:opacity-30 transition cursor-pointer shadow-2xs"
                      aria-label="Next product"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div
                  ref={mobileProductScrollRef}
                  onScroll={handleMobileProductScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 scrollbar-none scroll-smooth"
                >
                  {filteredRiceProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      className="w-[85vw] max-w-[340px] shrink-0 snap-center bg-white rounded-2xl border border-[#D5E5DC] overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      {/* Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-[#072B1F]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading={idx < 3 ? "eager" : "lazy"}
                          fetchpriority={idx === 0 ? "high" : "auto"}
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider bg-white/95 text-[#072B1F] border border-[#D5E5DC] shadow-xs">
                            {product.category}
                          </span>
                        </div>

                        {product.badge && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wider bg-[#CFA744] text-[#072B1F] font-bold shadow-xs">
                              {product.badge}
                            </span>
                          </div>
                        )}

                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                          <span className="bg-[#072B1F]/90 px-2 py-0.5 rounded-md border border-[#155437] font-bold font-mono text-[10px]">
                            Length: <strong className="text-[#CFA744]">{product.grainLength}</strong>
                          </span>
                          <span className="text-[10px] text-slate-200 bg-[#072B1F]/90 px-2 py-0.5 rounded border border-[#155437]">
                            Pakistan Origin
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3 className="font-sans text-base font-bold text-[#072B1F] mb-1">
                            <Link to={`/products/${product.slug}`}>
                              {product.name}
                            </Link>
                          </h3>

                          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-2.5">
                            {product.shortDescription}
                          </p>

                          <div className="mb-2.5 flex flex-wrap gap-1 text-[9px] font-bold">
                            <span className="px-1.5 py-0.5 rounded-md bg-[#FAF8F3] text-slate-700 border border-slate-200">
                              White (Raw)
                            </span>
                            <span className="px-1.5 py-0.5 rounded-md bg-[#EAF5EF] text-[#155437] border border-[#BDE3CF]">
                              Parboiled (Sella)
                            </span>
                            <span className="px-1.5 py-0.5 rounded-md bg-[#FAF0D9] text-[#8B6508] border border-[#EADBBD]">
                              Steamed
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <Link
                            to={`/products/${product.slug}`}
                            className="text-[11px] font-bold text-[#155437] hover:text-[#072B1F] transition flex items-center gap-1 uppercase tracking-wider"
                          >
                            <span>Specs</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => onOpenQuoteWithProduct(product)}
                            className="bg-[#072B1F] hover:bg-[#155437] text-white px-3.5 py-1.5 rounded-xl text-[11px] font-bold tracking-wider transition shadow-xs flex items-center gap-1 cursor-pointer"
                          >
                            <span>Request Quote</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-1.5 pt-3">
                  {filteredRiceProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => scrollMobileProductTo(idx)}
                      className={`transition-all duration-200 rounded-full cursor-pointer ${
                        mobileProductIdx === idx ? 'w-5 h-1.5 bg-[#072B1F]' : 'w-1.5 h-1.5 bg-slate-300'
                      }`}
                      aria-label={`Go to ${p.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* 2. LAPTOP / DESKTOP PRODUCTS GRID (hidden md:grid) — Completely Untouched */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredRiceProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-2xl sm:rounded-3xl border border-[#D5E5DC] hover:border-[#CFA744] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#072B1F]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                        loading={idx < 4 ? "eager" : "lazy"}
                        fetchpriority={idx < 2 ? "high" : "auto"}
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex gap-2">
                        <span className="px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-bold tracking-wider bg-white/95 text-[#072B1F] border border-[#D5E5DC] shadow-xs">
                          {product.category}
                        </span>
                      </div>

                      {product.badge && (
                        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4">
                          <span className="px-2 sm:px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] uppercase tracking-wider bg-[#CFA744] text-[#072B1F] font-bold shadow-xs">
                            {product.badge}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs text-white">
                        <span className="bg-[#072B1F]/90 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-[#155437] font-bold font-mono text-[10px] sm:text-xs">
                          Length: <strong className="text-[#CFA744]">{product.grainLength}</strong>
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-200 bg-[#072B1F]/90 px-2 py-0.5 rounded border border-[#155437]">
                          Pakistan Origin
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 xs:p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
                      <div>
                        <h3 className="font-sans text-base sm:text-lg font-bold text-[#072B1F] group-hover:text-[#155437] transition mb-1.5 sm:mb-2">
                          <Link to={`/products/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-3 sm:mb-4">
                          {product.shortDescription}
                        </p>

                        {/* Processing Types Available & Pesticide Wash */}
                        <div className="mb-3 flex flex-wrap gap-1 sm:gap-1.5 text-[9px] xs:text-[10px] font-bold">
                          <span className="px-2 py-0.5 rounded-md bg-[#FAF8F3] text-slate-700 border border-slate-200">
                            White (Raw)
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#EAF5EF] text-[#155437] border border-[#BDE3CF]">
                            Parboiled (Sella)
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#FAF0D9] text-[#8B6508] border border-[#EADBBD]">
                            Steamed
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Pesticide-Washed
                          </span>
                        </div>

                        {/* Verified Key Characteristics */}
                        <div className="mb-3.5 sm:mb-4 space-y-1 sm:space-y-1.5 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8F3] border border-[#EADBBD]">
                          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#B8860B] font-bold block mb-1">
                            Key Verified Characteristics:
                          </span>
                          {(product.characteristics || []).slice(0, 3).map((char, cIdx) => (
                            <div key={cIdx} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#155437] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{char}</span>
                            </div>
                          ))}
                        </div>

                        {/* Target Buyers / Markets */}
                        <div className="text-xs text-slate-500">
                          <strong className="text-slate-700 block text-[10px] sm:text-[11px] font-mono uppercase mb-0.5">
                            Suitable Target Buyers &amp; Markets:
                          </strong>
                          <p className="line-clamp-2 text-slate-600 leading-relaxed text-[10px] sm:text-[11px]">
                            {product.targetMarkets}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2 sm:gap-3">
                        <Link
                          to={`/products/${product.slug}`}
                          className="text-[11px] sm:text-xs font-bold text-[#155437] hover:text-[#072B1F] transition flex items-center gap-1 uppercase tracking-wider"
                        >
                          <span>Specifications</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => onOpenQuoteWithProduct(product)}
                          className="bg-[#072B1F] hover:bg-[#155437] text-white px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold tracking-wider transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Request Quote</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* ========================================================
            4. GLOBAL CROSS-BORDER SOURCING & BROKERAGE (Dedicated Section)
           ======================================================== */}
        <section className="mb-14 sm:mb-24">
          <div className="bg-gradient-to-br from-[#072B1F] via-[#0D3828] to-[#155437] rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 text-white shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#CFA744] bg-white/10 border border-white/20">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Category: Trading &amp; Brokerage Service</span>
                </div>

                <h2 className="font-sans text-xl xs:text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  Global Cross-Border Sourcing &amp; Brokerage
                </h2>

                <p className="text-slate-200 text-xs sm:text-base leading-relaxed">
                  Beyond our standardized rice portfolio, Modular Traders and Brokerage acts as an independent commercial
                  brokerage desk in Karachi, Pakistan. Our primary role is connecting international buyers with vetted agricultural
                  commodity producers, licensed rice millers, and established local suppliers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-2">
                  <div className="bg-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/15">
                    <h4 className="font-bold text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#CFA744]" /> Buyer-Supplier Alignment
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      Matching specific buyer varietal demands, target quality specs, and delivery schedules with verified Pakistani suppliers.
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/15">
                    <h4 className="font-bold text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#CFA744]" /> Commercial Structuring
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      Coordinating transparent price negotiations, clear contractual discussions, and mutually agreed commercial terms.
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/15">
                    <h4 className="font-bold text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#CFA744]" /> Trade &amp; Logistics Support
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      Assisting with export documentation, container stuffing, and maritime coordination through Karachi Port &amp; Port Qasim.
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/15">
                    <h4 className="font-bold text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#CFA744]" /> Relationship Management
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      Fostering professional, dependable communication between buyers and suppliers for sustainable ongoing trade.
                    </p>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() =>
                      brokerageService
                        ? onOpenQuoteWithProduct(brokerageService)
                        : onOpenQuoteWithProduct({ name: 'Global Cross-Border Sourcing & Brokerage' })
                    }
                    className="w-full sm:w-auto justify-center group bg-white hover:bg-[#FAF8F3] text-[#072B1F] font-bold px-5 sm:pl-6 sm:pr-2 py-3 rounded-xl sm:rounded-full text-xs sm:text-sm flex items-center gap-3 transition shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Request Brokerage Sourcing</span>
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#CFA744] text-[#072B1F] flex items-center justify-center transition-transform group-hover:rotate-45 font-bold shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <a
                    href={`https://wa.me/${siteConfig.contact.phones.whatsappClean}?text=${encodeURIComponent(
                      'Hello Modular Traders, I would like to inquire about Global Cross-Border Sourcing & Brokerage services.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl sm:rounded-full text-xs font-semibold flex items-center gap-2 transition text-center"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-300" />
                    <span>WhatsApp Broker Desk</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="bg-[#0D3828] rounded-2xl p-6 sm:p-8 border border-[#1B6248] w-full max-w-md space-y-4 text-xs">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#CFA744] font-bold block">
                    Brokerage Desk Attributes
                  </span>

                  <div className="space-y-3 divide-y divide-white/10">
                    <div className="pt-2">
                      <strong className="text-white block">Operating Location:</strong>
                      <span className="text-slate-300">Karachi, Pakistan (Headquarters)</span>
                    </div>

                    <div className="pt-3">
                      <strong className="text-white block">Departure Berths:</strong>
                      <span className="text-slate-300">Karachi Port (KPT) &amp; Port Muhammad Bin Qasim (PQ)</span>
                    </div>

                    <div className="pt-3">
                      <strong className="text-white block">Primary Commodities:</strong>
                      <span className="text-slate-300">
                        Super Kernel Basmati, IRRI-6, IRRI-9, PK-348, Sindh Basmati / D-98, Parboiled Sella &amp; Agricultural Commodities
                      </span>
                    </div>

                    <div className="pt-3">
                      <strong className="text-white block">Core Focus:</strong>
                      <span className="text-slate-300">
                        Connecting international buyers with vetted domestic producers under transparent agency terms
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. BULK RICE INQUIRY SECTION
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 border border-[#D5E5DC] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B] block">
                  Institutional &amp; Wholesale Supply
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#072B1F]">
                  Bulk Rice Inquiries &amp; Container Allocations
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Whether you are seeking containerized 20ft or 40ft FCL shipments for branded retail distribution, or
                  coordinating multi-container commercial procurement for regional food supply programs, our Karachi team
                  is equipped to discuss your sourcing specifications and shipment timelines.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#155437] font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CFA744]" /> 20ft / 40ft FCL Shipments
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CFA744]" /> Custom Bag Packaging
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CFA744]" /> FOB Karachi &amp; CIF Terms
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  to="/contact"
                  className="bg-[#072B1F] hover:bg-[#155437] text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm text-center transition shadow-md"
                >
                  Submit Bulk Sourcing Inquiry
                </Link>

                <a
                  href={`tel:${siteConfig.contact.phones.whatsappClean}`}
                  className="bg-[#FAF8F3] hover:bg-slate-100 text-[#072B1F] border border-[#D5E5DC] font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm text-center transition"
                >
                  Direct Phone: {siteConfig.contact.phones.primary}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. CONTACT / REQUEST A QUOTE CTA
           ======================================================== */}
        <section>
          <div className="rounded-[2.5rem] p-8 sm:p-14 bg-gradient-to-br from-[#FAF8F3] via-white to-[#F4EFE6] border border-[#D5E5DC] flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B]">
                Start Your Rice Sourcing
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#072B1F]">
                Ready to Discuss Sourcing Terms or Request a Quote?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Contact Modular Traders and Brokerage in Karachi, Pakistan. Our team is ready to evaluate your rice
                specifications, target markets, and commercial terms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
              <button
                onClick={() =>
                  onOpenQuoteWithProduct
                    ? onOpenQuoteWithProduct(riceProducts[0] || null)
                    : null
                }
                className="group bg-[#072B1F] hover:bg-[#155437] text-white font-bold pl-6 pr-2 py-3 rounded-full text-xs sm:text-sm flex items-center justify-between gap-3 transition shadow-md active:scale-95 text-center cursor-pointer"
              >
                <span>Request a Quote</span>
                <span className="w-8 h-8 rounded-full bg-[#CFA744] text-[#072B1F] flex items-center justify-center transition-transform group-hover:rotate-45 font-bold">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>

              <Link
                to="/contact"
                className="bg-[#EAF5EF] hover:bg-[#D8EDE2] text-[#155437] border border-[#BDE3CF] px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center transition text-center"
              >
                <span>Contact Karachi Office</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
