import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  RotateCcw,
  LogOut,
  Search,
  Package,
  Check,
  X,
  Upload,
  Lock,
  Mail,
  Home,
  CheckCircle2,
  Inbox,
  Filter,
  Phone,
  Building2,
  Globe2,
  Calendar,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Send,
  Bell,
  Loader2,
  Download,
} from 'lucide-react';
import { productRepository, useProducts } from '@/repositories/productRepository';
import { inquiryRepository, useInquiries } from '@/repositories/inquiryRepository';
import { authRepository, useAuth } from '@/repositories/authRepository';
import { settingsRepository, useAdminSettings } from '@/repositories/settingsRepository';
import { siteConfig } from '@/config/site';

export default function AdminPage() {
  const { isAuthenticated, user, logout } = useAuth();

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'inquiries' | 'settings'

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('admin@modulartraders.com');
  const [loginPassword, setLoginPassword] = useState('admin2026');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Products Data State
  const { products, refresh: refreshProducts } = useProducts(false); // Fetch all, including inactive
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Inquiries Data State
  const { inquiries, refresh: refreshInquiries } = useInquiries();
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedInquiryIds, setSelectedInquiryIds] = useState([]);

  // Admin Email & Inquiry Notification Settings
  const { settings, refresh: refreshSettings } = useAdminSettings();
  const [receiveInquiriesByEmail, setReceiveInquiriesByEmail] = useState(settings.receiveInquiriesByEmail);
  const [adminReceivingEmail, setAdminReceivingEmail] = useState(settings.inquiryNotificationEmail);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [settingsFeedback, setSettingsFeedback] = useState({ type: '', text: '' });

  useEffect(() => {
    setReceiveInquiriesByEmail(settings.receiveInquiriesByEmail);
    setAdminReceivingEmail(settings.inquiryNotificationEmail);
  }, [settings]);

  const handleSaveEmailSettings = async (e) => {
    e.preventDefault();
    if (receiveInquiriesByEmail && (!adminReceivingEmail || !/^\S+@\S+\.\S+$/.test(adminReceivingEmail))) {
      setSettingsFeedback({ type: 'error', text: 'Please enter a valid admin email address.' });
      return;
    }

    setIsSavingSettings(true);
    await settingsRepository.save({
      receiveInquiriesByEmail,
      inquiryNotificationEmail: adminReceivingEmail,
    });
    refreshSettings();
    setIsSavingSettings(false);
    setSettingsFeedback({
      type: 'success',
      text: receiveInquiriesByEmail
        ? `Settings saved! All customer inquiries will be forwarded to ${adminReceivingEmail.trim()}.`
        : 'Settings saved! Email forwarding is disabled; inquiries will be stored only in the Admin Portal.',
    });
    setTimeout(() => setSettingsFeedback({ type: '', text: '' }), 5000);
  };

  const handleToggleEmailReceive = async () => {
    const nextVal = !receiveInquiriesByEmail;
    setReceiveInquiriesByEmail(nextVal);
    await settingsRepository.save({
      receiveInquiriesByEmail: nextVal,
      inquiryNotificationEmail: adminReceivingEmail,
    });
    refreshSettings();
    setSettingsFeedback({
      type: 'success',
      text: nextVal
        ? `Email notifications enabled (${adminReceivingEmail}).`
        : 'Email notifications turned OFF. Inquiries are still saved in the Admin Panel.',
    });
    setTimeout(() => setSettingsFeedback({ type: '', text: '' }), 4000);
  };

  const handleSelectSavedEmail = async (email) => {
    setAdminReceivingEmail(email);
    await settingsRepository.save({
      receiveInquiriesByEmail,
      inquiryNotificationEmail: email,
    });
    refreshSettings();
    setSettingsFeedback({
      type: 'success',
      text: `Active admin email switched to ${email}.`,
    });
    setTimeout(() => setSettingsFeedback({ type: '', text: '' }), 4000);
  };

  const handleSendTestEmail = async () => {
    if (!adminReceivingEmail || !/^\S+@\S+\.\S+$/.test(adminReceivingEmail)) {
      setSettingsFeedback({ type: 'error', text: 'Enter a valid email address before sending a test.' });
      return;
    }
    setIsTestingEmail(true);
    const res = await inquiryRepository.sendTestNotification(adminReceivingEmail.trim());
    setIsTestingEmail(false);
    if (res.ok) {
      setSettingsFeedback({
        type: 'success',
        text: `Test email dispatched to ${adminReceivingEmail.trim()}! If this is your first time using this email, check your inbox/spam for the one-time FormSubmit activation link.`,
      });
    } else {
      setSettingsFeedback({
        type: 'error',
        text: 'Could not reach email service from this browser environment. Try from your live Vercel deployment or check network settings.',
      });
    }
  };

  // Modals for Products
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Form State for Product Create / Edit
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Basmati',
    grainLength: '',
    aroma: '',
    cropYear: '2025 / 2026 Harvest',
    origin: 'Sindh, Pakistan',
    tagline: '',
    shortDescription: '',
    fullDescription: '',
    image: '',
    active: true,
    badge: 'Grade A',
    brokenRatio: 'Max 2%',
    moisture: 'Max 12.5%',
    purity: '95% Minimum',
    packagingOptions: '25 kg PP Bags, 50 kg Export Sacks, Bulk Jumbo Bags',
  });

  // Handle Real Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    const res = await authRepository.login(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'Authentication failed.');
    }
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsCreating(true);
    setCurrentProduct(null);
    setFormData({
      name: '',
      slug: '',
      category: 'Basmati',
      grainLength: '7.2 mm',
      aroma: 'Natural Floral Aroma',
      cropYear: '2025 / 2026 Harvest',
      origin: 'Sindh, Pakistan',
      tagline: 'Premium Export Selection',
      shortDescription: 'High quality sortex cleaned rice grain.',
      fullDescription: 'Export grade certified rice lot sourced directly from vetted Sindh mills.',
      image: '/images/products/super-kernel.jpg',
      active: true,
      badge: 'Grade A',
      brokenRatio: 'Max 2.0%',
      moisture: 'Max 12.5%',
      purity: '96% Minimum',
      packagingOptions: '25 kg PP Bags, 50 kg Export Sacks',
    });
    setIsEditModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (product) => {
    setIsCreating(false);
    setCurrentProduct(product);
    setFormData({
      name: product.name || '',
      slug: product.slug || '',
      category: product.category || 'Basmati',
      grainLength: product.grainLength || '',
      aroma: product.aroma || '',
      cropYear: product.cropYear || '2025 / 2026 Harvest',
      origin: product.origin || 'Sindh, Pakistan',
      tagline: product.tagline || '',
      shortDescription: product.shortDescription || '',
      fullDescription: product.fullDescription || '',
      image: product.image || '',
      active: product.active !== false,
      badge: product.badge || 'Grade A',
      brokenRatio: product.brokenRatio || 'Max 2.0%',
      moisture: product.moisture || 'Max 12.5%',
      purity: product.purity || '95% Minimum',
      packagingOptions: Array.isArray(product.packagingOptions)
        ? product.packagingOptions.join(', ')
        : (product.packagingOptions || ''),
    });
    setIsEditModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        packagingOptions: formData.packagingOptions
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (isCreating) {
        await productRepository.create(payload);
        setStatusMessage('Product created successfully.');
      } else {
        await productRepository.update(currentProduct.id, payload);
        setStatusMessage('Product updated successfully.');
      }

      setIsEditModalOpen(false);
      refreshProducts();
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to save product: ' + err.message);
    }
  };

  // Delete Product
  const handleDeleteProduct = async () => {
    if (!currentProduct) return;
    try {
      await productRepository.delete(currentProduct.id);
      setIsDeleteModalOpen(false);
      setStatusMessage('Product deleted successfully.');
      refreshProducts();
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to delete: ' + err.message);
    }
  };

  // Toggle Active/Inactive
  const handleToggleActive = async (product) => {
    try {
      await productRepository.update(product.id, { active: !product.active });
      refreshProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Reorder Products
  const handleMove = async (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= products.length) return;

    const list = [...products];
    const temp = list[index];
    list[index] = list[newIndex];
    list[newIndex] = temp;

    const orderedIds = list.map((item) => item.id);
    await productRepository.reorder(orderedIds);
    refreshProducts();
  };

  // Reset to initial demo catalog
  const handleResetDefaults = async () => {
    if (window.confirm('Reset catalog back to initial 7 export varieties?')) {
      await productRepository.resetToDefaults();
      refreshProducts();
      setStatusMessage('Reset to defaults complete.');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (inqId, newStatus) => {
    try {
      await inquiryRepository.updateStatus(inqId, newStatus);
      refreshInquiries();
      if (selectedInquiry?.id === inqId) {
        setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filter Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = inquiryStatusFilter === 'All' || inq.status === inquiryStatusFilter;
    const matchesSearch =
      inq.fullName?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.companyName?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.productName?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.destinationPort?.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Bulk Select & Delete Handlers for Inquiries
  const allFilteredSelected =
    filteredInquiries.length > 0 &&
    filteredInquiries.every((inq) => selectedInquiryIds.includes(inq.id));

  const toggleSelectInquiry = (id) => {
    setSelectedInquiryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAllInquiries = () => {
    if (allFilteredSelected) {
      const visibleSet = new Set(filteredInquiries.map((inq) => inq.id));
      setSelectedInquiryIds((prev) => prev.filter((id) => !visibleSet.has(id)));
    } else {
      const merged = new Set([
        ...selectedInquiryIds,
        ...filteredInquiries.map((inq) => inq.id),
      ]);
      setSelectedInquiryIds(Array.from(merged));
    }
  };

  const handleBulkDeleteInquiries = async () => {
    if (selectedInquiryIds.length === 0) return;
    if (
      !window.confirm(
        `Delete ${selectedInquiryIds.length} selected inquiry(ies) permanently?`
      )
    ) {
      return;
    }

    await inquiryRepository.bulkDelete(selectedInquiryIds);
    setSelectedInquiryIds([]);
    if (selectedInquiry && selectedInquiryIds.includes(selectedInquiry.id)) {
      setSelectedInquiry(null);
    }
    refreshInquiries();
    setStatusMessage(`Deleted ${selectedInquiryIds.length} inquiry(ies).`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleDeleteSingleInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    await inquiryRepository.delete(id);
    setSelectedInquiryIds((prev) => prev.filter((item) => item !== id));
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
    refreshInquiries();
    setStatusMessage('Inquiry deleted.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Export Inquiries to Excel-compatible UTF-8 BOM CSV
  const handleExportInquiriesExcel = () => {
    const recordsToExport =
      selectedInquiryIds.length > 0
        ? inquiries.filter((inq) => selectedInquiryIds.includes(inq.id))
        : filteredInquiries;

    if (recordsToExport.length === 0) {
      setStatusMessage('No inquiries available to export.');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    const escapeCsv = (val) => {
      const str = val === null || val === undefined ? '' : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const headers = [
      'Inquiry ID',
      'Date',
      'Status',
      'Full Name',
      'Company Name',
      'Email',
      'Phone / WhatsApp',
      'Country',
      'Destination Port',
      'Product / Variety',
      'Quantity (MT)',
      'Incoterms',
      'Packaging',
      'Email Notification',
      'Message / Notes',
    ];

    const rows = recordsToExport.map((inq) => [
      inq.id,
      inq.created_at ? new Date(inq.created_at).toLocaleString() : '',
      inq.status || 'New',
      inq.fullName || '',
      inq.companyName || '',
      inq.email || '',
      inq.phone || '',
      inq.country || '',
      inq.destinationPort || '',
      inq.productName || '',
      inq.volumeMT || '',
      inq.incoterms || '',
      inq.packaging || '',
      inq.emailForwardedTo || 'Admin Panel',
      inq.notes || '',
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.map(escapeCsv).join(','), ...rows.map((r) => r.map(escapeCsv).join(','))].join(
        '\r\n'
      );

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.setAttribute('download', `modular-traders-inquiries-${dateStamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setStatusMessage(`Downloaded ${recordsToExport.length} inquiry(ies) for Excel.`);
    setTimeout(() => setStatusMessage(''), 3500);
  };

  // -------------------------------------------------------------
  // VIEW: NOT AUTHENTICATED (LOGIN SCREEN)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#D5E5DC] p-8 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Top Green Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#072B1F] via-[#CFA744] to-[#155437]" />

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#072B1F]/5 border border-[#BDE3CF] p-2 flex items-center justify-center">
              <img src="/brand/logo-icon.png" alt="Modular" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-sans text-2xl font-extrabold text-[#072B1F]">
              Commodity Portal
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Modular Traders &amp; Brokerage &bull; Karachi HQ
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Administrator Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl pl-9 pr-3.5 py-3 text-xs text-slate-800 outline-none transition"
                  placeholder="admin@modulartraders.com"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Security Passcode</label>
              <div className="relative">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl pl-9 pr-3.5 py-3 text-xs text-slate-800 outline-none transition"
                  placeholder="Password"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#072B1F] hover:bg-[#155437] text-white font-bold py-3.5 rounded-xl transition duration-200 text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Shield className="w-4 h-4 text-[#CFA744]" />
              <span>{isLoggingIn ? 'Authenticating...' : 'Sign In to Portal'}</span>
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500 font-medium block">
              Default Credentials: <code className="text-[#072B1F] font-bold">admin@modulartraders.com</code> / <code className="text-[#072B1F] font-bold">admin2026</code>
            </span>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#155437] hover:underline mt-3">
              <Home className="w-3.5 h-3.5" /> Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-slate-800 pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-[#D5E5DC] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/brand/logo-full.png" alt="Modular" className="h-8 w-auto object-contain" />
            </Link>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#155437] bg-[#EAF5EF] px-3 py-1 rounded-full border border-[#BDE3CF]">
              Enterprise Portal &bull; Karachi HQ
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-black px-3 py-1.5 rounded-full hover:bg-slate-100 transition hidden sm:inline-flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'products'
                ? 'border-[#072B1F] text-[#072B1F]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4 text-[#CFA744]" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'inquiries'
                ? 'border-[#072B1F] text-[#072B1F]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Inbox className="w-4 h-4 text-[#155437]" />
            <span>Export Inquiries ({inquiries.length})</span>
            {inquiries.some((i) => i.status === 'New') && (
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'settings'
                ? 'border-[#072B1F] text-[#072B1F]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-[#B8860B]" />
            <span>Site &amp; Desk Settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {statusMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* ========================================================
            TAB 1: PRODUCTS MANAGEMENT
           ======================================================== */}
        {activeTab === 'products' && (
          <div>
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    placeholder="Search varieties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#D5E5DC] rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-[#CFA744]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-[#D5E5DC] rounded-xl px-3 py-2 text-xs outline-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Basmati">Basmati</option>
                  <option value="Non-Basmati">Non-Basmati</option>
                  <option value="Parboiled">Parboiled</option>
                  <option value="Brokerage">Brokerage</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetDefaults}
                  className="bg-white hover:bg-slate-50 border border-[#D5E5DC] text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset Initial 7</span>
                </button>

                <button
                  onClick={handleOpenCreate}
                  className="bg-[#072B1F] hover:bg-[#155437] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                >
                  <Plus className="w-4 h-4 text-[#CFA744]" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-[#D5E5DC] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F3] text-slate-600 font-mono uppercase text-[11px] border-b border-[#D5E5DC]">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Order</th>
                      <th className="py-3.5 px-4 font-bold">Variety Details</th>
                      <th className="py-3.5 px-4 font-bold">Category</th>
                      <th className="py-3.5 px-4 font-bold">Lab Specs</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p, index) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition">
                        {/* Order & Reordering */}
                        <td className="py-4 px-4 font-mono font-bold text-slate-400">
                          <div className="flex items-center gap-1">
                            <span>#{index + 1}</span>
                            <div className="flex flex-col">
                              <button
                                onClick={() => handleMove(index, 'up')}
                                disabled={index === 0}
                                className="text-slate-400 hover:text-black disabled:opacity-20"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMove(index, 'down')}
                                disabled={index === products.length - 1}
                                className="text-slate-400 hover:text-black disabled:opacity-20"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Name & Origin */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                              <img
                                src={p.image || '/images/products/super-kernel.jpg'}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-[#072B1F] text-sm">
                                {p.name}
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">
                                {p.origin || 'Sindh, Pakistan'} &bull; {p.cropYear}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4">
                          <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EAF5EF] text-[#155437] border border-[#BDE3CF]">
                            {p.category}
                          </span>
                        </td>

                        {/* Lab Specs */}
                        <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                          <div>Length: {p.grainLength || 'N/A'}</div>
                          <div>Broken: {p.brokenRatio || 'Max 2%'}</div>
                        </td>

                        {/* Active Toggle */}
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleActive(p)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                              p.active !== false
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            {p.active !== false ? (
                              <>
                                <Eye className="w-3 h-3 text-emerald-600" /> Active
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3" /> Inactive
                              </>
                            )}
                          </button>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-black hover:bg-slate-100 transition"
                              title="Edit product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setCurrentProduct(p);
                                setIsDeleteModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: EXPORT INQUIRIES MANAGEMENT
           ======================================================== */}
        {activeTab === 'inquiries' && (
          <div>
            {/* Filter & Bulk Action Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 sm:w-72">
                  <input
                    type="text"
                    placeholder="Search buyer, company, port..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full bg-white border border-[#D5E5DC] rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-[#CFA744]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="bg-white border border-[#D5E5DC] rounded-xl px-3 py-2 text-xs outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Action Buttons: Excel Download + Bulk Delete */}
              <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5">
                <span className="text-xs font-mono text-slate-500 mr-1">
                  Total: <strong className="text-[#072B1F]">{inquiries.length}</strong>
                  {selectedInquiryIds.length > 0 && (
                    <span className="ml-2 text-[#155437] font-bold">
                      ({selectedInquiryIds.length} selected)
                    </span>
                  )}
                </span>

                {selectedInquiryIds.length > 0 && (
                  <button
                    onClick={handleBulkDeleteInquiries}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Selected ({selectedInquiryIds.length})</span>
                  </button>
                )}

                <button
                  onClick={handleExportInquiriesExcel}
                  disabled={filteredInquiries.length === 0 && selectedInquiryIds.length === 0}
                  className="bg-[#072B1F] hover:bg-[#155437] disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#CFA744]" />
                  <span>
                    {selectedInquiryIds.length > 0
                      ? `Download Excel (${selectedInquiryIds.length})`
                      : 'Download Excel (.csv)'}
                  </span>
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-3xl border border-[#D5E5DC] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F3] text-slate-600 font-mono uppercase text-[11px] border-b border-[#D5E5DC]">
                    <tr>
                      <th className="py-3.5 pl-4 pr-2 w-10">
                        <input
                          type="checkbox"
                          checked={allFilteredSelected}
                          onChange={toggleSelectAllInquiries}
                          aria-label="Select all visible inquiries"
                          className="w-4 h-4 rounded border-slate-300 text-[#072B1F] focus:ring-[#CFA744] cursor-pointer accent-[#072B1F]"
                        />
                      </th>
                      <th className="py-3.5 px-4 font-bold">Date</th>
                      <th className="py-3.5 px-4 font-bold">Buyer &amp; Company</th>
                      <th className="py-3.5 px-4 font-bold">Variety &amp; Volume</th>
                      <th className="py-3.5 px-4 font-bold">Port &amp; Terms</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold text-right">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No inquiries match the current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => {
                        const isChecked = selectedInquiryIds.includes(inq.id);
                        return (
                          <tr
                            key={inq.id}
                            className={`transition ${
                              isChecked ? 'bg-[#EAF5EF]/50' : 'hover:bg-slate-50/80'
                            }`}
                          >
                            <td className="py-4 pl-4 pr-2">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleSelectInquiry(inq.id)}
                                aria-label={`Select inquiry from ${inq.fullName}`}
                                className="w-4 h-4 rounded border-slate-300 text-[#072B1F] focus:ring-[#CFA744] cursor-pointer accent-[#072B1F]"
                              />
                            </td>

                            <td className="py-4 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                              {new Date(inq.created_at).toLocaleDateString()}
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-[#072B1F]">
                                {inq.fullName}
                              </div>
                              <div className="text-slate-500 text-[11px]">
                                {inq.companyName}
                              </div>
                              <div className="text-slate-400 font-mono text-[10px]">
                                {inq.email} &bull; {inq.phone}
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-[#155437]">
                                {inq.productName}
                              </div>
                              <div className="font-mono text-xs font-semibold text-[#B8860B]">
                                {inq.volumeMT} MT
                              </div>
                            </td>

                            <td className="py-4 px-4 font-mono text-[11px]">
                              <div className="text-slate-800 font-bold">{inq.destinationPort}</div>
                              <div className="text-slate-500">{inq.incoterms}</div>
                            </td>

                            <td className="py-4 px-4">
                              <select
                                value={inq.status || 'New'}
                                onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                                className={`text-[11px] font-bold rounded-full px-2.5 py-1 border outline-none cursor-pointer ${
                                  inq.status === 'New'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : inq.status === 'Quoted'
                                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                                    : inq.status === 'Contacted'
                                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                                    : 'bg-slate-100 text-slate-600 border-slate-300'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Quoted">Quoted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="px-3 py-1.5 rounded-lg bg-[#EAF5EF] hover:bg-[#D5E5DC] text-[#072B1F] font-bold text-xs transition cursor-pointer"
                                >
                                  View Notes
                                </button>
                                <button
                                  onClick={() => handleDeleteSingleInquiry(inq.id)}
                                  title="Delete inquiry"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: SITE & DESK SETTINGS
           ======================================================== */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-6">
            {/* Inquiry Email Forwarding & Admin Email Selection Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E5DC] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#EAF5EF] border border-[#BDE3CF] flex items-center justify-center text-[#155437] shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-extrabold text-[#072B1F]">
                      Inquiry Email Forwarding &amp; Admin Receiver
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Control whether customer inquiries are forwarded via email and choose which admin email receives them.
                    </p>
                  </div>
                </div>

                {/* Toggle Switch: Inquiries on Email Yes / No */}
                <button
                  type="button"
                  onClick={handleToggleEmailReceive}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer shrink-0 ${
                    receiveInquiriesByEmail
                      ? 'bg-[#072B1F] text-white border-[#072B1F] shadow-sm'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      receiveInquiriesByEmail ? 'bg-emerald-400' : 'bg-slate-400'
                    }`}
                  />
                  <span>
                    {receiveInquiriesByEmail ? 'Email Alerts: ON' : 'Email Alerts: OFF'}
                  </span>
                </button>
              </div>

              {settingsFeedback.text && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                    settingsFeedback.type === 'error'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-[#EAF5EF] border-[#BDE3CF] text-[#072B1F]'
                  }`}
                >
                  {settingsFeedback.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#155437] shrink-0" />
                  )}
                  <span>{settingsFeedback.text}</span>
                </div>
              )}

              <form onSubmit={handleSaveEmailSettings} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#072B1F] mb-1.5">
                    Active Admin Email for Receiving Inquiries
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required={receiveInquiriesByEmail}
                        disabled={!receiveInquiriesByEmail}
                        placeholder="muhammadammarfakhar@gmail.com"
                        value={adminReceivingEmail}
                        onChange={(e) => setAdminReceivingEmail(e.target.value)}
                        className="w-full bg-[#FAF8F3] disabled:opacity-60 border border-[#D5E5DC] focus:border-[#CFA744] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 outline-none transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="bg-[#072B1F] hover:bg-[#155437] text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs"
                    >
                      {isSavingSettings ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 text-[#CFA744]" />
                      )}
                      <span>Save Email</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Every submission from Contact Us or Request a Quote is saved here in Admin and automatically emailed to this address when alerts are ON.
                  </p>
                </div>

                {/* Quick Select / Switch Saved Admin Emails */}
                {settings.savedEmails && settings.savedEmails.length > 0 && (
                  <div className="pt-2">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Quick Select Saved Admin Emails:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {settings.savedEmails.map((savedEmail) => {
                        const isActive = adminReceivingEmail === savedEmail;
                        return (
                          <button
                            key={savedEmail}
                            type="button"
                            onClick={() => handleSelectSavedEmail(savedEmail)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer flex items-center gap-1.5 ${
                              isActive
                                ? 'bg-[#EAF5EF] border-[#155437] text-[#072B1F] font-bold'
                                : 'bg-[#FAF8F3] border-[#D5E5DC] text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <Mail className="w-3 h-3 text-[#155437]" />
                            <span>{savedEmail}</span>
                            {isActive && <CheckCircle2 className="w-3 h-3 text-[#155437]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Send Test Email Verification Bar */}
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EADBBD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <strong className="text-[#072B1F] block">First-Time Gmail Activation &amp; Delivery Test</strong>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      On the very first inquiry sent to a new email, check your Gmail inbox or spam folder to click the one-time verification link so future inquiries arrive automatically.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    disabled={isTestingEmail || !receiveInquiriesByEmail}
                    className="bg-white hover:bg-slate-50 disabled:opacity-50 text-[#072B1F] border border-[#D5E5DC] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shrink-0 cursor-pointer shadow-2xs"
                  >
                    {isTestingEmail ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-[#155437]" />
                    )}
                    <span>Send Test Email</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Centralized Configuration Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E5DC] shadow-sm">
              <h3 className="font-sans text-lg font-bold text-[#072B1F] mb-2">
                Company &amp; Trade Desk Information
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Core corporate headquarters details displayed across the website.
              </p>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Corporate Name</span>
                  <span className="font-bold text-slate-800">{siteConfig.legalName}</span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Headquarters</span>
                  <span className="font-bold text-slate-800">
                    {siteConfig.contact.headquarters.displayAddress}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Active Admin Receiving Email</span>
                  <span className="font-bold text-[#155437]">
                    {settings.receiveInquiriesByEmail
                      ? settings.inquiryNotificationEmail
                      : 'Email Forwarding Disabled (Admin Panel Only)'}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Direct Phone / WhatsApp</span>
                  <span className="font-bold text-slate-800">{siteConfig.contact.phones.primary}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          MODAL: INQUIRY DETAILS POPUP
         ======================================================== */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D5E5DC] relative">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-black bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B6248]" />
              <span className="text-xs font-mono font-bold uppercase text-[#072B1F]">
                Inquiry Spec Sheet &bull; {selectedInquiry.id}
              </span>
            </div>

            <h3 className="font-sans text-xl font-bold text-[#072B1F] mb-1">
              {selectedInquiry.companyName}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Contact: {selectedInquiry.fullName} &bull; {selectedInquiry.email} &bull; {selectedInquiry.phone}
            </p>

            <div className="space-y-3 text-xs bg-[#FAF8F3] p-4 rounded-2xl border border-slate-200 mb-6 font-mono">
              <div><strong>Variety:</strong> {selectedInquiry.productName}</div>
              <div><strong>Volume:</strong> {selectedInquiry.volumeMT} MT</div>
              <div><strong>Destination:</strong> {selectedInquiry.destinationPort} ({selectedInquiry.incoterms})</div>
              <div><strong>Packaging:</strong> {selectedInquiry.packaging}</div>
              <div><strong>Received:</strong> {new Date(selectedInquiry.created_at).toLocaleString()}</div>
              <div><strong>Email Notification:</strong> {selectedInquiry.emailForwardedTo || 'Admin Panel'}</div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 mb-1">Commercial Notes / Specifications:</label>
              <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed max-h-32 overflow-y-auto">
                {selectedInquiry.notes || 'No specific notes provided.'}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#072B1F] text-white hover:bg-[#155437]"
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: PRODUCT CREATE / EDIT
         ======================================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D5E5DC] my-8 relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-black bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-sans text-2xl font-bold text-[#072B1F] mb-1">
              {isCreating ? 'Add New Rice Variety' : 'Edit Variety Details'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Update technical laboratory parameters and export catalog information.
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Variety Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#D5E5DC] rounded-xl px-3 py-2 outline-none focus:border-[#CFA744]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#D5E5DC] rounded-xl px-3 py-2 outline-none cursor-pointer"
                  >
                    <option value="Basmati Rice">Basmati Rice</option>
                    <option value="White Rice">White Rice</option>
                    <option value="Long Grain Rice">Long Grain Rice</option>
                    <option value="Non-Basmati Rice">Non-Basmati Rice</option>
                    <option value="Parboiled Rice">Parboiled Rice</option>
                    <option value="Trading & Brokerage Service">Trading &amp; Brokerage Service</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grain Length</label>
                  <input
                    type="text"
                    placeholder="e.g. 7.4 mm"
                    value={formData.grainLength}
                    onChange={(e) => setFormData({ ...formData, grainLength: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#D5E5DC] rounded-xl px-3 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Broken Tolerance</label>
                  <input
                    type="text"
                    placeholder="e.g. Max 2.0%"
                    value={formData.brokenRatio}
                    onChange={(e) => setFormData({ ...formData, brokenRatio: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#D5E5DC] rounded-xl px-3 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Moisture Max</label>
                  <input
                    type="text"
                    placeholder="e.g. Max 12.0%"
                    value={formData.moisture}
                    onChange={(e) => setFormData({ ...formData, moisture: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#D5E5DC] rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL / Storage Path</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-[#FAF8F3] border border-[#D5E5DC] rounded-xl px-3 py-2 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-[#FAF8F3] border border-[#D5E5DC] rounded-xl px-3 py-2 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Packaging Options (comma separated)</label>
                <input
                  type="text"
                  value={formData.packagingOptions}
                  onChange={(e) => setFormData({ ...formData, packagingOptions: e.target.value })}
                  className="w-full bg-[#FAF8F3] border border-[#D5E5DC] rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#072B1F] hover:bg-[#155437] text-white shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CONFIRM DELETE
         ======================================================== */}
      {isDeleteModalOpen && currentProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-red-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="font-sans text-lg font-bold text-slate-900 mb-1">Delete Variety?</h4>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to delete <strong>{currentProduct.name}</strong> from the export catalog?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
