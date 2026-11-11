import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowUpRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer({ onOpenQuote }) {
  return (
    <footer id="contact" className="bg-[#FAF8F3] text-slate-800 border-t border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/brand/logo-full.png"
                alt="Modular Traders and Brokerage"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              &ldquo;{siteConfig.tagline}&rdquo; &mdash; {siteConfig.description}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-[#072B1F] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#155437]" />
              <span>Est. {siteConfig.establishedYear} &bull; Karachi HQ &bull; Export Dispatch via KPT &amp; Port Qasim</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="group bg-[#072B1F] hover:bg-[#155437] text-white pl-5 pr-2 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2.5 transition shadow-sm active:scale-95"
              >
                <span>Request an Export Quote</span>
                <span className="w-6 h-6 rounded-full bg-[#CFA744] text-[#072B1F] flex items-center justify-center transition-transform group-hover:rotate-45 font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-sans text-xs font-bold text-[#072B1F] tracking-wider uppercase mb-4 border-b border-[#D5E5DC] pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/" className="text-slate-600 hover:text-[#072B1F] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-[#072B1F] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-600 hover:text-[#072B1F] transition">
                  All 7 Rice Varieties
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-[#072B1F] transition">
                  Contact Desk
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-[#072B1F] hover:text-[#155437] transition inline-flex items-center gap-1 font-bold">
                  Admin Portal <ArrowUpRight className="w-3 h-3 text-[#CFA744]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-sans text-xs font-bold text-[#072B1F] tracking-wider uppercase mb-4 border-b border-[#D5E5DC] pb-2">
              Export Portfolios
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <Link to="/products/super-kernel-basmati-rice" className="hover:text-[#072B1F] transition">
                  Super Kernel Basmati Rice
                </Link>
              </li>
              <li>
                <Link to="/products/irri-6-long-grain-white-rice" className="hover:text-[#072B1F] transition">
                  IRRI-6 Long Grain White Rice
                </Link>
              </li>
              <li>
                <Link to="/products/irri-9-long-grain-rice" className="hover:text-[#072B1F] transition">
                  IRRI-9 Long Grain Rice
                </Link>
              </li>
              <li>
                <Link to="/products/pk-348-long-grain-rice" className="hover:text-[#072B1F] transition">
                  PK-348 Long Grain Rice
                </Link>
              </li>
              <li>
                <Link to="/products/sindh-basmati-d-98-rice" className="hover:text-[#072B1F] transition">
                  Sindh Basmati / D-98 Rice
                </Link>
              </li>
              <li>
                <Link to="/products/irri-6-pk-parboiled-sella-rice" className="hover:text-[#072B1F] transition">
                  IRRI-6 / PK Parboiled (Sella)
                </Link>
              </li>
              <li>
                <Link to="/products/global-cross-border-sourcing-brokerage" className="text-[#155437] font-semibold hover:text-[#072B1F] transition">
                  Cross-Border Sourcing &amp; Brokerage
                </Link>
              </li>
            </ul>
          </div>

          {/* Centralized Working Hours & Contact */}
          <div className="space-y-3.5">
            <h4 className="font-sans text-xs font-bold text-[#072B1F] tracking-wider uppercase mb-4 border-b border-[#D5E5DC] pb-2">
              Trading Desk
            </h4>

            <div className="text-xs text-slate-600 flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#CFA744] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[#072B1F] font-bold block">Trading Hours:</span>
                <span>{siteConfig.workingHours.fullDisplay}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#155437] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[#072B1F] font-bold block">Headquarters:</span>
                <span>{siteConfig.contact.headquarters.displayAddress}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 flex items-start gap-2">
              <Phone className="w-4 h-4 text-[#155437] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[#072B1F] font-bold block">Desk Direct:</span>
                <span>{siteConfig.contact.phones.primary}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 flex items-start gap-2">
              <Mail className="w-4 h-4 text-[#155437] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[#072B1F] font-bold block">Trade Email:</span>
                <span>{siteConfig.contact.emails.inquiries}</span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href={siteConfig.contact.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#155437] hover:text-[#072B1F] bg-[#EAF5EF] px-3.5 py-1.5 rounded-full border border-[#BDE3CF] transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#1B6248]" />
                <span>WhatsApp Brokerage Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#D5E5DC] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {siteConfig.establishedYear} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>DHA Phase 6, Karachi &bull; KPT &amp; Port Qasim Dispatch</span>
            <span className="text-[#072B1F] font-semibold">Agricultural Commodity Trading &amp; Brokerage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
