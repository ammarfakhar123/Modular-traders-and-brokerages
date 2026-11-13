import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { initialProducts } from '@/data/products';

export default function HeroCinematic({ onOpenQuote }) {
  const shortLabels = {
    '1121-basmati-rice': '1121 Basmati',
    'super-kernel-basmati-rice': 'Super Kernel',
    'super-basmati-rice': 'Super Basmati',
    'pk-385-basmati-rice': 'PK-385',
    'pk-515-basmati-rice': 'PK-515',
    'basmati-1692-rice': 'Basmati 1692',
    'basmati-1718-rice': 'Basmati 1718',
    'basmati-1509-rice': 'Basmati 1509',
    'irri-6-long-grain-white-rice': 'IRRI-6 White',
    'irri-9-c9-long-grain-rice': 'IRRI-9 / C9',
    'pk-386-long-grain-white-rice': 'PK-386',
    'ks-282-long-grain-rice': 'KS-282',
  };

  return (
    <section className="px-3 sm:px-6 pt-[90px] xs:pt-[96px] sm:pt-[116px] pb-6 sm:pb-8 max-w-[1440px] mx-auto select-none">
      {/* Main Hero Card with Clean Gap Below Navbar */}
      <div className="relative rounded-2xl xs:rounded-3xl sm:rounded-[2.25rem] overflow-hidden min-h-[460px] sm:min-h-[490px] lg:min-h-[520px] flex flex-col justify-between text-slate-800 border border-[#D5E5DC] bg-[#FAF8F3] shadow-[0_20px_50px_rgba(7,43,31,0.08)]">
        {/* Full-Bleed Rice Crop Field & Harvest Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center pointer-events-none"
          style={{
            backgroundImage: `url('/images/hero-banner.jpg')`,
          }}
        />

        {/* Smooth Left Gradient Wash — Enhanced for 100% Mobile Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/95 sm:via-[#FAF8F3]/92 via-75% sm:via-42% to-[#FAF8F3]/60 sm:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Left Column Text Content */}
        <div className="relative z-10 max-w-2xl p-5 xs:p-6 sm:p-10 lg:p-11 my-auto space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-5 sm:w-6 h-[2px] bg-[#B8860B]" />
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#072B1F]">
              Modular Traders and Brokerage &bull; Karachi HQ
            </span>
          </div>

          <h1 className="font-sans text-[1.65rem] xs:text-2xl sm:text-3xl lg:text-[2.55rem] font-extrabold tracking-normal text-[#072B1F] leading-[1.2] space-y-0.5 sm:space-y-1">
            <span className="block">PAKISTAN&apos;S FINEST RICE</span>
            <span className="block text-[#155437]">GROWN WITH INTEGRITY</span>
          </h1>

          <p className="text-xs xs:text-sm sm:text-base text-slate-700 max-w-lg font-normal leading-relaxed">
            Sourcing authentic Pakistani Basmati and Non-Basmati rice directly from trusted mills in Punjab and Sindh — delivering natural aroma, pure grain quality, and dependable global brokerage.
          </p>

          {/* Action Buttons: Full-width on Mobile, Inline on Desktop */}
          <div className="pt-1 flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3.5">
            <Link
              to="/products"
              className="bg-[#072B1F] hover:bg-[#155437] text-white px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-center"
            >
              <span>Explore Our Rice</span>
              <ArrowRight className="w-4 h-4 text-[#CFA744]" />
            </Link>

            <button
              onClick={onOpenQuote}
              className="bg-white/95 hover:bg-white text-[#072B1F] border border-[#D5E5DC] px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-2xs cursor-pointer text-center"
            >
              Request a Quote
            </button>
          </div>

          {/* Concise Rice-Focused Trust Line */}
          <div className="pt-2 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-[#072B1F] font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#155437]" />
              Aged Basmati &amp; Long Grain
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#155437]" />
              Direct Mill Sourcing
            </span>
            <span className="italic text-[#B8860B]">
              &ldquo;Cultivating Trust&rdquo;
            </span>
          </div>
        </div>

        {/* Bottom Docked Strip: Horizontally Swipeable on Mobile, Wrapped on Desktop */}
        <div className="relative z-10 bg-[#072B1F]/95 border-t border-[#155437] px-3.5 sm:px-8 py-2.5 sm:py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 text-white">
          <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#CFA744] shrink-0">
            OUR 12 EXPORT VARIETIES:
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1 w-full flex-nowrap lg:flex-wrap">
            {initialProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.slug}`}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium bg-white/10 hover:bg-white hover:text-[#072B1F] text-slate-100 transition-colors whitespace-nowrap shrink-0"
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
