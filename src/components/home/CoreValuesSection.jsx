import React from 'react';
import {
  Award,
  FileCheck,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Users,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function CoreValuesSection() {
  // Exact 6 Core Values as required by Modular Traders and Brokerage
  const coreValues = [
    {
      number: '01',
      title: 'Quality',
      summary: 'Strict adherence to contracted rice specifications and varietal purity.',
      desc: 'We maintain rigorous standards across milling degrees, moisture levels, grain length, and optical Sortex grading to ensure consistent excellence in every export consignment.',
      icon: Award,
    },
    {
      number: '02',
      title: 'Transparency',
      summary: 'Open commercial discussions and clear contractual terms.',
      desc: 'From initial price discovery and Incoterms (FOB/CIF) to loading documentation and port clearances, we operate with complete clarity and zero concealed surcharges.',
      icon: FileCheck,
    },
    {
      number: '03',
      title: 'Trust',
      summary: 'The foundation of our tagline: "Cultivating Trust."',
      desc: 'We honor our commitments with integrity. Every trade transaction is handled with professional diligence so buyers and suppliers can trade with unwavering confidence.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Reliability',
      summary: 'Dependable execution across sourcing, packing, and dispatch.',
      desc: 'We ensure reliable supply chains through established miller relationships, systematic schedule management, and coordinated vessel dispatch from Karachi seaports.',
      icon: Clock,
    },
    {
      number: '05',
      title: 'Customer Commitment',
      summary: 'Tailoring sourcing solutions to precise buyer requirements.',
      desc: 'Whether supplying custom retail packaging, specific broken grain ratios, or private label artwork, our focus remains on meeting exact importer specifications.',
      icon: HeartHandshake,
    },
    {
      number: '06',
      title: 'Long-Term Partnerships',
      summary: 'Building enduring relationships beyond one-off transactions.',
      desc: 'We prioritize multi-cycle commercial alliances, growing cooperatively with our international buyers, regional distributors, and domestic agricultural producers.',
      icon: Users,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white text-slate-800 border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[2px] bg-[#B8860B]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
              Operating Principles &bull; Cultivating Trust
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.14] mb-4">
            Our Core Values
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            At Modular Traders and Brokerage, our daily operations and long-term business strategy are built upon six fundamental pillars that define how we source, negotiate, and execute international agritrade.
          </p>
        </div>

        {/* 6 Core Values Grid (3 Columns x 2 Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.number}
                className="bg-[#FAF8F3] rounded-2xl p-7 border border-[#D5E5DC] hover:border-[#B8860B]/60 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#D5E5DC] flex items-center justify-center text-[#155437]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#B8860B]">
                      {val.number}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg font-bold text-[#072B1F] mb-1.5">
                    {val.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#155437] mb-3">
                    {val.summary}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EADBBD]/50 flex items-center justify-between text-[11px] font-medium text-slate-500">
                  <span>Standardized Protocol</span>
                  <span className="text-[#072B1F] font-bold">&check; Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
