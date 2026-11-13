import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Shield, PhoneCall } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Rice Varieties', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Floating Pill Header - Direct Match to Uploaded Mockup */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-[500] px-3 sm:px-6 pointer-events-none">
        <div className="max-w-[1360px] mx-auto pointer-events-auto">
          <div
            className={`w-full bg-white/95 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-2.5 transition-all duration-300 flex items-center justify-between border ${
              scrolled
                ? 'shadow-[0_12px_35px_rgba(7,43,31,0.12)] border-[#D5E5DC]'
                : 'shadow-[0_6px_25px_rgba(7,43,31,0.06)] border-[#D5E5DC]/80'
            }`}
          >
            {/* Left: Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <img
                src="/brand/logo-full.png"
                alt="Modular Traders and Brokerage"
                className="h-7 xs:h-8 sm:h-11 max-w-[145px] xs:max-w-[180px] sm:max-w-none w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            {/* Center: Desktop Navigation Pills */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? location.pathname === '/' && !location.hash
                    : location.pathname === link.href || (link.href.includes('#') && location.hash === link.href.split('#')[1]);

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-normal transition-all duration-200 ${
                      isActive
                        ? 'text-[#072B1F] bg-[#EFECE6] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-[#072B1F] hover:bg-[#FAF8F3]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Admin Link + Signature Pill Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-[#072B1F] hover:bg-slate-100 transition"
              >
                <Shield className="w-3.5 h-3.5 text-[#CFA744]" />
                <span>Admin</span>
              </Link>

              {/* Signature Dark Green Pill with Circular Gold Arrow Icon */}
              <button
                onClick={onOpenQuote}
                className="group bg-[#072B1F] hover:bg-[#0D3E2D] text-white pl-4 pr-1.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2.5 transition shadow-sm active:scale-95"
              >
                <span>Request a Quote</span>
                <span className="w-6 h-6 rounded-full bg-[#CFA744] text-[#072B1F] flex items-center justify-center transition-transform group-hover:rotate-45 font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            {/* Mobile Toggle Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Link
                to="/admin"
                className="p-1.5 rounded-full text-slate-700 bg-slate-100 text-xs"
              >
                <Shield className="w-4 h-4 text-[#CFA744]" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[480] bg-black/40 backdrop-blur-xs md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              className="fixed top-[68px] sm:top-20 left-3 right-3 sm:left-4 sm:right-4 z-[490] bg-white rounded-3xl shadow-2xl border border-[#D5E5DC] p-5 sm:p-6 md:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex justify-center pb-3 border-b border-slate-100">
                  <img src="/brand/logo-full.png" alt="Modular Traders" className="h-8 w-auto object-contain" />
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm sm:text-base font-semibold text-slate-900 py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between transition"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}

                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenQuote();
                    }}
                    className="w-full bg-[#072B1F] hover:bg-[#155437] text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                  >
                    <span>Request a Quote</span>
                    <ArrowUpRight className="w-4 h-4 text-[#CFA744]" />
                  </button>

                  <a
                    href={`https://wa.me/${siteConfig.contact.phones.whatsappClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#EAF5EF] hover:bg-[#D5E5DC] text-[#072B1F] border border-[#BDE3CF] font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>WhatsApp: {siteConfig.contact.phones.primary}</span>
                  </a>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-2.5 pt-1">
                    <a
                      href={siteConfig.contact.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] flex items-center justify-center transition"
                      aria-label="WhatsApp"
                      title="Chat on WhatsApp"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                    </a>

                    <a
                      href={siteConfig.contact.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#EAF5EF] text-slate-700 hover:text-[#072B1F] flex items-center justify-center transition"
                      aria-label="Instagram"
                      title="Follow on Instagram"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    <a
                      href={siteConfig.contact.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#EAF5EF] text-slate-700 hover:text-[#072B1F] flex items-center justify-center transition"
                      aria-label="Facebook"
                      title="Follow on Facebook"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
