import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShieldCheck, CheckCircle2, Package, Ship, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '@/repositories/productRepository';

export default function FeaturedProductsSection({ onOpenQuote, onOpenQuoteWithProduct }) {
  const { products, loading } = useProducts(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Two Primary Export Categories: Basmati Rice & Non-Basmati Rice
  const categories = [
    'All',
    'Basmati Rice',
    'Non-Basmati Rice',
  ];

  // Separate rice commodities from the brokerage service
  const riceProducts = products.filter((p) => !p.isService);
  const brokerageService = products.find((p) => p.isService);

  const filteredRice = selectedCategory === 'All'
    ? riceProducts
    : riceProducts.filter((p) => p.category === selectedCategory);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const idx = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIdx(Math.min(Math.max(idx, 0), filteredRice.length - 1));
  };

  const scrollToIndex = (idx) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollTo({ left: idx * w, behavior: 'smooth' });
    setActiveIdx(idx);
  };

  return (
    <section id="products-section" className="py-12 sm:py-20 lg:py-28 bg-[#FAF8F3] border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-[#B8860B]" />
              <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#072B1F]">
                Verified Rice Collection
              </span>
            </div>

            <h2 className="font-sans text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.15]">
              Pakistani Rice Varieties &amp; <br />
              <span className="text-[#155437]">Agricultural Brokerage</span>
            </h2>

            <p className="text-slate-600 text-xs sm:text-base leading-relaxed mt-2.5 sm:mt-3 font-normal">
              Signature Pakistani Basmati and Non-Basmati export grades &mdash; each offered across <strong>White (Raw), Parboiled (Sella), and Steamed</strong> processing &mdash; paired with verified pesticide residue washing and Karachi port export dispatch.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#072B1F] hover:text-[#155437] transition shrink-0"
          >
            <span>Explore Complete Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#B8860B]" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#072B1F] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-[#D5E5DC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 1. MOBILE PHONE CAROUSEL (block md:hidden) */}
        <div className="block md:hidden mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono font-bold text-[#155437]">
              Rice Varieties &bull; {activeIdx + 1} of {filteredRice.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollToIndex(Math.max(activeIdx - 1, 0))}
                disabled={activeIdx === 0}
                className="w-8 h-8 rounded-full bg-white border border-[#D5E5DC] flex items-center justify-center text-[#072B1F] disabled:opacity-30 transition cursor-pointer shadow-2xs"
                aria-label="Previous rice product"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToIndex(Math.min(activeIdx + 1, filteredRice.length - 1))}
                disabled={activeIdx === filteredRice.length - 1}
                className="w-8 h-8 rounded-full bg-white border border-[#D5E5DC] flex items-center justify-center text-[#072B1F] disabled:opacity-30 transition cursor-pointer shadow-2xs"
                aria-label="Next rice product"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 scrollbar-none scroll-smooth"
          >
            {filteredRice.map((product) => (
              <div
                key={product.id}
                className="w-[85vw] max-w-[330px] shrink-0 snap-center bg-white rounded-2xl border border-[#D5E5DC] overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={product.image || '/images/products/super-kernel.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#072B1F] border border-[#D5E5DC] shadow-xs">
                        {product.category}
                      </span>
                    </div>
                    {product.badge && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-[#072B1F] text-[#CFA744] shadow-xs">
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] font-mono text-[#B8860B] font-bold block mb-1">
                      Grain: {product.grainLength}
                    </span>
                    <h3 className="font-sans text-base font-bold text-[#072B1F] mb-1.5 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2.5 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2.5 text-[9px] font-bold">
                      <span className="px-1.5 py-0.5 rounded bg-[#FAF8F3] text-slate-700 border border-slate-200">
                        White
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#EAF5EF] text-[#155437] border border-[#BDE3CF]">
                        Sella
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#FAF0D9] text-[#8B6508] border border-[#EADBBD]">
                        Steamed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/products/${product.slug}`}
                    className="text-xs font-bold text-[#072B1F] hover:text-[#155437] flex items-center gap-1 transition"
                  >
                    <span>Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B8860B]" />
                  </Link>

                  <button
                    onClick={() => onOpenQuoteWithProduct(product)}
                    className="bg-[#072B1F] hover:bg-[#155437] text-white px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-3">
            {filteredRice.map((product, idx) => (
              <button
                key={product.id}
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  activeIdx === idx ? 'w-5 h-1.5 bg-[#072B1F]' : 'w-1.5 h-1.5 bg-slate-300'
                }`}
                aria-label={`Go to ${product.name}`}
              />
            ))}
          </div>
        </div>

        {/* 2. LAPTOP / DESKTOP PRODUCTS GRID (hidden md:grid) — Completely Untouched */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {filteredRice.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#D5E5DC] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={product.image || '/images/products/super-kernel.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#072B1F] border border-[#D5E5DC] shadow-xs">
                      {product.category}
                    </span>
                  </div>
                  {product.badge && (
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#072B1F] text-[#CFA744] shadow-xs">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <span className="text-[11px] font-mono text-[#B8860B] font-bold block mb-1">
                    Grain: {product.grainLength}
                  </span>

                  <h3 className="font-sans text-xl font-bold text-[#072B1F] mb-2 group-hover:text-[#155437] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  {/* Processing Types Badge */}
                  <div className="flex flex-wrap gap-1 mb-3 text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F3] text-slate-700 border border-slate-200">
                      White
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#EAF5EF] text-[#155437] border border-[#BDE3CF]">
                      Sella
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FAF0D9] text-[#8B6508] border border-[#EADBBD]">
                      Steamed
                    </span>
                  </div>

                  {/* Verified Characteristics List */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {(product.characteristics || []).slice(0, 3).map((char, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#155437] mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{char}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to={`/products/${product.slug}`}
                  className="text-xs font-bold text-[#072B1F] hover:text-[#155437] flex items-center gap-1 transition"
                >
                  <span>Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B8860B]" />
                </Link>

                <button
                  onClick={() => onOpenQuoteWithProduct(product)}
                  className="bg-[#072B1F] hover:bg-[#155437] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Cross-Border Sourcing & Brokerage Feature Banner */}
        {brokerageService && (
          <div className="bg-[#072B1F] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-[#155437] shadow-lg flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CFA744]">
                <Compass className="w-4 h-4" />
                <span>Agricultural Commodity Brokerage</span>
              </div>

              <h3 className="font-sans text-xl xs:text-2xl sm:text-3xl font-extrabold text-white">
                Global Cross-Border Sourcing &amp; Brokerage
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Modular Traders bridges local Pakistani agricultural producers and rice millers with international buyers, wholesalers, and food distributors — ensuring transparent negotiations and quality-focused grain sourcing.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CFA744]" />
                  <span>Direct Miller Connections</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CFA744]" />
                  <span>Transparent Brokerage Terms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CFA744]" />
                  <span>Quality Grain Matching</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
              <button
                onClick={() => onOpenQuoteWithProduct(brokerageService)}
                className="w-full sm:w-auto bg-[#CFA744] hover:bg-[#b89336] text-[#072B1F] font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition text-center shadow-sm cursor-pointer"
              >
                Discuss Brokerage Requirements
              </button>

              <Link
                to={`/products/${brokerageService.slug}`}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition text-center"
              >
                Brokerage Overview
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
