import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function HeroCinematic({ onOpenQuote }) {
  return (
    <section className="px-3 sm:px-6 pt-[96px] sm:pt-[104px] lg:pt-[116px] pb-6 sm:pb-8 max-w-[1440px] mx-auto select-none">
      {/* ========================================================
          1. DESKTOP BANNER (SAME AS IT IS - 100% PREVIOUS DESIGN)
         ======================================================== */}
      <div className="hidden md:flex relative rounded-3xl sm:rounded-[2.25rem] overflow-hidden min-h-[440px] sm:min-h-[490px] lg:min-h-[520px] flex-col justify-between text-slate-800 border border-[#D5E5DC] bg-[#FAF8F3] shadow-[0_20px_50px_rgba(7,43,31,0.08)]">
        {/* Full-Bleed Rice Crop Field & Harvest Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center pointer-events-none"
          style={{
            backgroundImage: `url('/images/hero-banner.jpg')`,
          }}
        />

        {/* Smooth Left Gradient Wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/92 via-42% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Left Column Text Content (Clean, Balanced, Uncluttered) */}
        <div className="relative z-10 max-w-2xl p-6 sm:p-10 lg:p-11 my-auto space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-[2px] bg-[#B8860B]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#072B1F]">
              Modular Traders and Brokerage &bull; Karachi, Pakistan
            </span>
          </div>

          <h1 className="font-sans text-2xl sm:text-3xl lg:text-[2.55rem] font-extrabold tracking-normal text-[#072B1F] leading-[1.24] space-y-1">
            <span className="block">PAKISTAN&apos;S FINEST RICE</span>
            <span className="block text-[#155437]">GROWN WITH INTEGRITY</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-lg font-normal leading-relaxed">
            Sourcing authentic Pakistani Basmati and Non-Basmati rice directly from trusted mills in Punjab and Sindh — delivering natural aroma, pure grain quality, and dependable global brokerage.
          </p>

          {/* Clean Action Buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-3.5">
            <Link
              to="/products"
              className="bg-[#072B1F] hover:bg-[#155437] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <span>Explore Our Rice</span>
              <ArrowRight className="w-4 h-4 text-[#CFA744]" />
            </Link>

            <button
              onClick={onOpenQuote}
              className="bg-white/95 hover:bg-white text-[#072B1F] border border-[#D5E5DC] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-2xs cursor-pointer"
            >
              Request a Quote
            </button>
          </div>

          {/* Concise Rice-Focused Trust Line */}
          <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#072B1F] font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#155437]" />
              Aged Basmati &amp; Long Grain
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#155437]" />
              Direct Mill Sourcing
            </span>
            <span className="italic text-[#B8860B]">
              &ldquo;Cultivating Trust&rdquo;
            </span>
          </div>
        </div>

        {/* Bottom Docked Strip: Clean Inline 2 Categories (Basmati & Non-Basmati) */}
        <div className="relative z-10 bg-[#072B1F]/95 border-t border-[#155437] px-6 sm:px-8 py-3 flex items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CFA744] shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#CFA744]" />
            <span>EXPORT RICE CATEGORIES:</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/products?category=Basmati+Rice"
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#FAF8F3] hover:bg-white text-[#072B1F] transition-all shadow-xs flex items-center gap-2 group cursor-pointer"
            >
              <span>Basmati Rice</span>
              <span className="text-[10px] font-mono text-[#8B6508] bg-[#FAF0D9] px-2 py-0.5 rounded-md font-semibold">
                8 Varieties
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#072B1F] group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/products?category=Non-Basmati+Rice"
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Non-Basmati Rice</span>
              <span className="text-[10px] font-mono text-emerald-300 bg-white/10 px-2 py-0.5 rounded-md font-semibold">
                4 Varieties
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CFA744] group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/products"
              className="hidden lg:inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white transition pl-2 font-medium"
            >
              <span>View All 12 Varieties &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. MOBILE/PHONE BANNER (DEDICATED TAILORED MOBILE LAYOUT)
         ======================================================== */}
      <div className="flex md:hidden relative rounded-2xl overflow-hidden min-h-[460px] flex-col justify-between text-slate-800 border border-[#D5E5DC] bg-[#FAF8F3] shadow-md">
        {/* Background Image with Enhanced Mobile Contrast Wash */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('/images/hero-banner.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/95 via-75% to-[#FAF8F3]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Mobile Content Column */}
        <div className="relative z-10 p-5 my-auto space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#B8860B]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#072B1F]">
              Modular Traders &bull; Karachi HQ
            </span>
          </div>

          <h1 className="font-sans text-[1.65rem] font-extrabold text-[#072B1F] leading-[1.2]">
            <span className="block">PAKISTAN&apos;S FINEST RICE</span>
            <span className="block text-[#155437]">GROWN WITH INTEGRITY</span>
          </h1>

          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            Sourcing authentic Pakistani Basmati and Non-Basmati export rice directly from trusted mills in Punjab and Sindh.
          </p>

          {/* Mobile Action Buttons (Full-Width Clean Tap Targets) */}
          <div className="pt-1 flex flex-col gap-2.5 w-full">
            <Link
              to="/products"
              className="w-full bg-[#072B1F] active:bg-[#155437] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs text-center"
            >
              <span>Explore Our Rice</span>
              <ArrowRight className="w-4 h-4 text-[#CFA744]" />
            </Link>

            <button
              onClick={onOpenQuote}
              className="w-full bg-white active:bg-slate-50 text-[#072B1F] border border-[#D5E5DC] py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xs text-center cursor-pointer"
            >
              Request a Quote
            </button>
          </div>

          {/* Concise Mobile Trust Indicators */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-[#072B1F] font-semibold border-t border-slate-200/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#155437]" />
              Direct Mill Sourcing
            </span>
            <span className="italic text-[#B8860B]">
              &ldquo;Cultivating Trust&rdquo;
            </span>
          </div>
        </div>

        {/* Mobile Bottom Strip: Exactly 2 Clean Categories (NO 12-item tall list) */}
        <div className="relative z-10 bg-[#072B1F]/95 border-t border-[#155437] p-3 flex flex-col gap-2 text-white">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#CFA744] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CFA744]" />
            <span>EXPORT RICE CATEGORIES:</span>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <Link
              to="/products?category=Basmati+Rice"
              className="bg-[#FAF8F3] active:bg-white text-[#072B1F] py-2.5 px-3 rounded-xl text-xs font-bold flex flex-col items-center justify-center text-center shadow-xs"
            >
              <span>Basmati Rice</span>
              <span className="text-[9px] font-mono text-[#8B6508] font-semibold">
                8 Varieties &rarr;
              </span>
            </Link>

            <Link
              to="/products?category=Non-Basmati+Rice"
              className="bg-white/10 active:bg-white/20 text-white border border-white/20 py-2.5 px-3 rounded-xl text-xs font-bold flex flex-col items-center justify-center text-center"
            >
              <span>Non-Basmati</span>
              <span className="text-[9px] font-mono text-emerald-300 font-semibold">
                4 Varieties &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
