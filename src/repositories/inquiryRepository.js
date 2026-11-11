import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

const STORAGE_KEY = 'modular_traders_inquiries_v2';

const initialDemoInquiries = [
  {
    id: 'inq-101',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    fullName: 'Tariq Al-Fahad',
    companyName: 'Al-Fahad Grain Trading Co',
    email: 'tariq@alfahadgrain.sa',
    phone: '+966 50 882 1944',
    country: 'Saudi Arabia',
    destinationPort: 'Jeddah Islamic Port',
    productName: 'Super Kernel Basmati Rice',
    volumeMT: 50,
    incoterms: 'CIF Jeddah',
    packaging: '25 kg PP Bags (Private Label)',
    status: 'New',
    notes: 'Looking for 2x 20ft FCL trial shipment of aged harvest with SGS pre-shipment inspection.',
  },
  {
    id: 'inq-102',
    created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    fullName: 'Patrick Ochieng',
    companyName: 'Equatorial Commodity Importers Ltd',
    email: 'p.ochieng@equatorialcommodities.ke',
    phone: '+254 712 345 678',
    country: 'Kenya',
    destinationPort: 'Mombasa Port',
    productName: 'IRRI-6 Long Grain White Rice, Sindh Origin',
    volumeMT: 250,
    incoterms: 'CIF Mombasa',
    packaging: '50 kg Export Jute/PP Sacks',
    status: 'Quoted',
    notes: 'Monthly requirement of 5-10 FCLs. Require Sortex 5% broken grain certificate.',
  },
  {
    id: 'inq-103',
    created_at: new Date(Date.now() - 120 * 3600 * 1000).toISOString(),
    fullName: 'Klaus Lindner',
    companyName: 'Bavaria Foods GmbH',
    email: 'klaus.lindner@bavariafoods.de',
    phone: '+49 89 2345 6789',
    country: 'Germany',
    destinationPort: 'Hamburg Port / Rotterdam',
    productName: 'Parboiled (Sella) Rice Varieties, IRRI-6 / PK',
    volumeMT: 100,
    incoterms: 'CFR Rotterdam',
    packaging: '1000 kg Jumbo Bags',
    status: 'Contacted',
    notes: 'Interested in low-pesticide European MRL compliance specification and moisture under 12%.',
  },
];

function getStoredInquiries() {
  if (typeof window === 'undefined') return initialDemoInquiries;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDemoInquiries));
      return initialDemoInquiries;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialDemoInquiries;
  } catch (err) {
    console.error('Failed to read inquiries from localStorage:', err);
    return initialDemoInquiries;
  }
}

function saveStoredInquiries(inquiries) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
    window.dispatchEvent(new Event('modular_inquiries_updated'));
  } catch (err) {
    console.error('Failed to save inquiries to localStorage:', err);
  }
}

/**
 * Decoupled B2B Inquiry Repository
 * Handles all trade inquiries from Contact Page, Modal, and Catalog details.
 */
export const inquiryRepository = {
  /**
   * Fetch all inquiries sorted by most recent
   */
  async getAll() {
    const list = getStoredInquiries();
    return [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  /**
   * Submit and save a new inquiry
   */
  async create(inquiryData) {
    const all = await this.getAll();
    const newInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      created_at: new Date().toISOString(),
      status: 'New',
      ...inquiryData,
    };

    const updated = [newInquiry, ...all];
    saveStoredInquiries(updated);

    // Also attempt saving via Supabase client asynchronously
    try {
      await supabase.from('inquiries').insert(newInquiry);
    } catch (e) {
      // Graceful fallback already handled
    }

    return newInquiry;
  },

  /**
   * Update inquiry status or details
   */
  async updateStatus(id, newStatus) {
    const all = await this.getAll();
    const index = all.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Inquiry not found');

    all[index] = {
      ...all[index],
      status: newStatus,
      updated_at: new Date().toISOString(),
    };

    saveStoredInquiries(all);
    return all[index];
  },

  /**
   * Delete inquiry
   */
  async delete(id) {
    const all = await this.getAll();
    const filtered = all.filter((item) => item.id !== id);
    saveStoredInquiries(filtered);
    return true;
  },
};

/**
 * React Hook for Inquiries
 */
export function useInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    const data = await inquiryRepository.getAll();
    setInquiries(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInquiries();

    const handleUpdate = () => {
      fetchInquiries();
    };

    window.addEventListener('modular_inquiries_updated', handleUpdate);
    return () => {
      window.removeEventListener('modular_inquiries_updated', handleUpdate);
    };
  }, [fetchInquiries]);

  return { inquiries, loading, refresh: fetchInquiries };
}
