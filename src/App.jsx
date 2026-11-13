import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';
import QuoteModal from '@/components/ui/QuoteModal';
import { isAdminSubdomain, getAdminBaseUrl } from '@/lib/domainHelper';

// Pages
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import AdminPage from '@/pages/AdminPage';

// Class Error Boundary to prevent blank screens
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FCFBF8] flex flex-col items-center justify-center p-6 text-center text-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF5EF] border border-[#BDE3CF] flex items-center justify-center mb-4">
            <img src="/brand/logo-icon.png" alt="" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="text-2xl font-bold font-sans mb-2 text-[#072B1F]">Something went wrong</h2>
          <p className="text-xs text-slate-500 max-w-md mb-6">
            {this.state.error?.message || 'An error occurred while loading this section.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="bg-[#072B1F] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Legacy /admin redirect handler that forwards to admin.yourdomain.com while preserving subpath
function LegacyAdminRedirect() {
  const location = useLocation();

  useEffect(() => {
    const isLocal =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    if (!isLocal) {
      const subpath = location.pathname.replace(/^\/admin/, '') || '/products';
      const targetUrl = getAdminBaseUrl(subpath + location.search);
      window.location.href = targetUrl;
    }
  }, [location]);

  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // In local development, fall back gracefully to inline AdminPage for instant testing
  if (isLocal) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center p-6 text-center text-slate-800">
      <div className="w-12 h-12 border-3 border-[#072B1F] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-semibold text-[#072B1F]">
        Redirecting to Modular Enterprise Admin Subdomain...
      </p>
    </div>
  );
}

function MainLayout({ children, onOpenQuote }) {
  return (
    <>
      <Navbar onOpenQuote={onOpenQuote} />
      {children}
      <Footer onOpenQuote={onOpenQuote} />
    </>
  );
}

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Determine if the current hostname or query is the Admin Subdomain
  const isSubdomain = isAdminSubdomain();

  const handleOpenQuote = (product = null) => {
    setSelectedProduct(product);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setSelectedProduct(null);
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <CustomCursor />
          <LoadingScreen />

          {/* ========================================================
              BRANCH 1: ADMIN SUBDOMAIN (admin.yourdomain.com)
              Dedicated Admin Panel Experience - No Public Navbar/Footer
             ======================================================== */}
          {isSubdomain ? (
            <Routes>
              <Route path="/" element={<AdminPage defaultTab="products" />} />
              <Route path="/login" element={<AdminPage defaultTab="login" />} />
              <Route path="/products" element={<AdminPage defaultTab="products" />} />
              <Route path="/enquiries" element={<AdminPage defaultTab="inquiries" />} />
              <Route path="/inquiries" element={<AdminPage defaultTab="inquiries" />} />
              <Route path="/settings" element={<AdminPage defaultTab="settings" />} />
              {/* Never render public pages on admin subdomain; redirect all others to /products */}
              <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
          ) : (
            /* ========================================================
               BRANCH 2: PUBLIC WEBSITE (yourdomain.com)
               Full Public Brand Experience with Navbar, Footer & Modals
               ======================================================== */
            <MainLayout onOpenQuote={() => handleOpenQuote(null)}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      onOpenQuote={() => handleOpenQuote(null)}
                      onOpenQuoteWithProduct={(prod) => handleOpenQuote(prod)}
                    />
                  }
                />
                <Route
                  path="/about"
                  element={<AboutPage onOpenQuote={() => handleOpenQuote(null)} />}
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/products"
                  element={
                    <ProductsPage onOpenQuoteWithProduct={(prod) => handleOpenQuote(prod)} />
                  }
                />
                <Route
                  path="/products/:slug"
                  element={
                    <ProductDetailPage onOpenQuoteWithProduct={(prod) => handleOpenQuote(prod)} />
                  }
                />
                {/* Legacy /admin URLs: redirect to admin.yourdomain.com (or local dev fallback) */}
                <Route path="/admin/*" element={<LegacyAdminRedirect />} />
                <Route path="/admin" element={<LegacyAdminRedirect />} />
                <Route
                  path="*"
                  element={
                    <HomePage
                      onOpenQuote={() => handleOpenQuote(null)}
                      onOpenQuoteWithProduct={(prod) => handleOpenQuote(prod)}
                    />
                  }
                />
              </Routes>
            </MainLayout>
          )}

          {/* Global B2B Export Quote Modal (Only on Public Website) */}
          {!isSubdomain && (
            <QuoteModal
              isOpen={isQuoteOpen}
              onClose={handleCloseQuote}
              preselectedProduct={selectedProduct}
            />
          )}
        </SmoothScroll>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
