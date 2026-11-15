import React from 'react';
import { MessageSquare, MapPin, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function CtaBandSection({ onOpenQuote }) {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-[#FAF8F3] border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 bg-[#072B1F] text-white flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 shadow-xl border border-[#155437]">
          {/* Left Text */}
          <div className="max-w-xl text-center lg:text-left space-y-3.5 sm:space-y-4">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#CFA744] block">
              Modular Traders and Brokerage &bull; Karachi, Pakistan
            </span>

            <h2 className="font-sans text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-white leading-tight">
              Source Premium Pakistani Rice With Confidence
            </h2>

            <p className="text-slate-300 text-xs sm:text-base font-normal leading-relaxed">
              Connect directly with our Karachi export trade desk today for live FOB &amp; CIF container rates, custom private-label packing, and verified crop specifications tailored to your target international market.
            </p>

            <div className="pt-1 sm:pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-[#CFA744]" /> DHA Phase 6, Karachi HQ
              </span>
              <span className="text-slate-500">&bull;</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFA744]/20 border border-[#CFA744]/60 text-[#FBBF24] font-extrabold text-xs shadow-xs tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#FBBF24]" />
                <span>Cultivating Trust</span>
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto bg-[#CFA744] hover:bg-[#b89336] text-[#072B1F] font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-sm text-center cursor-pointer"
            >
              Request a Commercial Quote
            </button>

            <a
              href={siteConfig.contact.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition text-center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
