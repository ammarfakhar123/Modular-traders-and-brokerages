import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function RiceVideoShowcaseSection({ onOpenQuote }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Explicitly enforce muted and play to guarantee Chrome/Edge/Safari autoplay
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-black overflow-hidden my-6">
      {/* Background Video Looping Without Voice (Crystal Clear & Bright) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/videos/rice-showcase.mp4" type="video/mp4" />
        </video>

        {/* Balanced Single-Layer Contrast Overlay — Video remains 100% visible & vibrant */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Eyebrow badge removed as requested */}

        {/* Hero Title with Sharp Text Shadows for 100% Readability */}
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
          FROM PAKISTAN&apos;S HEARTLANDS <br />
          <span className="text-[#F1C862] font-serif italic font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            TO GLOBAL DESTINATION PORTS
          </span>
        </h2>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base md:text-lg text-slate-100 font-medium max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Direct mill sourcing across premier Punjab and Sindh rice belts. Sortex optical cleaning, pesticide residue-washed, and containerized at Karachi Port (KPT) and Port Qasim (PQ) for international importers.
        </p>

        {/* Key Feature Badges Grid (Sleek Frosted Glass) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-left">
          <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 flex flex-col justify-between shadow-xl">
            <span className="text-[10px] font-mono text-[#F1C862] uppercase tracking-wider font-bold">Sortex Clean</span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1">100% Optical Cleaning</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 flex flex-col justify-between shadow-xl">
            <span className="text-[10px] font-mono text-[#F1C862] uppercase tracking-wider font-bold">Food Safety</span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1">EU &amp; GCC MRL Residue-Free</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 flex flex-col justify-between shadow-xl">
            <span className="text-[10px] font-mono text-[#F1C862] uppercase tracking-wider font-bold">Logistics</span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1">Karachi Port (KPT) &amp; PQ Dispatches</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 flex flex-col justify-between shadow-xl">
            <span className="text-[10px] font-mono text-[#F1C862] uppercase tracking-wider font-bold">Integrity</span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1">SGS Certified Pre-Shipment</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/products"
            className="px-7 py-3.5 rounded-full bg-[#FAF8F3] hover:bg-white text-[#072B1F] font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer group"
          >
            <span>Explore All 12 Varieties</span>
            <ArrowRight className="w-4 h-4 text-[#155437] group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={onOpenQuote}
            className="px-7 py-3.5 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/30 backdrop-blur-md font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
          >
            Request Export Quote
          </button>

          <a
            href={siteConfig.contact.socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
}
