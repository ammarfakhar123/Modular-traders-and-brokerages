import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Scale,
  Award,
  TrendingUp,
  MapPin,
  Building2,
  FileCheck2,
  ArrowUpRight,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function TeamPage({ onOpenQuote }) {
  const teamMembers = [
    {
      name: 'Deval Raj',
      title: 'Managing Director and Trade Lead',
      email: 'd.raj@modularagro.com',
      initials: 'DR',
      roleBadge: 'Leadership & Trade Lead',
      bio: "Deval Raj spent eight years in corporate finance in the Netherlands, working with some of Europe's biggest industry leaders, and is a University of Amsterdam alumnus. He brings deal-closing expertise, sharp financial acumen and international business exposure to Modular, and knows how to get a good deal over the line.",
      expertise: [
        'European Corporate Finance',
        'University of Amsterdam Alumnus',
        'International Trade Deals',
        'Commercial Negotiation',
      ],
      accentColor: '#155437',
    },
    {
      name: 'Pir Ali Akbar Shah Jilani',
      title: 'Director, Sourcing and Investor Relations',
      email: 'a.jilani@modularagro.com',
      initials: 'AJ',
      roleBadge: 'Legal Counsel & Sourcing',
      bio: 'Pir Ali Akbar Shah Jilani is an accomplished lawyer based in Karachi, with vast experience in deals, agriculture and real estate. He reads the fine print so the rest of us can enjoy the upside. At Modular he sources suppliers, shapes the deals and makes sure every agreement holds up.',
      expertise: [
        'Commercial Agri Contracts',
        'Karachi Legal Jurisdiction',
        'Supplier Network Sourcing',
        'Investor Relations',
      ],
      accentColor: '#CFA744',
    },
    {
      name: 'Mala Raj',
      title: 'Director, Finance and Lead Generation',
      email: 'm.raj@modularagro.com',
      initials: 'MR',
      roleBadge: 'Finance & Growth',
      bio: 'Mala Raj is a trained finance officer with over five years of experience managing finances for investors and high net worth individuals. She also teaches privately and has driven sales and lead generation for UK-based companies. At Modular she keeps the funding and the leads flowing, with numbers that always add up.',
      expertise: [
        'Investor Capital Management',
        'UK & Global Lead Generation',
        'Trade Working Capital',
        'Cashflow & Settlement',
      ],
      accentColor: '#155437',
    },
    {
      name: 'Safdar Yousafzai',
      title: 'Director, Operations and Compliance',
      email: 's.yousafzai@modularagro.com',
      initials: 'SY',
      roleBadge: 'Operations & Mill Compliance',
      bio: 'Safdar Yousafzai has over seven years in rice trading, locally and internationally, plus dealing experience in minerals and real estate. When it comes to Karachi and Pakistan operations, he is the one who knows which mill to visit and who to call. At Modular he runs local supply operations and compliance.',
      expertise: [
        '7+ Years Rice Trading',
        'Sindh & Punjab Mill Audits',
        'Karachi Port Loading Berths',
        'Export Quality Compliance',
      ],
      accentColor: '#CFA744',
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

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-white border border-[#D5E5DC] p-6 sm:p-12 lg:p-14 mb-12 sm:mb-16 shadow-[0_15px_45px_rgba(7,43,31,0.06)] overflow-hidden">
          {/* Subtle Ambient Elements */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#EAF5EF] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#CFA744]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5EF] border border-[#BDE3CF] text-[#072B1F] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Leadership &amp; Trade Desk</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#072B1F] tracking-tight leading-[1.12] mb-4">
              The Minds Driving <br />
              <span className="text-[#155437]">Modular Traders &amp; Brokerage</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Based in Karachi, our leadership team combines European corporate finance acumen, accomplished legal deal-structuring, cross-border lead generation, and veteran Pakistani rice milling and export compliance. Together, we deliver transparent, rock-solid execution for global agricultural importers.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#072B1F]">
              <div className="flex items-center gap-2 bg-[#FAF8F3] px-3.5 py-2 rounded-xl border border-[#D5E5DC]">
                <Building2 className="w-4 h-4 text-[#155437]" />
                <span>Headquartered in Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F3] px-3.5 py-2 rounded-xl border border-[#D5E5DC]">
                <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                <span>Ethical Trading &bull; Cultivating Trust</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Team Member Profiles Grid */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#D5E5DC]">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#072B1F]">
                Executive Leadership
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Direct contacts for trade contracts, sourcing alliances, and compliance
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#B8860B]">
              <span>4 Directors</span>
              <span>&bull;</span>
              <span>100% In-House Verification</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-white border border-[#D5E5DC] p-6 sm:p-8 hover:border-[#CFA744] hover:shadow-[0_20px_45px_rgba(7,43,31,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Initials Badge & Direct Role */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      {/* Stylized Luxury Monogram */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#072B1F] to-[#155437] text-[#CFA744] font-serif font-bold text-xl sm:text-2xl flex items-center justify-center shadow-md border-2 border-[#CFA744]/40 shrink-0 group-hover:scale-105 transition-transform">
                        {member.initials}
                      </div>
                      <div>
                        <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#B8860B] bg-[#FAF8F3] px-2.5 py-1 rounded-full border border-[#D5E5DC] mb-1">
                          {member.roleBadge}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#072B1F] group-hover:text-[#155437] transition-colors">
                          {member.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Official Title */}
                  <p className="text-xs sm:text-sm font-semibold text-[#155437] mb-4 pb-3 border-b border-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CFA744]" />
                    {member.title}
                  </p>

                  {/* Full Bio */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                    {member.bio}
                  </p>

                  {/* Strategic Focus Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {member.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium bg-[#FAF8F3] text-slate-700 px-2.5 py-1 rounded-lg border border-[#D5E5DC]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Email Action Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#072B1F] hover:text-[#B8860B] transition group/email"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#EAF5EF] text-[#155437] flex items-center justify-center group-hover/email:bg-[#072B1F] group-hover/email:text-[#CFA744] transition">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span>{member.email}</span>
                  </a>

                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
                    Karachi Desk
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Desk Contact Card */}
        <div className="rounded-3xl bg-[#072B1F] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-[#CFA744]/30 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#CFA744] uppercase">
                Direct Corporate Inquiries &bull; info@modularagro.com
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Partner with Our Export Desk
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Have specific quality parameters, container volume requirements, or need verified pricing for Basmati, IRRI, or Parboiled Sella rice? Our leadership team personally reviews commercial inquiries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={onOpenQuote}
                className="bg-[#CFA744] hover:bg-[#B8860B] text-[#072B1F] font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer active:scale-95"
              >
                <span>Request Commercial Quote</span>
                <ArrowUpRight className="w-4 h-4 font-bold" />
              </button>

              <a
                href="mailto:info@modularagro.com"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition text-center"
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
