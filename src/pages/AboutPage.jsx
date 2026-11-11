import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck,
  Ship,
  Award,
  Globe2,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Building2,
  Compass,
  HeartHandshake,
  Clock,
  Briefcase,
  Users,
  Search,
  Scale,
  Wheat,
  TrendingUp,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function AboutPage({ onOpenQuote }) {
  // 6 Core Values as required by client specifications
  const coreValues = siteConfig.coreValues;

  // 6 Main Business Activities (What We Do)
  const activities = siteConfig.activities;

  // 5-Step Working Process (How We Work)
  const workProcess = siteConfig.workProcess;

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF8F3] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            SECTION 1: About Us – Company Introduction
           ======================================================== */}
        <section className="mb-16 sm:mb-24">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-white border border-[#D5E5DC] p-8 sm:p-12 lg:p-14 shadow-[0_15px_45px_rgba(7,43,31,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Authentic Business Introduction */}
              <div className="lg:col-span-7 space-y-6">
                {/* Eyebrow Label */}
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[2px] bg-[#B8860B]" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
                    About Us &bull; Modular Traders and Brokerage
                  </span>
                </div>

                <h1 className="font-sans text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#072B1F] tracking-tight leading-[1.12]">
                  Agricultural Commodity Trading &amp; <br />
                  <span className="text-[#155437]">
                    International Rice Exports
                  </span>
                </h1>

                <div className="space-y-4 text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                  <p>
                    <strong>Modular Traders and Brokerage</strong> is an agricultural commodity trading and brokerage company
                    based in <strong>Karachi, Pakistan</strong>. We specialize in premium Pakistani rice sourcing, agricultural
                    commodity trading, and international rice export facilitation.
                  </p>
                  <p className="text-slate-600 font-normal">
                    Our company connects local agricultural producers, rice millers, and domestic suppliers with international
                    buyers, wholesalers, and food distributors around the world. We operate with an uncompromising commitment to
                    quality, transparency, reliability, and the development of long-term business relationships.
                  </p>
                </div>

                {/* Key Business Anchors */}
                <div className="space-y-2 pt-1 text-xs text-slate-700 font-medium">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#155437] mt-0.5 shrink-0" />
                    <span>Specializing in Pakistani Basmati, IRRI-6, IRRI-9, PK-348, Sindh D-98 &amp; Sella varieties</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#155437] mt-0.5 shrink-0" />
                    <span>Connecting global buyers with accredited millers and agricultural producers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#155437] mt-0.5 shrink-0" />
                    <span>Export dispatch via Karachi Port (KPT) and Port Muhammad Bin Qasim (PQ)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={onOpenQuote}
                    className="bg-[#072B1F] hover:bg-[#155437] text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition shadow-sm cursor-pointer"
                  >
                    <span>Request a Trade Quote</span>
                    <ArrowRight className="w-4 h-4 text-[#CFA744]" />
                  </button>

                  <div className="flex items-center gap-2 text-xs font-semibold text-[#155437] bg-[#EAF5EF] px-4 py-3 rounded-xl border border-[#BDE3CF]">
                    <MapPin className="w-4 h-4 text-[#B8860B]" />
                    <span>Karachi, Pakistan &bull; &ldquo;{siteConfig.tagline}&rdquo;</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Resolution Agricultural Showcase Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-[#D5E5DC] shadow-[0_15px_40px_rgba(7,43,31,0.12)] bg-[#072B1F]">
                  {/* High-Resolution Agricultural Harvest Image */}
                  <img
                    src="/images/about-harvest.jpg"
                    alt="Pakistani Rice Cultivation & Harvest"
                    className="w-full h-[420px] sm:h-[460px] object-cover"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#072B1F] shadow-sm">
                      Pakistani Provenance
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#072B1F]/90 text-[#CFA744] border border-[#155437]">
                      Export Desk
                    </span>
                  </div>

                  {/* Bottom Corporate Credential Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#072B1F]/90 backdrop-blur-md border border-white/15 text-white space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#CFA744]">
                        Modular Traders and Brokerage
                      </span>
                      <span className="text-[10px] text-slate-300 font-mono">
                        Karachi, PK
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-200">
                      <div>
                        <strong className="text-white block">Sourcing Origins:</strong>
                        <span>Punjab &amp; Sindh Basins</span>
                      </div>
                      <div>
                        <strong className="text-white block">Departure Ports:</strong>
                        <span>KPT &amp; Port Qasim (PQ)</span>
                      </div>
                    </div>

                    <div className="pt-1 text-[11px] text-emerald-300 font-medium italic text-center border-t border-white/10">
                      &ldquo;{siteConfig.tagline}&rdquo; &mdash; Connecting Local Mills with Global Trade
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: Who We Are
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-[#D5E5DC] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B]">
                  Business Identity
                </span>
                <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#072B1F] leading-tight">
                  Who We Are
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Modular Traders and Brokerage is an independent agritrade brokerage and commercial intermediation house
                  headquartered in Karachi, Pakistan&apos;s primary commercial and maritime center. Our core business identity
                  is grounded in serving as a professional, trustworthy facilitator between Pakistan&apos;s vast agricultural
                  production base and global commodity demand.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We are deeply committed to connecting Pakistan&apos;s agricultural sector &mdash; particularly its world-renowned
                  basmati and non-basmati rice crops grown across the Indus and Punjab river basins &mdash; with international
                  markets. Through our disciplined, professional approach to sourcing, market evaluation, commercial brokerage,
                  and export logistics coordination, we ensure that both buyers and sellers engage in clean, transparent, and
                  dependable commerce.
                </p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FAF8F3] p-6 rounded-2xl border border-[#EADBBD] space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5EF] text-[#155437] flex items-center justify-center font-bold">
                    <Wheat className="w-5 h-5 text-[#155437]" />
                  </div>
                  <h3 className="font-bold text-[#072B1F] text-sm">Pakistani Agri Focus</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dedicated specifically to representing Pakistan&apos;s finest agricultural yield with verifiable regional provenance.
                  </p>
                </div>

                <div className="bg-[#FAF8F3] p-6 rounded-2xl border border-[#EADBBD] space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5EF] text-[#155437] flex items-center justify-center font-bold">
                    <Globe2 className="w-5 h-5 text-[#CFA744]" />
                  </div>
                  <h3 className="font-bold text-[#072B1F] text-sm">International Reach</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Connecting domestic suppliers with verified buyers across the Middle East, Africa, Southeast Asia, and Europe.
                  </p>
                </div>

                <div className="bg-[#FAF8F3] p-6 rounded-2xl border border-[#EADBBD] space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5EF] text-[#155437] flex items-center justify-center font-bold">
                    <Scale className="w-5 h-5 text-[#155437]" />
                  </div>
                  <h3 className="font-bold text-[#072B1F] text-sm">Ethical Brokerage</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Transparent commercial negotiations, clear agency terms, and absolute integrity across every transaction.
                  </p>
                </div>

                <div className="bg-[#FAF8F3] p-6 rounded-2xl border border-[#EADBBD] space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5EF] text-[#155437] flex items-center justify-center font-bold">
                    <Ship className="w-5 h-5 text-[#CFA744]" />
                  </div>
                  <h3 className="font-bold text-[#072B1F] text-sm">Karachi Port Gateway</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct access to export loading berths at Karachi Port (KPT) and Port Muhammad Bin Qasim (PQ).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 3: What We Do
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold text-[#155437] bg-[#EAF5EF] border border-[#BDE3CF] mb-3">
              Core Operations
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#072B1F]">
              What We Do
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Our core business activities are structured to deliver seamless trade facilitation from Pakistani paddy fields
              to international destination seaports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act, idx) => (
              <div
                key={act.id}
                className="bg-white rounded-3xl p-7 border border-[#D5E5DC] shadow-sm hover:shadow-md transition relative group overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#EAF5EF] text-[#155437] flex items-center justify-center font-mono font-bold text-xs mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="font-sans text-lg font-bold text-[#072B1F] mb-2.5">
                    {act.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {act.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-mono font-bold text-[#155437]">
                  <span>Modular Traders Scope &bull; Service Pillar</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 4 & 5: Our Mission & Our Vision
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D5E5DC] shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5EF] border border-[#BDE3CF] flex items-center justify-center text-[#155437] mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B] block mb-2">
                  Our Purpose
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#072B1F] mb-4">
                  Our Mission
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  {siteConfig.mission}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-[#155437] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#155437]" />
                <span>Tagline: &ldquo;{siteConfig.tagline}&rdquo;</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D5E5DC] shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FDF7E5] border border-[#EADBBD] flex items-center justify-center text-[#B8860B] mb-6">
                  <Globe2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#155437] block mb-2">
                  Our Global Horizon
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#072B1F] mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  {siteConfig.vision}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-[#B8860B] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#CFA744]" />
                <span>Ethical Trade &bull; Reliability &bull; Consistency</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 6: Our Core Values (6 Specific Values)
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold text-[#155437] bg-[#EAF5EF] border border-[#BDE3CF] mb-3">
              Guiding Principles
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#072B1F]">
              Our Core Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              The foundational pillars that govern our business conduct, partner relations, and commercial brokerage operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val) => (
              <div
                key={val.id}
                className="bg-white rounded-3xl p-7 border border-[#D5E5DC] shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#B8860B] bg-[#FAF8F3] px-2.5 py-1 rounded-full border border-[#EADBBD]">
                      VALUE {val.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#155437]" />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-[#072B1F] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs font-mono text-[#155437] font-semibold mb-3">
                    {val.summary}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 7: How We Work (5-Step General Business Process)
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 border border-[#D5E5DC] shadow-sm">
            <div className="max-w-2xl mb-12">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold text-[#155437] bg-[#EAF5EF] border border-[#BDE3CF] mb-3">
                Operational Methodology
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#072B1F]">
                How We Work
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                A simple, structured five-step business process designed to provide international buyers and domestic suppliers with
                clarity, transparency, and seamless trade coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {workProcess.map((item) => (
                <div key={item.step} className="relative space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold text-[#CFA744] bg-[#FAF8F3] px-2.5 py-1 rounded-full border border-[#EADBBD]">
                      STEP {item.step}
                    </span>
                    <div className="h-[2px] flex-1 bg-slate-100 hidden md:block" />
                  </div>

                  <h3 className="font-sans text-sm font-bold text-[#072B1F]">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 8: Why Choose Modular Traders and Brokerage?
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="bg-gradient-to-br from-[#072B1F] via-[#0D3828] to-[#155437] rounded-[2.5rem] p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-3xl mb-10 relative z-10">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#CFA744] bg-white/10 border border-white/20 mb-3">
                Value Proposition
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white">
                Why Choose Modular Traders and Brokerage?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Our business positioning is built on documented strengths and a professional, transparent trading approach.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              <div className="bg-[#0D3828] rounded-xl p-6 border border-[#1B6248] space-y-2.5">
                <div className="text-[#CFA744] font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Focus on Pakistani Rice
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Specialized knowledge of Pakistan&apos;s primary rice varieties &mdash; from Super Kernel Basmati to IRRI-6, IRRI-9, PK-348, Sindh D-98, and Parboiled Sella.
                </p>
              </div>

              <div className="bg-[#0D3828] rounded-xl p-6 border border-[#1B6248] space-y-2.5">
                <div className="text-[#CFA744] font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Global Trading Approach
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Active engagement across key international destination markets with structured trade coordination and professional communication standards.
                </p>
              </div>

              <div className="bg-[#0D3828] rounded-xl p-6 border border-[#1B6248] space-y-2.5">
                <div className="text-[#CFA744] font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Transparent Brokerage
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Clear, honest commercial mediation with no hidden markups, straightforward terms, and complete contractual transparency for all parties.
                </p>
              </div>

              <div className="bg-[#0D3828] rounded-xl p-6 border border-[#1B6248] space-y-2.5">
                <div className="text-[#CFA744] font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Quality-Focused Sourcing
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Partnering strictly with verified millers who meet agreed product specifications, proper milling standards, and buyer quality benchmarks.
                </p>
              </div>

              <div className="bg-[#0D3828] rounded-xl p-6 border border-[#1B6248] space-y-2.5">
                <div className="text-[#CFA744] font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Dependable Relationships
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Committed to building long-term, mutually beneficial commercial partnerships based on trust, consistency, and honorable trade conduct.
                </p>
              </div>

              <div className="bg-[#0D3828] rounded-xl p-6 border border-[#1B6248] space-y-2.5">
                <div className="text-[#CFA744] font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Karachi Seaport Berths
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Direct operational positioning in Karachi with access to Karachi Port (KPT) and Port Muhammad Bin Qasim (PQ) for efficient export dispatch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 9: Call to Action
           ======================================================== */}
        <section>
          <div className="rounded-3xl p-8 sm:p-12 bg-white border border-[#D5E5DC] text-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                Start a Commercial Conversation
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#072B1F]">
                Connect With Modular Traders and Brokerage
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We invite international buyers, rice importers, wholesalers, and agricultural commodity distributors
                worldwide to contact our Karachi trading desk to discuss rice sourcing, volume requirements, and cross-border brokerage opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={onOpenQuote}
                className="bg-[#072B1F] hover:bg-[#155437] text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-sm text-center cursor-pointer"
              >
                Request a Quote
              </button>

              <Link
                to="/contact"
                className="bg-[#FAF8F3] hover:bg-[#FAF8F3]/80 text-[#072B1F] border border-[#D5E5DC] px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center transition text-center"
              >
                Contact Our Office
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
