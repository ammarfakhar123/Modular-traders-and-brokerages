import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Waves, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function RiceVideoShowcaseSection({ onOpenQuote }) {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#072B1F] overflow-hidden my-6">
      {/* Background Video Looping Without Voice */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-90 pointer-events-none"
        >
          <source src="/videos/rice-showcase.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Multi-Layer Gradient Overlays for High Luxury Contrast */}
        <div className="absolute inset-0 bg-[#072B1F]/75 via-[#072B1F]/60 to-[#072B1F]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#072B1F] via-transparent to-[#072B1F]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#072B1F]/40 to-[#072B1F]/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#CFA744]/40 text-[#CFA744] text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#CFA744] animate-pulse" />
          <span>Cinematic Milling &amp; Export Excellence</span>
        </div>

        {/* Hero Title */}
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
          FROM PAKISTAN&apos;S HEARTLANDS <br />
          <span className="text-[#CFA744] font-serif italic font-normal">
            TO GLOBAL DESTINATION PORTS
          </span>
        </h2>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed mb-10">
          Direct mill sourcing across premier Punjab and Sindh rice belts. Sortex optical cleaning, pesticide residue-washed, and containerized at Karachi Port (KPT) and Port Qasim (PQ) for international importers.
        </p>

        {/* Key Feature Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-left">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#CFA744] uppercase tracking-wider font-bold">Sortex Clean</span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1">100% Optical Cleaning</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#CFA744] uppercase tracking-wider font-bold">Food Safety</span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1">EU &amp; GCC MRL Residue-Free</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#CFA744] uppercase tracking-wider font-bold">Logistics</span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1">Karachi Port (KPT) &amp; PQ Dispatches</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#CFA744] uppercase tracking-wider font-bold">Integrity</span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1">SGS Certified Pre-Shipment</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/products"
            className="px-7 py-3.5 rounded-full bg-[#FAF8F3] hover:bg-white text-[#072B1F] font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer group"
          >
            <span>Explore All 12 Varieties</span>
            <ArrowRight className="w-4 h-4 text-[#155437] group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={onOpenQuote}
            className="px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Request Export Quote
          </button>

          <a
            href={siteConfig.contact.socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 hover:text-white border border-[#25D366]/40 backdrop-blur-md font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
}
