import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';
import QuoteModal from '@/components/ui/QuoteModal';

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
            className="bg-[#072B1F] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md"
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

function MainLayout({ children, onOpenQuote }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar onOpenQuote={onOpenQuote} />}
      {children}
      {!isAdmin && <Footer onOpenQuote={onOpenQuote} />}
    </>
  );
}

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
                element={
                  <AboutPage
                    onOpenQuote={() => handleOpenQuote(null)}
                  />
                }
              />
              <Route
                path="/contact"
                element={<ContactPage />}
              />
              <Route
                path="/products"
                element={
                  <ProductsPage
                    onOpenQuoteWithProduct={(prod) => handleOpenQuote(prod)}
                  />
                }
              />
              <Route
                path="/products/:slug"
                element={
                  <ProductDetailPage
                    onOpenQuoteWithProduct={(prod) => handleOpenQuote(prod)}
                  />
                }
              />
              <Route path="/admin" element={<AdminPage />} />
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

          {/* Global B2B Export Quote Modal */}
          <QuoteModal
            isOpen={isQuoteOpen}
            onClose={handleCloseQuote}
            preselectedProduct={selectedProduct}
          />
        </SmoothScroll>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
