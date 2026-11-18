import React, { useRef, useState } from 'react';
import {
  ShieldCheck,
  Award,
  Clock,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function CoreValuesSection() {
  const scrollContainerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Exact 4 Core Values from Modular Traders & Brokerage client specification
  const coreValues = [
    {
      number: '01',
      title: 'Integrity',
      desc: 'We say what we ship and ship what we say. Specifications, prices and timelines are honest.',
      icon: ShieldCheck,
    },
    {
      number: '02',
      title: 'Quality',
      desc: 'Grain quality is non-negotiable. Every lot is tested against the contract.',
      icon: Award,
    },
    {
      number: '03',
      title: 'Reliability',
      desc: 'On-time loading, accurate documents and prompt answers, shipment after shipment.',
      icon: Clock,
    },
    {
      number: '04',
      title: 'Partnership',
      desc: 'Mills, buyers and staff succeed together; we invest in long-term relationships.',
      icon: HeartHandshake,
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
    const nextIdx =
      direction === 'next'
        ? Math.min(activeIdx + 1, coreValues.length - 1)
        : Math.max(activeIdx - 1, 0);
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
              Our values
            </h2>

            <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
              Four principles that guide how Modular Traders selects Pakistani rice millers, verifies grain quality, and serves international buyers.
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

        {/* 2. LAPTOP / DESKTOP CLEAN 4-CARD GRID (hidden md:grid) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.number}
                className="bg-[#FAF8F3] rounded-2xl p-5 sm:p-6 border border-[#D5E5DC] hover:border-[#B8860B]/60 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
