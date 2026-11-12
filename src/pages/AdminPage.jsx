import React, { useState } from 'react';
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
} from 'lucide-react';
import { productRepository, useProducts } from '@/repositories/productRepository';
import { inquiryRepository, useInquiries } from '@/repositories/inquiryRepository';
import { authRepository, useAuth } from '@/repositories/authRepository';
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
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80',
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
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
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

              <div className="text-xs font-mono text-slate-500">
                Total Inquiries: <strong className="text-[#072B1F]">{inquiries.length}</strong>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-3xl border border-[#D5E5DC] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F3] text-slate-600 font-mono uppercase text-[11px] border-b border-[#D5E5DC]">
                    <tr>
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
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          No inquiries match the current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/80 transition">
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
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-3 py-1.5 rounded-lg bg-[#EAF5EF] hover:bg-[#D5E5DC] text-[#072B1F] font-bold text-xs transition"
                            >
                              View Notes
                            </button>
                          </td>
                        </tr>
                      ))
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
            <div className="bg-white rounded-3xl p-8 border border-[#D5E5DC] shadow-sm">
              <h3 className="font-sans text-lg font-bold text-[#072B1F] mb-4">
                Centralized Configuration (/config/site.js)
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                All contact details, working hours, headquarters addresses, and social links are centrally driven and easily replaced.
              </p>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Corporate Name</span>
                  <span className="font-bold text-slate-800">{siteConfig.legalName}</span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Trading Desk Hours</span>
                  <span className="font-bold text-slate-800">{siteConfig.workingHours.fullDisplay}</span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Headquarters</span>
                  <span className="font-bold text-slate-800">
                    {siteConfig.contact.headquarters.displayAddress}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Brokerage Inquiries Email</span>
                  <span className="font-bold text-slate-800">{siteConfig.contact.emails.inquiries}</span>
                </div>

                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Direct WhatsApp Desk</span>
                  <span className="font-bold text-slate-800">{siteConfig.contact.phones.whatsapp}</span>
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
                    <option value="Basmati">Basmati</option>
                    <option value="Non-Basmati">Non-Basmati</option>
                    <option value="Parboiled">Parboiled</option>
                    <option value="Brokerage">Brokerage</option>
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
