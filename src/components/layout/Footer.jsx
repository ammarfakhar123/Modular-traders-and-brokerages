import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowUpRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer({ onOpenQuote }) {
  return (
    <footer id="contact" className="bg-[#FAF8F3] text-slate-800 border-t border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <Link to="/" className="inline-block">
              <img
                src="/brand/logo-full.png"
                alt="Modular Traders and Brokerage"
                className="h-10 sm:h-12 w-auto object-contain mx-auto md:mx-0"
              />
            </Link>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              &ldquo;{siteConfig.tagline}&rdquo; &mdash; {siteConfig.description}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-2 pt-1 text-xs text-[#072B1F] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#155437] shrink-0" />
              <span>Est. {siteConfig.establishedYear} &bull; Karachi HQ &bull; Export Dispatch via KPT &amp; Port Qasim</span>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={onOpenQuote}
                className="group bg-[#072B1F] hover:bg-[#155437] text-white pl-5 pr-2 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2.5 transition shadow-sm active:scale-95 cursor-pointer"
              >
                <span>Request an Export Quote</span>
                <span className="w-6 h-6 rounded-full bg-[#CFA744] text-[#072B1F] flex items-center justify-center transition-transform group-hover:rotate-45 font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>

              {/* Social Media Icons */}
              <div className="flex items-center gap-1.5">
                <a
                  href={siteConfig.contact.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  title="Follow Modular Traders on Instagram"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#EAF5EF] border border-[#D5E5DC] hover:border-[#155437] text-slate-700 hover:text-[#072B1F] flex items-center justify-center transition-all shadow-2xs hover:scale-105 cursor-pointer"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href={siteConfig.contact.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  title="Follow Modular Traders on Facebook"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#EAF5EF] border border-[#D5E5DC] hover:border-[#155437] text-slate-700 hover:text-[#072B1F] flex items-center justify-center transition-all shadow-2xs hover:scale-105 cursor-pointer"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href={siteConfig.contact.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  title="Chat with Modular Traders on WhatsApp"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#EAF5EF] border border-[#D5E5DC] hover:border-emerald-600 text-slate-700 hover:text-emerald-600 flex items-center justify-center transition-all shadow-2xs hover:scale-105 cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-xs font-bold text-[#072B1F] tracking-wider uppercase mb-4 border-b border-[#D5E5DC] pb-2 text-center md:text-left">
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
                  All 12 Rice Varieties
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-[#072B1F] transition">
                  Contact Desk
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-[#072B1F] hover:text-[#155437] transition inline-flex items-center justify-center md:justify-start gap-1 font-bold">
                  Admin Portal <ArrowUpRight className="w-3 h-3 text-[#CFA744]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-xs font-bold text-[#072B1F] tracking-wider uppercase mb-4 border-b border-[#D5E5DC] pb-2 text-center md:text-left">
              Export Portfolios
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <Link to="/products/1121-basmati-rice" className="hover:text-[#072B1F] transition">
                  1121 Basmati Rice
                </Link>
              </li>
              <li>
                <Link to="/products/super-kernel-basmati-rice" className="hover:text-[#072B1F] transition">
                  Super Kernel Basmati Rice
                </Link>
              </li>
              <li>
                <Link to="/products/pk-385-basmati-rice" className="hover:text-[#072B1F] transition">
                  PK-385 Basmati Rice
                </Link>
              </li>
              <li>
                <Link to="/products/irri-6-long-grain-white-rice" className="hover:text-[#072B1F] transition">
                  IRRI-6 Long Grain White Rice
                </Link>
              </li>
              <li>
                <Link to="/products/irri-9-c9-long-grain-rice" className="hover:text-[#072B1F] transition">
                  IRRI-9 / C9 Long Grain Rice
                </Link>
              </li>
              <li>
                <Link to="/products/pk-386-long-grain-white-rice" className="hover:text-[#072B1F] transition">
                  PK-386 Long Grain White Rice
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-[#155437] font-semibold hover:text-[#072B1F] transition inline-block">
                  View All 12 Export Varieties &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Centralized Headquarters & Direct Contact */}
          <div className="space-y-3.5 text-center md:text-left flex flex-col items-center md:items-start">
            <h4 className="font-sans text-xs font-bold text-[#072B1F] tracking-wider uppercase mb-4 border-b border-[#D5E5DC] pb-2 w-full text-center md:text-left">
              Trading Desk
            </h4>

            <div className="text-xs text-slate-600 flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-2">
              <MapPin className="w-4 h-4 text-[#155437] mt-0.5 flex-shrink-0" />
              <div className="text-center md:text-left">
                <span className="text-[#072B1F] font-bold block">Headquarters:</span>
                <span>{siteConfig.contact.headquarters.displayAddress}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-2">
              <Phone className="w-4 h-4 text-[#155437] mt-0.5 flex-shrink-0" />
              <div className="text-center md:text-left">
                <span className="text-[#072B1F] font-bold block">Desk Direct:</span>
                <a
                  href={`tel:${siteConfig.contact.phones.whatsappClean}`}
                  className="font-mono text-slate-800 hover:text-[#155437] font-semibold"
                >
                  {siteConfig.contact.phones.primary}
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-600 flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-2">
              <Mail className="w-4 h-4 text-[#155437] mt-0.5 flex-shrink-0" />
              <div className="text-center md:text-left">
                <span className="text-[#072B1F] font-bold block">Trade Email:</span>
                <a
                  href="mailto:info@modularagro.com"
                  className="font-mono text-slate-800 hover:text-[#155437] font-semibold"
                >
                  info@modularagro.com
                </a>
              </div>
            </div>

            <div className="pt-1 flex flex-col items-center md:items-start gap-2 w-full">
              <a
                href={siteConfig.contact.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs font-bold text-[#155437] hover:text-[#072B1F] bg-[#EAF5EF] px-3.5 py-1.5 rounded-full border border-[#BDE3CF] transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#1B6248]" />
                <span>WhatsApp Brokerage Desk</span>
              </a>

              <div className="flex items-center justify-center md:justify-start gap-2 pt-0.5">
                <a
                  href={siteConfig.contact.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 hover:text-[#072B1F] bg-white hover:bg-[#EAF5EF] px-3 py-1.5 rounded-full border border-[#D5E5DC] transition shadow-2xs"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  href={siteConfig.contact.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 hover:text-[#072B1F] bg-white hover:bg-[#EAF5EF] px-3 py-1.5 rounded-full border border-[#D5E5DC] transition shadow-2xs"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#D5E5DC] flex flex-col sm:flex-row items-center justify-center sm:justify-between text-xs text-slate-500 gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-center sm:text-left">
            &copy; {siteConfig.establishedYear} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-col xs:flex-row items-center justify-center sm:justify-start gap-2 xs:gap-6 text-center sm:text-left">
            <span>DHA Phase 6, Karachi &bull; KPT &amp; Port Qasim Dispatch</span>
            <span className="text-[#072B1F] font-semibold">Agricultural Commodity Trading &amp; Brokerage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
