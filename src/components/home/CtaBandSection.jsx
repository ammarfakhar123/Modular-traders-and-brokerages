import React from 'react';
import { ArrowRight, MessageSquare, MapPin, Building2, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function CtaBandSection({ onOpenQuote }) {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F3] border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 lg:p-16 bg-[#072B1F] text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-xl border border-[#155437]">
          {/* Left Text */}
          <div className="max-w-2xl text-center lg:text-left space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#CFA744]">
              <Building2 className="w-4 h-4" />
              <span>Modular Traders and Brokerage &bull; Karachi, Pakistan</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white leading-tight">
              Ready to Discuss Sourcing or Export Brokerage?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
              Whether you are an international buyer seeking containerized FCL rice shipments or a supplier discussing commercial representation, our Karachi trade desk provides professional, transparent guidance tailored to your specific market requirements.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#CFA744]" /> DHA Phase 6, Karachi Headquarters
              </span>
              <span className="text-slate-500">&bull;</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sourcing via KPT &amp; Port Qasim
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenQuote}
              className="bg-[#CFA744] hover:bg-[#b89336] text-[#072B1F] font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-sm text-center cursor-pointer"
            >
              Request a Commercial Quote
            </button>

            <a
              href={siteConfig.contact.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition text-center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Trade Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
