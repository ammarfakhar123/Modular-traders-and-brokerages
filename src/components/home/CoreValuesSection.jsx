import React from 'react';
import {
  Award,
  FileCheck,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Users,
} from 'lucide-react';

export default function CoreValuesSection() {
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
      icon: Users,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-800 border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[2px] bg-[#B8860B]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
              Our Foundation &bull; Cultivating Trust
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.15] mb-3">
            Core Values in Rice Trade
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Six principles that guide how Modular Traders selects Pakistani rice millers, verifies grain quality, and serves international buyers.
          </p>
        </div>

        {/* Clean 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.number}
                className="bg-[#FAF8F3] rounded-2xl p-6 border border-[#D5E5DC] hover:border-[#B8860B]/60 transition-all duration-200"
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
