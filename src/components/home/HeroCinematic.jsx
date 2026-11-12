import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { initialProducts } from '@/data/products';

export default function HeroCinematic({ onOpenQuote }) {
  const shortLabels = {
    'super-kernel-basmati-rice': 'Super Kernel Basmati',
    'irri-6-long-grain-white-rice': 'IRRI-6 Long Grain',
    'irri-9-long-grain-rice': 'IRRI-9 Slender',
    'pk-348-long-grain-rice': 'PK-348 Long Grain',
    'sindh-basmati-d-98-rice': 'Sindh Basmati D-98',
    'irri-6-pk-parboiled-sella-rice': 'Parboiled Sella',
    'global-cross-border-sourcing-brokerage': 'Sourcing & Brokerage',
  };

  return (
    <section className="px-3 sm:px-6 pt-24 sm:pt-28 pb-6 sm:pb-10 max-w-[1440px] mx-auto select-none">
      {/* Main Hero Card with Unobstructed Rice Harvest Crop & Grain Visuals */}
      <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden min-h-[540px] sm:min-h-[600px] lg:min-h-[640px] flex flex-col justify-between text-slate-800 border border-[#D5E5DC] bg-[#FAF8F3] shadow-[0_20px_50px_rgba(7,43,31,0.08)]">
        {/* Full-Bleed Rice Crop Field & Harvest Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center pointer-events-none"
          style={{
            backgroundImage: `url('/images/hero-banner.jpg')`,
          }}
        />

        {/* Smooth Left Gradient Wash — Preserves 100% Clarity on Left While Leaving Rice Crop & Rice Bowl Fully Visible on Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/92 via-42% to-transparent sm:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Left Column Text Content (Clean, Balanced, Uncluttered) */}
        <div className="relative z-10 max-w-2xl p-6 sm:p-12 lg:p-16 my-auto space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-[2px] bg-[#B8860B]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#072B1F]">
              Modular Traders and Brokerage &bull; Karachi, Pakistan
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.08]">
            PAKISTAN&apos;S FINEST RICE <br />
            <span className="text-[#155437]">GROWN WITH INTEGRITY</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-lg font-normal leading-relaxed">
            Sourcing authentic Pakistani Basmati and Non-Basmati rice directly from trusted mills in Punjab and Sindh — delivering natural aroma, pure grain quality, and dependable global brokerage.
          </p>

          {/* Clean Action Buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-3.5">
            <Link
              to="/products"
              className="bg-[#072B1F] hover:bg-[#155437] text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <span>Explore Our Rice</span>
              <ArrowRight className="w-4 h-4 text-[#CFA744]" />
            </Link>

            <button
              onClick={onOpenQuote}
              className="bg-white/95 hover:bg-white text-[#072B1F] border border-[#D5E5DC] px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-2xs cursor-pointer"
            >
              Request a Quote
            </button>
          </div>

          {/* Concise Rice-Focused Trust Line */}
          <div className="pt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#072B1F] font-semibold">
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

        {/* Bottom Docked Strip: Direct Quick Links to All 6 Rice Varieties & Brokerage */}
        <div className="relative z-10 bg-[#072B1F]/95 border-t border-[#155437] px-4 sm:px-8 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-3 text-white">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#CFA744] shrink-0">
            OUR RICE COLLECTION:
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            {initialProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.slug}`}
                className="px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium bg-white/10 hover:bg-white hover:text-[#072B1F] text-slate-100 transition-colors"
              >
                {shortLabels[item.slug] || item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
