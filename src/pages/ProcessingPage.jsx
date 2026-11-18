import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Flame,
  Droplets,
  Eye,
  ShieldCheck,
  Award,
  Globe2,
  Wheat,
  Sliders,
  Check,
} from 'lucide-react';

export default function ProcessingPage({ onOpenQuote }) {
  const [activeSellaTab, setActiveSellaTab] = useState('golden');

  const comparisonData = [
    {
      process: 'White Rice (Raw Milled)',
      color: 'Bright white, translucent',
      texture: 'Soft, aromatic, fluffy',
      markets: 'Retail & households worldwide, traditional Asian cuisine',
      bgTag: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      process: 'Steam Rice',
      color: 'Creamy white',
      texture: 'Firm, distinct separate grains',
      markets: 'Middle East, Europe, casual dining, biryani houses',
      bgTag: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      process: 'Golden Sella Rice',
      color: 'Rich golden yellow',
      texture: 'Extremely firm, non-sticky',
      markets: 'GCC (Saudi Arabia, UAE), Iran, Africa, large catering, Kabsa/Mandi',
      bgTag: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    },
    {
      process: 'White Sella (Creamy)',
      color: 'Off-white / creamy',
      texture: 'Firm, separate, light appearance',
      markets: 'GCC, fine restaurants, premium catering, pulao & biryani',
      bgTag: 'bg-slate-50 text-slate-800 border-slate-200',
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#FAF8F3] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#072B1F] transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#072B1F] font-bold">Rice Processing Range</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-white border border-[#D5E5DC] p-6 sm:p-12 lg:p-14 mb-12 sm:mb-16 shadow-[0_15px_45px_rgba(7,43,31,0.06)] overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#EAF5EF] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#CFA744]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5EF] border border-[#BDE3CF] text-[#072B1F] text-xs font-bold uppercase tracking-wider mb-4">
              <Wheat className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Section Introduction &bull; Export Range</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#072B1F] tracking-tight leading-[1.14] mb-4">
              Our Processing Range
            </h1>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              At <strong>Modular Traders and Brokerage</strong>, every grain is processed to bring out its best. From fragrant white rice to robust parboiled sella, we offer a range of processing types to suit different cuisines, cooking styles and markets. Every lot is cleaned, graded and sorted to consistent export standards before it is packed.
            </p>

            <div className="flex flex-wrap gap-2.5 text-xs font-semibold text-[#072B1F]">
              <span className="bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#D5E5DC]">
                &bull; White Rice (Raw Milled)
              </span>
              <span className="bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#D5E5DC]">
                &bull; Steam Rice
              </span>
              <span className="bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#D5E5DC]">
                &bull; Golden Sella &amp; White Sella
              </span>
              <span className="bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#D5E5DC]">
                &bull; Sortex Optical Cleaning Standard
              </span>
            </div>
          </div>
        </div>

        {/* 3 Main Processing Type Modules */}
        <div className="space-y-8 sm:space-y-12 mb-16 sm:mb-20">
          {/* Module 1: White Rice */}
          <section className="rounded-3xl bg-white border border-[#D5E5DC] p-6 sm:p-10 shadow-[0_10px_35px_rgba(7,43,31,0.05)] hover:border-[#155437]/50 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#155437] bg-[#EAF5EF] px-3 py-1 rounded-full border border-[#BDE3CF]">
                    Processing Type 01
                  </span>
                  <span className="text-xs text-slate-400 font-serif italic">
                    Raw / Natural Milled
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#072B1F]">
                  White Rice
                </h2>

                <p className="text-sm sm:text-base font-semibold text-[#B8860B] font-serif italic">
                  Pure, aromatic and naturally elegant.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Our White Rice is milled straight from paddy. The husk, bran and germ are removed, and the grain is then polished to a clean, bright finish. Because the grain is not heat-treated, it keeps its full natural aroma and delicate flavour, which is the signature quality of Pakistani rice.
                </p>

                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-2.5">
                    Key Characteristics:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#155437] shrink-0" />
                      <span>Bright white, translucent grain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#155437] shrink-0" />
                      <span>Rich natural aroma &amp; delicate sweetness</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#155437] shrink-0" />
                      <span>Soft, fluffy texture when cooked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#155437] shrink-0" />
                      <span>Cooks quickly and evenly</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 1 Right Column: Ideal For & Varieties */}
              <div className="lg:col-span-5 bg-[#FAF8F3] rounded-2xl p-5 sm:p-6 border border-[#D5E5DC] space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-1.5">
                    Ideal For
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Everyday home cooking, pulao, steamed rice and retail packs, wherever aroma and softness matter most.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D5E5DC]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-2">
                    Available Varieties in White Process
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['1121 Basmati', 'Super Kernel Basmati', 'PK-386', 'IRRI-6', 'IRRI-9'].map(
                      (v) => (
                        <span
                          key={v}
                          className="text-[11px] font-semibold bg-white text-[#072B1F] px-2.5 py-1 rounded-lg border border-[#D5E5DC]"
                        >
                          {v}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <button
                  onClick={onOpenQuote}
                  className="w-full mt-2 bg-[#072B1F] hover:bg-[#155437] text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Inquire White Rice Lots</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CFA744]" />
                </button>
              </div>
            </div>
          </section>

          {/* Module 2: Steam Rice */}
          <section className="rounded-3xl bg-white border border-[#D5E5DC] p-6 sm:p-10 shadow-[0_10px_35px_rgba(7,43,31,0.05)] hover:border-[#B8860B]/50 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B] bg-[#FFF9EB] px-3 py-1 rounded-full border border-[#CFA744]/40">
                    Processing Type 02
                  </span>
                  <span className="text-xs text-slate-400 font-serif italic">
                    Paddy Steamed Prior to Milling
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#072B1F]">
                  Steam Rice
                </h2>

                <p className="text-sm sm:text-base font-semibold text-[#B8860B] font-serif italic">
                  Aged character, firmer grain, consistent results.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Steam Rice is made by lightly steaming paddy before milling. The steaming firms the grain and gives it a creamy white colour, while keeping much of its natural aroma. The result is rice that elongates well, stays separate and holds its shape through cooking.
                </p>

                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-2.5">
                    Key Characteristics:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0" />
                      <span>Creamy white grain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0" />
                      <span>Excellent elongation on cooking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0" />
                      <span>Grains stay firm and separate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0" />
                      <span>Better resistance to breakage &amp; longer shelf life</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 2 Right Column: Ideal For & Varieties */}
              <div className="lg:col-span-5 bg-[#FAF8F3] rounded-2xl p-5 sm:p-6 border border-[#D5E5DC] space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-1.5">
                    Ideal For
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Biryani, pulao, restaurants and households that want long, separate grains with dependable results.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D5E5DC]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-2">
                    Available Varieties in Steam Process
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['1121 Steam', '1509 Steam', 'Super Kernel Steam', 'PK-386 Steam'].map((v) => (
                      <span
                        key={v}
                        className="text-[11px] font-semibold bg-white text-[#072B1F] px-2.5 py-1 rounded-lg border border-[#D5E5DC]"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenQuote}
                  className="w-full mt-2 bg-[#072B1F] hover:bg-[#155437] text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Inquire Steam Rice Lots</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CFA744]" />
                </button>
              </div>
            </div>
          </section>

          {/* Module 3: Parboiled Sella Rice (With Golden Sella & White Sella Sub-cards) */}
          <section className="rounded-3xl bg-white border border-[#D5E5DC] p-6 sm:p-10 shadow-[0_10px_35px_rgba(7,43,31,0.05)] hover:border-[#155437]/50 transition-all">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#072B1F] bg-[#EAF5EF] px-3 py-1 rounded-full border border-[#BDE3CF]">
                  Processing Type 03
                </span>
                <span className="text-xs text-slate-400 font-serif italic">
                  Hydrothermal Parboiling Treatment
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#072B1F]">
                Parboiled Sella Rice
              </h2>

              <p className="text-sm sm:text-base font-semibold text-[#B8860B] font-serif italic">
                Built for strength, made for every kitchen.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-4xl">
                Sella rice is parboiled. Paddy is soaked in water, steamed and then dried before milling. This drives nutrients from the bran into the grain and hardens the starch, so the rice is very firm, non-sticky and almost impossible to overcook. Sella rice holds its shape and quality through long cooking, reheating and bulk preparation.
              </p>

              <p className="text-xs font-semibold text-[#072B1F]">
                We offer two types of Sella, each processed to a different intensity:
              </p>
            </div>

            {/* Interactive Tab Switcher for Golden Sella vs White Sella */}
            <div className="flex items-center gap-3 mb-6 border-b border-[#D5E5DC] pb-4">
              <button
                onClick={() => setActiveSellaTab('golden')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSellaTab === 'golden'
                    ? 'bg-[#CFA744] text-[#072B1F] shadow-sm'
                    : 'bg-[#FAF8F3] text-slate-600 hover:text-[#072B1F] border border-[#D5E5DC]'
                }`}
              >
                Golden Sella Rice
              </button>

              <button
                onClick={() => setActiveSellaTab('white')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSellaTab === 'white'
                    ? 'bg-[#072B1F] text-white shadow-sm'
                    : 'bg-[#FAF8F3] text-slate-600 hover:text-[#072B1F] border border-[#D5E5DC]'
                }`}
              >
                White Sella Rice (Creamy Sella)
              </button>
            </div>

            {/* Sub-Card Content */}
            {activeSellaTab === 'golden' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#CFA744]/40"
              >
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#CFA744]" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#072B1F]">
                      Golden Sella Rice
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Golden Sella goes through a longer soak and a more intensive steaming. This gives the grain its rich golden-yellow colour and maximum firmness. It is the rice of choice where grains must stay perfectly separate, even in large batches and after long holding times.
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-2">
                      Key Characteristics:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>Rich golden-yellow grain</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>Very firm, non-sticky texture</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>Excellent elongation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>Highly tolerant of overcooking and reheating</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-[#CFA744]/30 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-1">
                      Ideal For
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Kabsa, mandi, biryani, hotels, catering and large-scale food service.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-1">
                      Primary Export Markets
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      GCC (Saudi Arabia, UAE, Oman, Kuwait), Iran, Iraq, East and West Africa.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#F8FAF9] p-6 sm:p-8 rounded-2xl border border-[#BDE3CF]"
              >
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#155437]" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#072B1F]">
                      White Sella Rice (Creamy Sella)
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    White Sella is parboiled with a lighter, controlled steaming. It keeps the strength and non-stick quality of sella and gives an off-white, creamy grain that looks closer to raw rice on the plate. It offers the best of both: sella's durability with a lighter appearance.
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-2">
                      Key Characteristics:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#155437]" />
                        <span>Off-white to creamy grain</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#155437]" />
                        <span>Firm and separate when cooked</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#155437]" />
                        <span>Lighter colour than Golden Sella</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#155437]" />
                        <span>Reliable performance in bulk cooking</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-[#BDE3CF] space-y-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-1">
                      Ideal For
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Restaurants, biryani, pulao and markets that want sella performance with a whiter appearance.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#072B1F] mb-1">
                      Primary Export Markets
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      GCC fine-dining, European food service, high-volume restaurants.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </section>
        </div>

        {/* At a Glance Comparison Table */}
        <section className="mb-16 sm:mb-20">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#155437]">
              Technical Matrix
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#072B1F] mt-1">
              At a Glance Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Quick visual comparison across raw colour, cooked texture, and international destination markets.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#D5E5DC] overflow-hidden shadow-[0_10px_35px_rgba(7,43,31,0.05)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#FAF8F3] border-b border-[#D5E5DC] text-[#072B1F] font-bold">
                    <th className="py-4 px-5 sm:px-6 uppercase tracking-wider text-xs">
                      Process Type
                    </th>
                    <th className="py-4 px-5 sm:px-6 uppercase tracking-wider text-xs">
                      Colour (Raw)
                    </th>
                    <th className="py-4 px-5 sm:px-6 uppercase tracking-wider text-xs">
                      Cooked Texture
                    </th>
                    <th className="py-4 px-5 sm:px-6 uppercase tracking-wider text-xs">
                      Typical Markets
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D5E5DC]/60 font-medium text-slate-700">
                  {comparisonData.map((row) => (
                    <tr key={row.process} className="hover:bg-[#FAF8F3]/60 transition-colors">
                      <td className="py-4 px-5 sm:px-6 font-bold text-[#072B1F] whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 rounded-lg border text-xs ${row.bgTag}`}>
                          {row.process}
                        </span>
                      </td>
                      <td className="py-4 px-5 sm:px-6">{row.color}</td>
                      <td className="py-4 px-5 sm:px-6">{row.texture}</td>
                      <td className="py-4 px-5 sm:px-6">{row.markets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quality & Finishing Options */}
        <section className="mb-16 sm:mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B]">
              Custom Milling Specifications
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#072B1F] mt-1">
              Quality &amp; Finishing Options
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Beyond processing type, every order can be finished to the buyer&apos;s specification. These options apply across our White, Steam and Sella ranges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Polish Level Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D5E5DC] shadow-xs flex flex-col justify-between hover:border-[#CFA744] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5EF] border border-[#BDE3CF] flex items-center justify-center text-[#155437]">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#072B1F]">
                  Polish Level
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Polishing removes the remaining bran layer and decides how the grain looks and feels. We offer several polish levels to match market preferences:
                </p>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#D5E5DC]">
                    <span className="font-bold text-[#072B1F]">Single Polished:</span> a clean, natural finish suitable for everyday commercial use.
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#D5E5DC]">
                    <span className="font-bold text-[#072B1F]">Double Polished:</span> a brighter, smoother grain with enhanced market shelf appearance.
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#D5E5DC]">
                    <span className="font-bold text-[#072B1F]">Silky Polished:</span> our highest finish. The grain has a glossy, silky surface that gives a premium appearance, ideal for branded consumer retail packs.
                  </div>
                </div>
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-4 pt-3 border-t border-slate-100">
                Polish level specified per contract
              </p>
            </div>

            {/* Sortex Cleaning Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D5E5DC] shadow-xs flex flex-col justify-between hover:border-[#155437] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5EF] border border-[#BDE3CF] flex items-center justify-center text-[#155437]">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#072B1F]">
                  Sortex Cleaning
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every lot is passed through advanced Sortex optical colour-sorting machines. High-speed cameras detect and remove discoloured, chalky, damaged and foreign grains, along with stones and other impurities, one grain at a time.
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#155437] shrink-0" />
                    <span>Uniform colour and appearance across every bag</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#155437] shrink-0" />
                    <span>Removal of discoloured, damaged and chalky grains</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#155437] shrink-0" />
                    <span>Elimination of stones and foreign matter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#155437] shrink-0" />
                    <span>Consistent export-grade quality, lot after lot</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] font-mono text-[#155437] mt-4 pt-3 border-t border-slate-100 font-bold">
                Standard Optical Sorting Guarantee
              </p>
            </div>

            {/* Organic & EU-Compliant Lots */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D5E5DC] shadow-xs flex flex-col justify-between hover:border-[#CFA744] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5EF] border border-[#BDE3CF] flex items-center justify-center text-[#B8860B]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#072B1F]">
                  EU-Compliant &amp; Organic
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For buyers in markets with strict food safety rules, we offer specially managed lots grown and processed to meet demanding residue standards.
                </p>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#D5E5DC]">
                    <span className="font-bold text-[#072B1F]">EU-Compliant Lots (MRLs):</span> Sourced from selected growers following controlled agricultural practices. Every lot is lab-tested to verify pesticide residues comply with European Union Maximum Residue Limits.
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#D5E5DC]">
                    <span className="font-bold text-[#072B1F]">Organic Rice:</span> Grown without synthetic pesticides or chemical fertilisers, segregated throughout processing and packing to safeguard organic integrity.
                  </div>
                </div>
              </div>
              <p className="text-[11px] font-mono text-[#B8860B] mt-4 pt-3 border-t border-slate-100 font-semibold">
                SGS / Eurofins Certified Test Reports
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Band */}
        <div className="rounded-3xl bg-[#072B1F] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-[#CFA744]/30 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#CFA744] uppercase">
                Call to Action &bull; Export Milling Desk
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Looking for a Specific Processing Type or Polish Level?
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Contact our export team for detailed technical specifications, laboratory certificates, physical samples and pricing tailored to your destination market.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={onOpenQuote}
                className="bg-[#CFA744] hover:bg-[#B8860B] text-[#072B1F] font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer active:scale-95"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4 font-bold" />
              </button>

              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition text-center"
              >
                <span>Contact Export Desk</span>
                <ArrowRight className="w-4 h-4 text-[#CFA744]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
