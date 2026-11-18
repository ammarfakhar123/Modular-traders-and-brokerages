import React from 'react';

export default function CoreValuesSection() {
  // Exact 4 Core Values from Modular Traders & Brokerage client specification
  const values = [
    {
      number: '01',
      title: 'Integrity',
      desc: 'We say what we ship and ship what we say. Specifications, prices and timelines are honest.',
    },
    {
      number: '02',
      title: 'Quality',
      desc: 'Grain quality is non-negotiable. Every lot is tested against the contract.',
    },
    {
      number: '03',
      title: 'Reliability',
      desc: 'On-time loading, accurate documents and prompt answers, shipment after shipment.',
    },
    {
      number: '04',
      title: 'Partnership',
      desc: 'Mills, buyers and staff succeed together; we invest in long-term relationships.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#072B1F] text-white relative overflow-hidden border-b border-[#155437]">
      {/* Subtle background ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#CFA744] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#155437] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading - Exact match to client's mockup ("Our values" in warm gold font) */}
        <div className="mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#D8B467] tracking-tight">
            Our values
          </h2>
        </div>

        {/* 4 Cards Grid - Exact match to image cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {values.map((val) => (
            <div
              key={val.number}
              className="group relative rounded-2xl p-6 sm:p-7 bg-[#0A3324]/85 border border-[#CFA744]/40 hover:border-[#CFA744] transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_35px_rgba(207,167,68,0.15)] hover:-translate-y-1"
            >
              <div>
                {/* Gold Number */}
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#D8B467] mb-3 sm:mb-4 tracking-tight">
                  {val.number}
                </span>

                {/* White Bold Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3 tracking-normal">
                  {val.title}
                </h3>

                {/* Body Text */}
                <p className="text-white/85 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-sans font-light">
                  {val.desc}
                </p>
              </div>

              {/* Bottom Subtle Golden Accent Line */}
              <div className="pt-5 mt-5 border-t border-[#CFA744]/20 flex items-center justify-between text-[11px] font-mono text-[#D8B467]/75">
                <span>Cultivating Trust</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#CFA744]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
