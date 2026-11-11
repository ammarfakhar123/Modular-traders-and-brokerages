import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Ship,
  FileCheck2,
  Package,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function HeroCinematic({ onOpenQuote }) {
  // Flagship Pakistani Rice Varieties from Official Catalog
  const flagshipVarieties = [
    {
      id: 'super-kernel-basmati',
      name: 'Super Kernel Basmati Rice',
      shortName: 'Super Kernel Basmati',
      category: 'Basmati Rice',
      tagline: 'Aged Aromatic &bull; Himalayan Irrigated',
      grainLength: '7.2 – 7.4 mm avg',
      origin: 'Punjab & Sindh Agricultural Basins',
      highlight: 'Exceptional cooking elongation (up to 2x)',
      packaging: '1kg–10kg Pouches / 25kg–50kg PP Sacks',
      ports: 'Karachi Port (KPT) & Port Qasim (PQ)',
      slug: 'super-kernel-basmati-rice',
    },
    {
      id: 'irri-6-long-grain',
      name: 'IRRI-6 Long Grain White Rice',
      shortName: 'IRRI-6 Long Grain',
      category: 'White Rice',
      tagline: 'High-Volume Commercial Export Staple',
      grainLength: '6.0 – 6.2 mm avg',
      origin: 'Sindh Alluvial Basin',
      highlight: 'Firm grain structure with superior ocean transit resilience',
      packaging: '25kg & 50kg PP Bags / Bulk Container Liners',
      ports: 'Karachi Port (KPT) & Port Qasim (PQ)',
      slug: 'irri-6-long-grain-white-rice',
    },
    {
      id: 'irri-9-slender',
      name: 'IRRI-9 Long Grain Rice',
      shortName: 'IRRI-9 Slender',
      category: 'Long Grain Rice',
      tagline: 'Slender Grain for Food Service & Retail',
      grainLength: '6.6 – 6.8 mm avg',
      origin: 'Upper Sindh Agricultural Belts',
      highlight: 'Slender kernel profile with clean optical grading',
      packaging: '5kg–50kg PP Bags / Custom Retail Packaging',
      ports: 'Karachi Port (KPT) & Port Qasim (PQ)',
      slug: 'irri-9-long-grain-rice',
    },
    {
      id: 'sella-parboiled',
      name: 'IRRI-6 / PK Parboiled (Sella) Rice',
      shortName: 'Sella Parboiled',
      category: 'Parboiled Rice',
      tagline: 'Hydro-Thermally Cured for Heavy Cooking',
      grainLength: '6.4 – 7.2 mm avg',
      origin: 'Sindh & Punjab Milling Clusters',
      highlight: 'Extra-hard kernel that resists breakage during commercial cooking',
      packaging: '20kg, 25kg, 50kg PP & 1-Ton Jumbo Sacks',
      ports: 'Karachi Port (KPT) & Port Qasim (PQ)',
      slug: 'irri-6-pk-parboiled-sella-rice',
    },
  ];

  const [activeVariety, setActiveVariety] = useState(flagshipVarieties[0]);

  return (
    <section className="px-3 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12 max-w-[1440px] mx-auto select-none">
      {/* Outer Card with Authoritative Corporate Styling */}
      <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] flex flex-col justify-between text-slate-800 border border-[#D5E5DC] bg-[#FAF8F3] shadow-[0_20px_50px_rgba(7,43,31,0.08)]">
        {/* Authentic Background Rice Table / Harvest Photography */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-right pointer-events-none transition-transform duration-1000 scale-[1.01]"
          style={{
            backgroundImage: `url('/images/hero-banner.jpg')`,
          }}
        />

        {/* Clean, High-Contrast Gradient Veil */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/95 via-50% to-transparent sm:to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Main Hero Body */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14 my-auto">
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Elegant Corporate Tagline */}
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-[#B8860B]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
                Karachi, Pakistan &bull; Agricultural Commodity Trading &amp; Brokerage
              </span>
            </div>

            {/* Confident, Dignified Heading */}
            <h1 className="font-sans text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.12]">
              PREMIUM PAKISTANI RICE EXPORT &amp; <br />
              <span className="text-[#155437]">GLOBAL BROKERAGE</span>
            </h1>

            {/* Authentic Enterprise Narrative */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 max-w-xl font-normal leading-relaxed">
              Connecting international buyers, distributors, and wholesalers with verified Pakistani rice millers and agricultural producers. Sourcing Pakistan’s finest Basmati, White Long Grain, and Parboiled varieties from origin to global ports.
            </p>

            {/* Quality Commitment Badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-700 pt-1">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#155437]" />
                <span>Super Kernel Basmati, IRRI-6 &amp; Sella</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#155437]" />
                <span>Direct Mill Sourcing from Punjab &amp; Sindh</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#155437]" />
                <span>Karachi Port (KPT) &amp; Port Qasim Dispatch</span>
              </div>
            </div>

            {/* Clean Enterprise Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onOpenQuote}
                className="bg-[#072B1F] hover:bg-[#155437] text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Request an Export Quote</span>
                <ArrowRight className="w-4 h-4 text-[#CFA744]" />
              </button>

              <a
                href="#products-section"
                className="bg-white hover:bg-slate-50 text-[#072B1F] border border-[#D5E5DC] px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-2xs"
              >
                Browse All Varieties
              </a>
            </div>
          </div>

          {/* Right Column: Genuine Varietal Specification Dossier Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_15px_45px_rgba(7,43,31,0.1)] border border-[#D5E5DC] relative">
              {/* Top Card Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#D5E5DC] p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src="/brand/logo-icon.png"
                      alt="Modular Traders"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#072B1F]">
                      MODULAR TRADERS
                    </h3>
                    <p className="text-[11px] text-[#B8860B] font-medium">
                      Varietal Export Specification
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#EAF5EF] text-[#155437] border border-[#BDE3CF]">
                  {activeVariety.category}
                </span>
              </div>

              {/* Active Variety Information */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVariety.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#072B1F] leading-tight">
                      {activeVariety.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {activeVariety.highlight}
                    </p>
                  </div>

                  {/* Specification Grid */}
                  <div className="grid grid-cols-2 gap-2.5 py-1 text-xs">
                    <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#EADBBD]/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                        Average Grain Length
                      </span>
                      <span className="font-extrabold text-[#072B1F] text-xs font-mono">
                        {activeVariety.grainLength}
                      </span>
                    </div>

                    <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#EADBBD]/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                        Commercial Terms
                      </span>
                      <span className="font-extrabold text-[#155437] text-xs font-mono">
                        FOB / CFR / CIF
                      </span>
                    </div>
                  </div>

                  {/* Sourcing & Logistics Details */}
                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#155437] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-slate-800">Origin:</strong> {activeVariety.origin}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Ship className="w-3.5 h-3.5 text-[#155437] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-slate-800">Dispatch:</strong> {activeVariety.ports}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Package className="w-3.5 h-3.5 text-[#155437] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-slate-800">Packaging:</strong> {activeVariety.packaging}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card Footer: Status & Quote CTA */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#155437]" />
                  <span className="text-[11px] font-bold text-[#072B1F]">
                    Karachi Trade Desk Active
                  </span>
                </div>

                <button
                  onClick={onOpenQuote}
                  className="bg-[#072B1F] hover:bg-[#155437] text-[#CFA744] hover:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            BOTTOM DOCKED RIBBON BAR: Clean, Human-Designed Varietal Strip
           ======================================================== */}
        <div className="relative z-10 bg-[#072B1F] border-t border-[#155437] px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-white">
          {/* Left Ribbon Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                EXPORT VARIETY SELECTOR
              </div>
              <div className="text-[11px] text-[#CFA744]">
                Single-Origin Rice Belts &bull; Karachi Port Dispatch
              </div>
            </div>
            <div className="w-[1px] h-6 bg-white/20 hidden md:block" />
          </div>

          {/* Interactive Varietal Switcher Tabs (Zero Scrollbars, Clean Corporate Buttons) */}
          <div className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
            {flagshipVarieties.map((v) => {
              const isSelected = activeVariety.id === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveVariety(v)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#072B1F] shadow-sm font-bold'
                      : 'bg-white/10 hover:bg-white/15 text-slate-200'
                  }`}
                >
                  {v.shortName}
                </button>
              );
            })}
          </div>

          {/* Right Status */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CFA744]" />
            <span>FOB Karachi / CIF Worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
