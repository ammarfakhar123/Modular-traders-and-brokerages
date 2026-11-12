import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Ship,
  CheckCircle2,
} from 'lucide-react';
import { useProducts } from '@/repositories/productRepository';
import { initialProducts } from '@/data/products';

export default function HeroCinematic({ onOpenQuote, onOpenQuoteWithProduct }) {
  const { products } = useProducts(true);
  const catalogItems = products && products.length > 0 ? products : initialProducts;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Short labels for clean docked selector strip
  const shortLabels = {
    'super-kernel-basmati-rice': 'Super Kernel Basmati',
    'irri-6-long-grain-white-rice': 'IRRI-6 White',
    'irri-9-long-grain-rice': 'IRRI-9 Long Grain',
    'pk-348-long-grain-rice': 'PK-348',
    'sindh-basmati-d-98-rice': 'Sindh D-98',
    'irri-6-pk-parboiled-sella-rice': 'Parboiled Sella',
    'global-cross-border-sourcing-brokerage': 'Global Brokerage',
  };

  // Auto-rotate carousel every 4.5s unless hovered
  useEffect(() => {
    if (isPaused || catalogItems.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % catalogItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, catalogItems.length]);

  const activeItem = catalogItems[activeIndex] || catalogItems[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + catalogItems.length) % catalogItems.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % catalogItems.length);
  };

  return (
    <section className="px-3 sm:px-6 pt-24 sm:pt-28 pb-6 sm:pb-10 max-w-[1440px] mx-auto select-none">
      {/* Main Hero Container */}
      <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden min-h-[580px] sm:min-h-[630px] flex flex-col justify-between text-slate-800 border border-[#D5E5DC] bg-[#FAF8F3] shadow-[0_20px_50px_rgba(7,43,31,0.08)]">
        {/* Authentic Rice Harvest & Table Background Photography */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-right pointer-events-none"
          style={{
            backgroundImage: `url('/images/hero-banner.jpg')`,
          }}
        />

        {/* Crisp High-Contrast Gradient Wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/95 via-50% to-[#FAF8F3]/75 lg:to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

        {/* Two-Column Hero Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center p-6 sm:p-10 lg:p-14 my-auto">
          {/* LEFT COLUMN: Clean, Impactful Value Proposition */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-[#B8860B]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#072B1F]">
                Karachi, Pakistan &bull; Rice Exports &amp; Brokerage
              </span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.1]">
              PAKISTAN&apos;S FINEST RICE <br />
              <span className="text-[#155437]">EXPORTED WORLDWIDE</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 max-w-lg font-normal leading-relaxed">
              Connecting international buyers directly with verified Pakistani rice mills. Supplying Super Kernel Basmati, IRRI-6, IRRI-9, PK-348, Sindh D-98, and Parboiled Sella from origin to global ports.
            </p>

            {/* Primary CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onOpenQuote}
                className="bg-[#072B1F] hover:bg-[#155437] text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 text-[#CFA744]" />
              </button>

              <Link
                to="/products"
                className="bg-white hover:bg-slate-50 text-[#072B1F] border border-[#D5E5DC] px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-2xs"
              >
                Explore All Products
              </Link>
            </div>

            {/* Minimalist Corporate Anchors */}
            <div className="pt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-700 font-medium border-t border-slate-200/70 max-w-lg">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#155437]" />
                Direct Mill Sourcing
              </span>
              <span className="flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-[#155437]" />
                KPT &amp; Port Qasim
              </span>
              <span className="text-[#072B1F] font-semibold italic">
                &ldquo;Cultivating Trust&rdquo;
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Multi-Product Showcase Carousel (All 7 Offerings) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(7,43,31,0.16)] border border-[#D5E5DC]"
            >
              {/* Carousel Visual Media Frame */}
              <div className="relative h-52 sm:h-60 bg-[#072B1F] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.image || '/images/about-rice.jpg'}
                    alt={activeItem.name}
                    onError={(e) => {
                      e.currentTarget.src = '/images/about-rice.jpg';
                    }}
                    initial={{ opacity: 0.4, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25 pointer-events-none" />

                {/* Top Overlay Bar: Category + Controls */}
                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#072B1F] shadow-sm">
                    {activeItem.category}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-black/60 text-[#CFA744] mr-1">
                      0{activeIndex + 1} / 0{catalogItems.length}
                    </span>
                    <button
                      onClick={handlePrev}
                      aria-label="Previous offering"
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#072B1F] flex items-center justify-center shadow-sm transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next offering"
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#072B1F] flex items-center justify-center shadow-sm transition cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay Info on Image */}
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#CFA744]" />
                    <span className="truncate max-w-[210px] sm:max-w-xs">{activeItem.origin}</span>
                  </div>
                  <span className="font-mono font-bold text-[#CFA744] bg-black/50 px-2.5 py-0.5 rounded">
                    {activeItem.isService ? 'B2B Brokerage' : activeItem.grainLength}
                  </span>
                </div>
              </div>

              {/* Carousel Content Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#072B1F] leading-snug">
                      {activeItem.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {activeItem.shortDescription}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Indicator Dots + Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  {/* Slide Dots */}
                  <div className="flex items-center gap-1.5">
                    {catalogItems.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`View ${item.name}`}
                        className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                          activeIndex === idx
                            ? 'w-6 bg-[#072B1F]'
                            : 'w-2 bg-slate-300 hover:bg-[#CFA744]'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quick Links */}
                  <div className="flex items-center gap-2.5">
                    <Link
                      to={`/products/${activeItem.slug}`}
                      className="text-xs font-bold text-[#155437] hover:text-[#072B1F] px-3 py-1.5 rounded-lg border border-[#D5E5DC] hover:bg-slate-50 transition"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() =>
                        onOpenQuoteWithProduct
                          ? onOpenQuoteWithProduct(activeItem)
                          : onOpenQuote()
                      }
                      className="bg-[#072B1F] hover:bg-[#155437] text-[#CFA744] hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM DOCKED STRIP: Clean Quick Selector for All 7 Offerings */}
        <div className="relative z-10 bg-[#072B1F] border-t border-[#155437] px-4 sm:px-8 py-3 flex flex-col lg:flex-row items-center justify-between gap-3 text-white">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#CFA744] shrink-0">
            OUR PORTFOLIO (7 OFFERINGS):
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            {catalogItems.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#072B1F] shadow-sm font-bold'
                      : 'bg-white/10 hover:bg-white/15 text-slate-200'
                  }`}
                >
                  {shortLabels[item.slug] || item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
