import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Building2, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function TeamPage({ onOpenQuote }) {
  const teamMembers = [
    {
      name: 'Deval Raj',
      title: 'Managing Director and Trade Lead',
      email: 'd.raj@modularagro.com',
      bio: "Deval Raj spent eight years in corporate finance in the Netherlands, working with some of Europe's biggest industry leaders, and is a University of Amsterdam alumnus. He brings deal-closing expertise, sharp financial acumen and international business exposure to Modular, and knows how to get a good deal over the line.",
    },
    {
      name: 'Pir Ali Akbar Shah Jilani',
      title: 'Director, Sourcing and Investor Relations',
      email: 'a.jilani@modularagro.com',
      bio: 'Pir Ali Akbar Shah Jilani is an accomplished lawyer based in Karachi, with vast experience in deals, agriculture and real estate. He reads the fine print so the rest of us can enjoy the upside. At Modular he sources suppliers, shapes the deals and makes sure every agreement holds up.',
    },
    {
      name: 'Mala Raj',
      title: 'Director, Finance and Lead Generation',
      email: 'm.raj@modularagro.com',
      bio: 'Mala Raj is a trained finance officer with over five years of experience managing finances for investors and high net worth individuals. She also teaches privately and has driven sales and lead generation for UK-based companies. At Modular she keeps the funding and the leads flowing, with numbers that always add up.',
    },
    {
      name: 'Safdar Yousafzai',
      title: 'Director, Operations and Compliance',
      email: 's.yousafzai@modularagro.com',
      bio: 'Safdar Yousafzai has over seven years in rice trading, locally and internationally, plus dealing experience in minerals and real estate. When it comes to Karachi and Pakistan operations, he is the one who knows which mill to visit and who to call. At Modular he runs local supply operations and compliance.',
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
          <span className="text-[#072B1F] font-bold">Leadership &amp; Trade Desk</span>
        </div>

        {/* Hero Section with Side Image */}
        <div className="relative rounded-3xl bg-white border border-[#D5E5DC] p-6 sm:p-10 lg:p-12 mb-12 sm:mb-16 shadow-[0_15px_45px_rgba(7,43,31,0.06)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#EAF5EF] border border-[#BDE3CF] text-[#072B1F] text-xs font-bold uppercase tracking-wider">
                LEADERSHIP &amp; TRADE DESK
              </div>

              <h1 className="font-sans text-2xl xs:text-3xl sm:text-5xl font-extrabold text-[#072B1F] tracking-tight leading-[1.14]">
                The Minds Driving <br />
                <span className="text-[#155437]">Modular Traders &amp; Brokerage</span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                Based in Karachi, our leadership team combines European corporate finance acumen, accomplished legal deal-structuring, cross-border lead generation, and veteran Pakistani rice milling and export compliance.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-[#072B1F]">
                <div className="flex items-center gap-2 bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#D5E5DC]">
                  <Building2 className="w-3.5 h-3.5 text-[#155437]" />
                  <span>Karachi, Pakistan</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#D5E5DC]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Cultivating Trust</span>
                </div>
              </div>
            </div>

            {/* Right Side Image Banner */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5E5DC] shadow-md bg-[#072B1F]">
                <img
                  src="/images/products/sindh-basmati.jpg"
                  alt="Pakistani Agriculture & Rice Trade"
                  className="w-full h-[220px] xs:h-[260px] sm:h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#CFA744]">
                    Trade &amp; Sourcing Desk
                  </span>
                  <p className="text-xs text-white/90">
                    Karachi Port &amp; Mill Operations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Compact Team Member Profiles Grid */}
        <div className="mb-16 sm:mb-20">
          <div className="mb-6 pb-2 border-b border-[#D5E5DC]">
            <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#072B1F]">
              Executive Leadership
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Direct contacts for trade contracts, sourcing alliances, and compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="rounded-2xl bg-white border border-[#D5E5DC] p-5 sm:p-6 hover:border-[#155437]/60 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#072B1F]">
                    {member.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-[#155437] mt-1 mb-3">
                    {member.title}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#072B1F] hover:text-[#B8860B] transition"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#EAF5EF] text-[#155437] flex items-center justify-center">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span>{member.email}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Desk Contact Card */}
        <div className="rounded-2xl bg-[#072B1F] text-white p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-[#CFA744]/30 shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#CFA744] uppercase">
                Direct Corporate Inquiries &bull; info@modularagro.com
              </span>
              <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                Partner with Our Export Desk
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Have specific quality parameters, container volume requirements, or need verified pricing for Basmati, IRRI, or Parboiled Sella rice? Our leadership team personally reviews commercial inquiries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={onOpenQuote}
                className="bg-[#CFA744] hover:bg-[#B8860B] text-[#072B1F] font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer active:scale-95"
              >
                <span>Request Commercial Quote</span>
                <ArrowUpRight className="w-4 h-4 font-bold" />
              </button>

              <a
                href="mailto:info@modularagro.com"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition text-center"
              >
                <Mail className="w-4 h-4 text-[#CFA744]" />
                <span>info@modularagro.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
