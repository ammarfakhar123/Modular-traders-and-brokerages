import React, { useState } from 'react';
import { Globe2, Anchor, Ship, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function GlobalReachSection({ onOpenQuote }) {
  const [activeCorridorIndex, setActiveCorridorIndex] = useState(0);

  const portsTicker = [
    'JEDDAH ISLAMIC PORT',
    'MOMBASA (KENYA)',
    'DAR ES SALAAM (TANZANIA)',
    'PORT KLANG (MALAYSIA)',
    'TANJUNG PRIOK (INDONESIA)',
    'ROTTERDAM (NETHERLANDS)',
    'HAMAD PORT (QATAR)',
    'SOHAR (OMAN)',
    'DJIBOUTI PORT',
    'ANTWERP (BELGIUM)',
    'COLOMBO (SRI LANKA)',
  ];

  const corridors = siteConfig.targetCorridors || [];
  const activeCorridor = corridors[activeCorridorIndex] || corridors[0] || { corridor: '', ports: [] };

  return (
    <section id="global-network" className="py-20 sm:py-28 bg-white text-slate-800 border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[2px] bg-[#B8860B]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
              Export Corridors &bull; Maritime Logistics
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.14]">
            Connecting Karachi Seaports to <br />
            <span className="text-[#155437]">Global Trade Corridors</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-normal">
            Modular Traders coordinates regular containerized (FCL) shipments and bulk vessel charters from <strong>Karachi Port (KPT)</strong> and <strong>Port Muhammad Bin Qasim (PQ)</strong> across four primary international destination corridors.
          </p>
        </div>

        {/* Interactive Corridors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          {/* Corridor Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {corridors.map((c, idx) => (
              <div
                key={c.corridor}
                onClick={() => setActiveCorridorIndex(idx)}
                className={`p-5 rounded-xl border transition-all duration-150 cursor-pointer ${
                  activeCorridorIndex === idx
                    ? 'bg-[#072B1F] text-white border-[#072B1F] shadow-sm'
                    : 'bg-[#FAF8F3] border-[#D5E5DC] text-slate-800 hover:bg-white hover:border-[#B8860B]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-sans text-base font-bold tracking-tight">
                    {c.corridor}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      activeCorridorIndex === idx
                        ? 'bg-[#CFA744] text-[#072B1F]'
                        : 'bg-white text-[#155437] border border-[#BDE3CF]'
                    }`}
                  >
                    {c.priority}
                  </span>
                </div>
                <div
                  className={`text-xs ${
                    activeCorridorIndex === idx ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  Lead: {c.leadProducts}
                </div>
              </div>
            ))}
          </div>

          {/* Corridor Details Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F3] rounded-2xl p-6 sm:p-8 border border-[#D5E5DC] shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-[#155437]" />
                  <span className="font-sans text-lg font-bold text-[#072B1F]">
                    {activeCorridor.corridor}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#155437] bg-[#EAF5EF] px-3 py-1 rounded-md border border-[#BDE3CF]">
                  {activeCorridor.priority}
                </span>
              </div>

              <div className="space-y-4 mb-6 text-xs">
                <div>
                  <span className="font-bold text-[#072B1F] block mb-2">Key Destination Seaports:</span>
                  <div className="flex flex-wrap gap-2">
                    {(activeCorridor?.ports || []).map((port) => (
                      <span
                        key={port}
                        className="bg-white px-3 py-1.5 rounded-lg border border-[#D5E5DC] text-[#072B1F] font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <Anchor className="w-3.5 h-3.5 text-[#155437]" />
                        <span>{port}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-bold text-[#072B1F] block mb-1">Lead Export Varieties:</span>
                  <p className="text-slate-700 bg-white p-3.5 rounded-xl border border-[#D5E5DC] font-medium leading-relaxed">
                    {activeCorridor.leadProducts}
                  </p>
                </div>

                <div className="pt-1">
                  <span className="font-bold text-[#072B1F] block mb-1">Transit &amp; Vessel Operations:</span>
                  <p className="text-slate-600 leading-relaxed font-normal">
                    {activeCorridor.routeType}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Ship className="w-4 h-4 text-[#155437]" />
                  <span>Loading: Karachi Port (KPT) &amp; Port Qasim (PQ)</span>
                </div>

                <button
                  onClick={onOpenQuote}
                  className="w-full sm:w-auto bg-[#072B1F] hover:bg-[#155437] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-xs"
                >
                  Request Route Quotation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Seaports Ticker Bar */}
        <div className="rounded-xl bg-[#072B1F] text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#155437]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CFA744] shrink-0">
            <Anchor className="w-4 h-4" />
            <span>Regular Ocean Liners &bull; Dispatched From Karachi:</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {portsTicker.map((p, idx) => (
              <span key={idx} className="whitespace-nowrap flex items-center gap-2">
                <span>{p}</span>
                {idx < portsTicker.length - 1 && <span className="text-[#CFA744]">&bull;</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
