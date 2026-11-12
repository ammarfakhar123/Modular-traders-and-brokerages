import React, { useState } from 'react';
import { Wheat, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GlobalReachSection({ onOpenQuote }) {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      title: '01. Harvest & Crop Selection',
      subtitle: 'Single-Origin Paddy Procurement',
      detail:
        'Sourcing directly from Pakistan’s historic Punjab Basmati belt and Sindh Indus River delta where mineral-rich alluvial soil produces distinct kernel length and natural fragrance.',
      highlights: [
        'Authentic single-origin crop harvests',
        'Careful selection of Basmati and IRRI paddy lots',
        'Moisture-checked raw paddy storage',
      ],
    },
    {
      title: '02. Controlled Natural Aging',
      subtitle: 'Unlocking Basmati Aroma & Elongation',
      detail:
        'Aged Super Kernel Basmati undergoes controlled natural maturation so excess moisture settles, allowing grains to elongate up to twice their length and remain fluffy and non-sticky.',
      highlights: [
        'Enhanced natural 2-AP floral aroma',
        'Firm grain body that resists splitting while cooking',
        'Dry, separate texture preferred in culinary dishes',
      ],
    },
    {
      title: '03. Precision Milling & Parboiling',
      subtitle: 'Silky Polish, Steam Curing & Sortex Cleaning',
      detail:
        'Partnering with modern rice mills equipped for de-husking, hydrothermal parboiling (for golden/white Sella), silky polishing, and optical Sortex grading for uniform appearance.',
      highlights: [
        'Clean, well-milled kernels free from foreign matter',
        'Steam-cured Parboiled Sella for heavy commercial cooking',
        'Flexible broken percentages matched to buyer demand',
      ],
    },
    {
      title: '04. Custom Grading & Packaging',
      subtitle: 'Retail Pouches & Wholesale Export Sacks',
      detail:
        'Finalized rice grades are packed cleanly into food-grade bags ranging from retail pouches (1kg–10kg) to commercial woven PP and jute sacks (25kg–50kg) ready for global buyers.',
      highlights: [
        'Private label and custom branding support',
        'Hygienic food-grade packaging materials',
        'Transparent brokerage and sample verification',
      ],
    },
  ];

  const current = stages[activeStage];

  return (
    <section id="rice-standards" className="py-16 sm:py-24 bg-white text-slate-800 border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[2px] bg-[#B8860B]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
              From Harvest to Kitchen &bull; Rice Quality
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.15] mb-3">
            How Our Pakistani Rice <br />
            <span className="text-[#155437]">Meets Global Standards</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Every grain reflects careful agricultural sourcing, controlled aging, and clean milling tailored for international rice buyers, restaurants, and food brands.
          </p>
        </div>

        {/* 4-Stage Rice Craftsmanship Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stage Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {stages.map((stage, idx) => (
              <button
                key={stage.title}
                onClick={() => setActiveStage(idx)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-150 cursor-pointer ${
                  activeStage === idx
                    ? 'bg-[#072B1F] text-white border-[#072B1F] shadow-sm'
                    : 'bg-[#FAF8F3] border-[#D5E5DC] text-slate-800 hover:bg-white hover:border-[#B8860B]/60'
                }`}
              >
                <div className="font-sans text-sm font-bold mb-1">
                  {stage.title}
                </div>
                <div
                  className={`text-xs ${
                    activeStage === idx ? 'text-[#CFA744]' : 'text-slate-500'
                  }`}
                >
                  {stage.subtitle}
                </div>
              </button>
            ))}
          </div>

          {/* Active Stage Details */}
          <div className="lg:col-span-7 bg-[#FAF8F3] rounded-2xl p-6 sm:p-10 border border-[#D5E5DC] space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#B8860B] font-bold block mb-1">
                  Quality Stage {activeStage + 1} of {stages.length}
                </span>
                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[#072B1F]">
                  {current.subtitle}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border border-[#D5E5DC] flex items-center justify-center text-[#155437]">
                <Wheat className="w-5 h-5" />
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {current.detail}
            </p>

            <div className="space-y-2.5 pt-2">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#155437] mt-0.5 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/products"
                className="text-xs font-bold uppercase tracking-wider text-[#072B1F] hover:text-[#155437] flex items-center gap-1.5 transition"
              >
                <span>Compare All 6 Rice Varieties</span>
                <ArrowRight className="w-4 h-4 text-[#B8860B]" />
              </Link>

              <button
                onClick={onOpenQuote}
                className="bg-[#072B1F] hover:bg-[#155437] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-xs"
              >
                Request Rice Samples / Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
