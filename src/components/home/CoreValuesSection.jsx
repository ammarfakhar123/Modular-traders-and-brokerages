import React, { useRef, useState, useEffect } from 'react';
import {
  Award,
  FileCheck,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Globe2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function CoreValuesSection() {
  const scrollContainerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Exact 6 Core Values focused on Rice Trading & Brokerage Integrity
  const coreValues = [
    {
      number: '01',
      title: 'Quality',
      desc: 'Uncompromising standards across rice grain length, milling purity, natural aging, and clean optical grading.',
      icon: Award,
    },
    {
      number: '02',
      title: 'Transparency',
      desc: 'Clear commercial terms, open sample verification, and honest communication from initial sourcing through settlement.',
      icon: FileCheck,
    },
    {
      number: '03',
      title: 'Trust',
      desc: 'Guided by our core ethos — "Cultivating Trust" — honoring every contract and rice specification we agree to.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Reliability',
      desc: 'Consistent crop quality and steady supply access through long-standing relationships with trusted Pakistani mills.',
      icon: Clock,
    },
    {
      number: '05',
      title: 'Customer Commitment',
      desc: 'Dedicated attention to each buyer’s exact rice variety, broken percentage, and retail or bulk packaging needs.',
      icon: HeartHandshake,
    },
    {
      number: '06',
      title: 'Long-Term Partnerships',
      desc: 'Building lasting trade alliances with international importers, food distributors, and local rice producers.',
      icon: Globe2,
    },
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIdx(Math.min(Math.max(index, 0), coreValues.length - 1));
  };

  const scrollToIndex = (idx) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.clientWidth * 0.85;
    scrollContainerRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveIdx(idx);
  };

  const scrollStep = (direction) => {
    const nextIdx = direction === 'next' ? Math.min(activeIdx + 1, coreValues.length - 1) : Math.max(activeIdx - 1, 0);
    scrollToIndex(nextIdx);
  };

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white text-slate-800 border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-[#B8860B]" />
              <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#072B1F]">
                Our Foundation &bull; Cultivating Trust
              </span>
            </div>

            <h2 className="font-sans text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.18] mb-2.5 sm:mb-3">
              Core Values in Rice Trade
            </h2>

            <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
              Six principles that guide how Modular Traders selects Pakistani rice millers, verifies grain quality, and serves international buyers.
            </p>
          </div>

          {/* Mobile Carousel Controls Header */}
          <div className="flex md:hidden items-center justify-between pt-1 border-t border-slate-100">
            <span className="text-[11px] font-mono font-bold text-[#155437]">
              Swipe Values &bull; {activeIdx + 1} of {coreValues.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollStep('prev')}
                disabled={activeIdx === 0}
                className="w-8 h-8 rounded-full bg-[#FAF8F3] border border-[#D5E5DC] flex items-center justify-center text-[#072B1F] disabled:opacity-40 transition cursor-pointer"
                aria-label="Previous core value"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollStep('next')}
                disabled={activeIdx === coreValues.length - 1}
                className="w-8 h-8 rounded-full bg-[#FAF8F3] border border-[#D5E5DC] flex items-center justify-center text-[#072B1F] disabled:opacity-40 transition cursor-pointer"
                aria-label="Next core value"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. MOBILE PHONE CAROUSEL (block md:hidden) */}
        <div className="block md:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-4 -mx-4 px-4 scrollbar-none scroll-smooth"
          >
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.number}
                  className="w-[84vw] max-w-[320px] shrink-0 snap-center bg-[#FAF8F3] rounded-2xl p-5 border border-[#D5E5DC] flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#D5E5DC] flex items-center justify-center text-[#155437]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#B8860B]">
                        {val.number}
                      </span>
                    </div>

                    <h3 className="font-sans text-base font-bold text-[#072B1F] mb-1.5">
                      {val.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {val.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#D5E5DC]/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Cultivating Trust</span>
                    <span className="text-[#155437] font-semibold">Pillar {val.number}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator for Mobile */}
          <div className="flex items-center justify-center gap-1.5 pt-3">
            {coreValues.map((val, idx) => (
              <button
                key={val.number}
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  activeIdx === idx
                    ? 'w-6 h-2 bg-[#072B1F]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2. LAPTOP / DESKTOP CLEAN 6-CARD GRID (hidden md:grid) — Completely Untouched */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.number}
                className="bg-[#FAF8F3] rounded-2xl p-5 sm:p-6 border border-[#D5E5DC] hover:border-[#B8860B]/60 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#D5E5DC] flex items-center justify-center text-[#155437]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#B8860B]">
                    {val.number}
                  </span>
                </div>

                <h3 className="font-sans text-base font-bold text-[#072B1F] mb-2">
                  {val.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
