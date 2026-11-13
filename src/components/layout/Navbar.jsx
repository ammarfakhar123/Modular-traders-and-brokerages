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

                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-[11px] font-semibold text-slate-500 hover:text-[#072B1F] py-1"
                  >
                    Admin Portal Login &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
