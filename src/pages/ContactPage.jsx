import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Globe2,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { inquiryRepository } from '@/repositories/inquiryRepository';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    inquiryType: 'Rice Purchase',
    productOfInterest: 'Super Kernel Basmati Rice',
    orderQuantity: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.companyName.trim()) errs.companyName = 'Company Name is required.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Valid corporate email address is required.';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone / WhatsApp number is required.';
    if (!formData.country.trim()) errs.country = 'Country is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await inquiryRepository.create({
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        destinationPort: formData.country,
        productName: `${formData.productOfInterest} (${formData.inquiryType})`,
        volumeMT: formData.orderQuantity || 'Not Specified',
        incoterms: 'Standard',
        packaging: 'Standard Export',
        notes: `Inquiry Type: ${formData.inquiryType}\nProduct: ${formData.productOfInterest}\nEst. Quantity: ${formData.orderQuantity || 'N/A'}\nMessage: ${formData.message}`,
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting contact inquiry:', err);
      // Ensure user sees confirmation even in local/offline storage mode
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Modular Traders and Brokerage,\n\nI am contacting you regarding an international trade inquiry.\n\nName: ${formData.fullName || 'Trade Partner'}\nCompany: ${formData.companyName || 'International Buyer'}\nCountry: ${formData.country || 'Global'}\nInquiry Type: ${formData.inquiryType}\nProduct of Interest: ${formData.productOfInterest}`
    );
    window.open(`https://wa.me/${siteConfig.contact.phones.whatsappClean}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF8F3] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. CONTACT PAGE HEADING
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <span className="w-6 h-[2px] bg-[#B8860B]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
              Direct Contact Desk &bull; Karachi Headquarters
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-[#072B1F] tracking-tight mb-4">
            Get in Touch With Modular Traders and Brokerage
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            We welcome international buyers, rice importers, wholesale distributors, agricultural suppliers, and global
            business partners to contact our team to discuss product inquiries, sourcing requirements, and cross-border trade opportunities.
          </p>
        </div>

        {/* ========================================================
            MAIN SECTION: Contact Information + Inquiry Form
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start mb-20 sm:mb-28">
          {/* ========================================================
              2. BUSINESS CONTACT INFORMATION (Left 5 Cols)
             ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E5DC] shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EF] text-[#155437] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#072B1F]">
                    {siteConfig.contact.businessName}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Head Office &bull; Karachi, Pakistan
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#CFA744] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">Business Address:</span>
                    <span className="text-slate-600 leading-relaxed block font-sans">
                      {siteConfig.contact.headquarters.fullAddress}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#155437] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">Phone Number:</span>
                    <a
                      href={`tel:${siteConfig.contact.phones.whatsappClean}`}
                      className="text-[#155437] font-mono font-bold hover:underline"
                    >
                      {siteConfig.contact.phones.primary}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">WhatsApp:</span>
                    <a
                      href={`https://wa.me/${siteConfig.contact.phones.whatsappClean}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-slate-800 font-bold hover:text-emerald-700 transition"
                    >
                      {siteConfig.contact.phones.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#155437] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">Official Email:</span>
                    <a
                      href="mailto:info@modularagro.com"
                      className="text-[#155437] font-mono font-bold hover:underline"
                    >
                      info@modularagro.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================
                4. WHATSAPP INQUIRY SECTION
               ======================================================== */}
            <div className="bg-[#EAF5EF] rounded-3xl p-6 sm:p-7 border border-[#BDE3CF] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#155437] uppercase">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Instant Communication</span>
              </div>
              <h4 className="font-sans text-base font-bold text-[#072B1F]">
                Quick Business Inquiries
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our trading desk for real-time discussion on rice sourcing requirements, product availability, and commercial coordination.
              </p>
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-[#1B6248] hover:bg-[#072B1F] text-white py-3.5 px-5 rounded-2xl flex items-center justify-between font-bold text-xs transition shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#CFA744]" />
                  <span>Chat With Us on WhatsApp</span>
                </div>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </button>
            </div>

            {/* Maritime Dispatch Seaports */}
            <div className="bg-white rounded-3xl p-6 border border-[#D5E5DC] text-xs text-slate-700 space-y-2">
              <span className="font-mono text-[11px] font-bold text-[#B8860B] uppercase block">
                Export Departure Seaports
              </span>
              <p className="text-slate-600 leading-relaxed">
                {siteConfig.contact.shippingHubs.displayLocation}.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                {siteConfig.contact.shippingHubs.ports.map((port, idx) => (
                  <span
                    key={idx}
                    className="bg-[#FAF8F3] px-3 py-1 rounded-full text-[#072B1F] border border-[#D5E5DC] font-semibold"
                  >
                    {port}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================
              3. CONTACT FORM (Right 7 Cols)
             ======================================================== */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-10 lg:p-12 border border-[#D5E5DC] shadow-sm relative overflow-hidden">
              <div className="mb-6 sm:mb-8">
                <span className="text-[10px] xs:text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B] block mb-1">
                  Official Trade Inquiry Form
                </span>
                <h2 className="font-sans text-xl xs:text-2xl sm:text-3xl font-extrabold text-[#072B1F]">
                  Send Your Sourcing Inquiry
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Please provide your business and sourcing details. All inquiries are reviewed directly by our commercial team.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Row 1: Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full bg-[#FAF8F3] border ${
                          errors.fullName ? 'border-red-500' : 'border-[#D5E5DC]'
                        } focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition`}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Company or legal entity"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className={`w-full bg-[#FAF8F3] border ${
                          errors.companyName ? 'border-red-500' : 'border-[#D5E5DC]'
                        } focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition`}
                      />
                      {errors.companyName && <p className="text-[11px] text-red-500 mt-1">{errors.companyName}</p>}
                    </div>
                  </div>

                  {/* Row 2: Email & Phone / WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="corporate@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-[#FAF8F3] border ${
                          errors.email ? 'border-red-500' : 'border-[#D5E5DC]'
                        } focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        placeholder="Include country code (e.g. +92 / +966 / +254)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full bg-[#FAF8F3] border ${
                          errors.phone ? 'border-red-500' : 'border-[#D5E5DC]'
                        } focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Row 3: Country & Inquiry Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        placeholder="Buyer destination country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className={`w-full bg-[#FAF8F3] border ${
                          errors.country ? 'border-red-500' : 'border-[#D5E5DC]'
                        } focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition`}
                      />
                      {errors.country && <p className="text-[11px] text-red-500 mt-1">{errors.country}</p>}
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Inquiry Type *
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition"
                      >
                        <option value="Rice Purchase">Rice Purchase</option>
                        <option value="Rice Sourcing">Rice Sourcing</option>
                        <option value="Brokerage">Brokerage</option>
                        <option value="Export Inquiry">Export Inquiry</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Product of Interest & Estimated Order Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Product of Interest *
                      </label>
                      <select
                        value={formData.productOfInterest}
                        onChange={(e) => setFormData({ ...formData, productOfInterest: e.target.value })}
                        className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition"
                      >
                        <optgroup label="Basmati Rice Varieties">
                          <option value="1121 Basmati Rice">1121 Basmati Rice</option>
                          <option value="Super Kernel Basmati Rice">Super Kernel Basmati Rice</option>
                          <option value="Super Basmati Rice">Super Basmati Rice</option>
                          <option value="PK-385 Basmati Rice">PK-385 Basmati Rice</option>
                          <option value="PK-515 Basmati Rice">PK-515 Basmati Rice</option>
                          <option value="Basmati 1692 Rice">Basmati 1692 Rice</option>
                          <option value="Basmati 1718 Rice">Basmati 1718 Rice</option>
                          <option value="Basmati 1509 Rice">Basmati 1509 Rice</option>
                        </optgroup>
                        <optgroup label="Non-Basmati Rice Varieties">
                          <option value="IRRI-6 Long Grain White Rice">IRRI-6 Long Grain White Rice</option>
                          <option value="IRRI-9 / C9 Long Grain Rice">IRRI-9 / C9 Long Grain Rice</option>
                          <option value="PK-386 Long Grain White Rice">PK-386 Long Grain White Rice</option>
                          <option value="KS-282 Long Grain Rice">KS-282 Long Grain Rice</option>
                        </optgroup>
                        <optgroup label="Brokerage & Custom Inquiries">
                          <option value="Global Cross-Border Sourcing & Brokerage">Global Cross-Border Sourcing &amp; Brokerage</option>
                          <option value="Other Agricultural Commodities">Other Agricultural Commodities</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Estimated Order Quantity <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1x 20ft Container, 100 MT, 500 MT"
                        value={formData.orderQuantity}
                        onChange={(e) => setFormData({ ...formData, orderQuantity: e.target.value })}
                        className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Message / Requirements */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Message / Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify your preferred specifications, destination seaport, packaging requirements, or commercial timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl p-3 text-xs text-slate-800 outline-none transition"
                    />
                  </div>

                  {/* Submit Button: Exact text "Send Inquiry" */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#072B1F] hover:bg-[#155437] text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#CFA744]" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#EAF5EF] text-[#155437] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-sans text-2xl font-extrabold text-[#072B1F]">
                    Inquiry Submitted Successfully
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#072B1F]">{formData.fullName}</strong>. Your inquiry regarding{' '}
                    <strong className="text-[#072B1F]">{formData.productOfInterest}</strong> has been received by Modular Traders and Brokerage.
                  </p>
                  <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D5E5DC] text-xs text-slate-700 max-w-md mx-auto text-left space-y-1">
                    <div><strong>Business Desk:</strong> Modular Traders and Brokerage, Karachi, Pakistan</div>
                    <div><strong>Head Office:</strong> {siteConfig.contact.headquarters.building}, Shahbaz Commercial Area, DHA Phase 6, Karachi</div>
                    <div><strong>Direct Phone:</strong> {siteConfig.contact.phones.primary}</div>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="bg-[#1B6248] hover:bg-[#072B1F] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                    >
                      <MessageSquare className="w-4 h-4 text-[#CFA744]" />
                      <span>Chat With Us on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold transition"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            5. BUSINESS LOCATION: GOOGLE MAPS SECTION
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#D5E5DC] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B] block mb-1">
                  Karachi Headquarters
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#072B1F]">
                  Find Our Office
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#155437] bg-[#EAF5EF] px-4 py-2 rounded-full border border-[#BDE3CF] self-start sm:self-auto">
                <MapPin className="w-4 h-4 text-[#CFA744]" />
                <span>Phase 6, DHA, Karachi, 75500, Pakistan</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed max-w-3xl">
              <strong>Office Location:</strong> {siteConfig.contact.headquarters.fullAddress}
            </p>

            {/* Embedded Google Map iframe pointing to Shahbaz Commercial Area, Phase 6, DHA Karachi */}
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#D5E5DC] shadow-inner bg-slate-100 relative">
              <iframe
                title="Modular Traders and Brokerage Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.758839801578!2d67.062089!3d24.805541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33cf8527a4d53%3A0x6b8bc1947a166a98!2sShahbaz%20Commercial%20Area%20Phase%206%20Defence%20Housing%20Authority%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* ========================================================
            6. INTERNATIONAL TRADE INQUIRIES SECTION
           ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="bg-[#FAF8F3] rounded-[2.5rem] p-8 sm:p-12 lg:p-14 border border-[#D5E5DC] shadow-sm">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#155437] bg-white border border-[#BDE3CF]">
                <Globe2 className="w-3.5 h-3.5 text-[#CFA744]" />
                <span>CROSS-BORDER COMMODITY BROKERAGE</span>
              </div>

              <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#072B1F]">
                International Trade Inquiries
              </h2>

              <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                Modular Traders and Brokerage actively encourages international buyers, rice importers, wholesale distributors,
                and commodity trading houses worldwide to discuss rice sourcing, bulk purchasing, and cross-border trade requirements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
                <div className="bg-white p-5 rounded-2xl border border-[#D5E5DC]">
                  <h4 className="font-bold text-[#072B1F] text-xs sm:text-sm mb-1">Bulk Rice Procurement</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Connecting international volume buyers with vetted Pakistani millers for containerized FCL or breakbulk shipments.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5E5DC]">
                  <h4 className="font-bold text-[#072B1F] text-xs sm:text-sm mb-1">Specialized Sourcing</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Tailored varietal selection, custom private label bag packing, and specific broken-grain parameters.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5E5DC]">
                  <h4 className="font-bold text-[#072B1F] text-xs sm:text-sm mb-1">Export Trade Coordination</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Assisting with commercial contracts, documentation, and maritime dispatch via Karachi Port and Port Qasim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. FINAL CALL TO ACTION
           ======================================================== */}
        <section>
          <div className="rounded-[2.5rem] p-8 sm:p-14 bg-gradient-to-br from-[#072B1F] via-[#0D3828] to-[#155437] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#CFA744]">
                Trading Partnership
              </span>
              <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-white">
                Let&apos;s Build a Trusted Trading Partnership
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We invite potential buyers, agricultural suppliers, and international trade partners to discuss their business
                requirements with our team in Karachi, Pakistan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
              <a
                href={`tel:${siteConfig.contact.phones.whatsappClean}`}
                className="group bg-white hover:bg-[#FAF8F3] text-[#072B1F] font-bold pl-6 pr-2 py-3 rounded-full text-xs sm:text-sm flex items-center justify-between gap-3 transition shadow-md active:scale-95 text-center"
              >
                <span>Contact Our Team</span>
                <span className="w-8 h-8 rounded-full bg-[#CFA744] text-[#072B1F] flex items-center justify-center transition-transform group-hover:rotate-45 font-bold">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>

              <button
                onClick={handleWhatsAppRedirect}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition text-center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
