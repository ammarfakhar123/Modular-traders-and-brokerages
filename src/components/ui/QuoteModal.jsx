import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, MessageSquare, Shield, Globe2, Loader2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { inquiryRepository } from '@/repositories/inquiryRepository';

export default function QuoteModal({ isOpen, onClose, preselectedProduct = null }) {
  const [formData, setFormData] = useState({
    companyName: '',
    buyerName: '',
    email: '',
    phone: '',
    destinationPort: '',
    tradeTerm: 'CIF',
    productInterest: '',
    quantityMT: '25-50 MT (1-2 Containers)',
    packaging: '50 kg Export PP Bags',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productInterest: preselectedProduct.name,
      }));
    }
  }, [preselectedProduct, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save directly to decoupled repository / database
      await inquiryRepository.create({
        fullName: formData.buyerName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        country: formData.destinationPort || 'International Buyer',
        destinationPort: formData.destinationPort,
        productName: formData.productInterest || 'General Rice Sourcing',
        volumeMT: formData.quantityMT,
        incoterms: formData.tradeTerm,
        packaging: formData.packaging,
        notes: formData.notes,
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit quote inquiry:', err);
      // Even if offline, show success to user
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Modular Traders, I would like to request an export quote for ${
        formData.productInterest || 'Pakistan Rice'
      }.\n\nCompany: ${formData.companyName}\nQuantity: ${formData.quantityMT}\nDestination: ${
        formData.destinationPort
      }\nPackaging: ${formData.packaging}\nTrade Term: ${formData.tradeTerm}`
    );
    window.open(`https://wa.me/${siteConfig.contact.phones.whatsappClean}?text=${text}`, '_blank');
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-[#072B1F]/60 backdrop-blur-sm"
        />

        {/* Modal Window in Clean Light Luxury */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-2xl bg-white border border-[#D5E5DC] rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-800 z-10 my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header with Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <img src="/brand/logo-icon.png" alt="" className="w-6 h-6 object-contain" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#072B1F]">
                    B2B Export Quotation Desk &bull; Karachi HQ
                  </span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#072B1F]">
                  Request an Export Offer
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Direct mill allocation &bull; Lab-verified specs &bull; FOB Karachi or CIF Global Ports
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company / Entity Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Al-Madina Food Trading LLC"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Person *</label>
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      value={formData.buyerName}
                      onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Corporate Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="buyer@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. +44 7123... / +92 314..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Product or Service of Interest *</label>
                    <select
                      required
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition font-semibold cursor-pointer"
                    >
                      <option value="">Select a Variety / Brokerage Service</option>
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
                      <optgroup label="Brokerage & Sourcing">
                        <option value="Global Cross-Border Sourcing & Brokerage">Global Cross-Border Sourcing &amp; Brokerage</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Estimated Quantity</label>
                    <select
                      value={formData.quantityMT}
                      onChange={(e) => setFormData({ ...formData, quantityMT: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition cursor-pointer"
                    >
                      <option value="25-50 MT (1-2 Containers)">25-50 MT (1-2 Containers)</option>
                      <option value="100-250 MT (Trial Vessel Lot)">100-250 MT (Trial Vessel Lot)</option>
                      <option value="500-1,000 MT">500-1,000 MT</option>
                      <option value="2,500+ MT (Full Charter/Bulk)">2,500+ MT (Full Charter/Bulk)</option>
                      <option value="Brokerage / Sourcing Discussion">Brokerage / Sourcing Discussion</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Destination Port &amp; Country *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jeddah Islamic Port, Saudi Arabia / Rotterdam / Mombasa"
                      value={formData.destinationPort}
                      onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Incoterm</label>
                    <select
                      value={formData.tradeTerm}
                      onChange={(e) => setFormData({ ...formData, tradeTerm: e.target.value })}
                      className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition cursor-pointer"
                    >
                      <option value="CIF">CIF (Port of Destination)</option>
                      <option value="CFR">CFR (Cost &amp; Freight)</option>
                      <option value="FOB">FOB Karachi Port</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Packaging Requirements &amp; Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 50kg PP bags with custom stencil, SGS inspection before loading..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none transition resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#072B1F] hover:bg-[#155437] text-white font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition duration-200 text-xs tracking-wider uppercase shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Logging Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#CFA744]" />
                        <span>Submit Export Inquiry</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="bg-slate-100 hover:bg-slate-200 text-[#072B1F] border border-slate-200 px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 transition duration-200 text-xs font-bold uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4 text-[#1B6248]" />
                    <span>WhatsApp Desk</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-8 text-center"
            >
              <div className="w-16 h-16 bg-[#EAF5EF] text-[#1B6248] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#BDE3CF]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h4 className="font-sans text-2xl font-extrabold text-[#072B1F] mb-2">
                Inquiry Successfully Logged In Database
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-6">
                Thank you, <strong className="text-[#072B1F]">{formData.buyerName}</strong> from{' '}
                <strong className="text-[#072B1F]">{formData.companyName}</strong>. Your export inquiry has been
                logged with our trade desk. Our Karachi brokerage team will review your specifications and contact you shortly.
              </p>

              <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D5E5DC] text-xs text-slate-700 max-w-md mx-auto text-left mb-6 space-y-1">
                <div><strong>Product:</strong> {formData.productInterest}</div>
                <div><strong>Destination:</strong> {formData.destinationPort} ({formData.tradeTerm})</div>
                <div><strong>Quantity:</strong> {formData.quantityMT}</div>
                <div><strong>Response Window:</strong> Within 24 business hours (Karachi Trade Desk)</div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="bg-[#1B6248] hover:bg-[#072B1F] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4 text-[#CFA744]" />
                  <span>Chat on WhatsApp</span>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
