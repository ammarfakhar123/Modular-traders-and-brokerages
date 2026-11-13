import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ShieldCheck, Ship, Sparkles, CheckCircle2, Award, Anchor, BadgeCheck, Gem } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function RiceVideoShowcaseSection({ onOpenQuote }) {
  const features = [
    {
      label: 'Sortex Clean',
      value: '100% Optical Cleaning',
      icon: Gem,
    },
    {
      label: 'Food Safety',
      value: 'EU & GCC MRL Residue-Free',
      icon: BadgeCheck,
    },
    {
      label: 'Logistics',
      value: 'Karachi Port (KPT) & PQ Dispatches',
      icon: Anchor,
    },
    {
      label: 'Integrity',
      value: 'SGS Certified Pre-Shipment',
      icon: Award,
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 lg:py-36 bg-[#072B1F] overflow-hidden my-10 sm:my-14 shadow-2xl border-y border-[#155437]">
      {/* Background Cinematic Banner Image (Full Cover - Ultra-Fast Instant Load) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/images/showcase-banner.jpg"
          alt="Pakistani Rice Belt Agricultural Harvest"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
        />

        {/* Cinematic Dual-Gradient Overlays for Deep Contrast & Vibrant Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07241A] via-black/55 to-[#07241A]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Subtle Luxury Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F1C862] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F1C862] animate-pulse" />
          <span>Direct Mill Sourcing &bull; Maritime Export Gateway</span>
        </div>

        {/* Hero Title with Sharp Text Shadows for 100% Readability */}
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] max-w-4xl mx-auto mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          FROM PAKISTAN&apos;S HEARTLANDS <br />
          <span className="text-[#F1C862] font-serif italic font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] block mt-1.5 sm:mt-2">
            TO GLOBAL DESTINATION PORTS
          </span>
        </h2>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base md:text-lg text-slate-100 font-medium max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-14 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Direct mill sourcing across premier Punjab and Sindh rice belts. Sortex optical cleaning, pesticide residue-washed, and containerized at Karachi Port (KPT) and Port Qasim (PQ) for international importers.
        </p>

        {/* Key Feature Badges Grid (Sleek Frosted Glass with New Modern Icons) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-5xl mx-auto mb-10 sm:mb-14 text-left">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.label}
                className="p-4 sm:p-5 rounded-2xl bg-black/50 hover:bg-black/65 backdrop-blur-md border border-white/20 hover:border-[#F1C862]/60 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#F1C862] uppercase tracking-wider font-bold">
                    {feat.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F1C862] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide leading-snug">
                  {feat.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Actions with Generous Spacing and No Clipping */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
          <Link
            to="/products"
            className="px-8 py-4 rounded-full bg-[#FAF8F3] hover:bg-white text-[#072B1F] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2.5 cursor-pointer group"
          >
            <span>Explore All 12 Varieties</span>
            <ArrowRight className="w-4 h-4 text-[#155437] group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={onOpenQuote}
            className="px-8 py-4 rounded-full bg-black/40 hover:bg-black/65 text-white border border-white/30 hover:border-white/50 backdrop-blur-md font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg hover:scale-105 cursor-pointer"
          >
            Request Export Quote
          </button>

          <a
            href={siteConfig.contact.socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl hover:scale-105 flex items-center gap-2.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
}
