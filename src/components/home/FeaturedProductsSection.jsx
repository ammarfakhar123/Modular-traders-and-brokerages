import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShieldCheck, CheckCircle2, Package, Ship, Compass } from 'lucide-react';
import { useProducts } from '@/repositories/productRepository';

export default function FeaturedProductsSection({ onOpenQuote, onOpenQuoteWithProduct }) {
  const { products, loading } = useProducts(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories matching official business table
  const categories = [
    'All',
    'Basmati Rice',
    'White Rice',
    'Long Grain Rice',
    'Non-Basmati Rice',
    'Parboiled Rice',
  ];

  // Separate rice commodities from the brokerage service
  const riceProducts = products.filter((p) => !p.isService);
  const brokerageService = products.find((p) => p.isService);

  const filteredRice = selectedCategory === 'All'
    ? riceProducts
    : riceProducts.filter((p) => p.category === selectedCategory);

  return (
    <section id="products-section" className="py-20 sm:py-28 bg-[#FAF8F3] border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[2px] bg-[#B8860B]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
                Verified Rice Collection
              </span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.14]">
              Pakistani Rice Varieties &amp; <br />
              <span className="text-[#155437]">Agricultural Brokerage</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3 font-normal">
              Six signature Pakistani rice grades paired with transparent cross-border sourcing connecting international buyers directly with verified mills.
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
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#072B1F] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-[#D5E5DC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid: 6 Verified Rice Varieties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
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

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {product.shortDescription}
                  </p>

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
          <div className="bg-[#072B1F] rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white border border-[#155437] shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CFA744]">
                <Compass className="w-4 h-4" />
                <span>Agricultural Commodity Brokerage</span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">
                Global Cross-Border Sourcing &amp; Brokerage
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Modular Traders bridges local Pakistani agricultural producers and rice millers with international buyers, wholesalers, and food distributors — ensuring transparent negotiations and quality-focused grain sourcing.
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-300">
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

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => onOpenQuoteWithProduct(brokerageService)}
                className="bg-[#CFA744] hover:bg-[#b89336] text-[#072B1F] font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition text-center shadow-sm cursor-pointer"
              >
                Discuss Brokerage Requirements
              </button>

              <Link
                to={`/products/${brokerageService.slug}`}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition text-center"
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
