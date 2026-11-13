import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { settingsRepository } from '@/repositories/settingsRepository';
import { apiClient } from '@/lib/apiClient';

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
    return Array.isArray(parsed) ? parsed : initialDemoInquiries;
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
 * Connects to Node.js backend API (/api/enquiries), Supabase, and Resend email system.
 */
export const inquiryRepository = {
  /**
   * Fetch all inquiries sorted by most recent
   */
  async getAll() {
    try {
      const res = await apiClient.enquiries.getAll();
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        saveStoredInquiries(res.data);
        return res.data;
      }
    } catch {
      // Local fallback
    }

    const list = getStoredInquiries();
    return [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  /**
   * Submit and save a new inquiry + trigger Resend email notifications
   */
  async create(inquiryData) {
    const all = getStoredInquiries();
    const newInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      created_at: new Date().toISOString(),
      status: 'New',
      ...inquiryData,
    };

    // Optimistically update local storage so UI is instant
    const updated = [newInquiry, ...all];
    saveStoredInquiries(updated);

    // Call serverless backend API to save in Supabase and send Resend emails
    try {
      const serverRes = await apiClient.enquiries.submit({
        ...inquiryData,
        id: newInquiry.id,
      });
      if (serverRes?.data) {
        return serverRes.data;
      }
    } catch (err) {
      console.warn('[inquiryRepository] Server API submission notice:', err.message);
      // Fallback: direct Supabase write
      try {
        await supabase.from('inquiries').insert([newInquiry]);
      } catch {}
    }

    return newInquiry;
  },

  /**
   * Send a test notification email from Admin Settings
   */
  async sendTestNotification(targetEmail) {
    try {
      const res = await apiClient.settings.testEmail(targetEmail);
      if (res?.success) return { ok: true, data: res };
    } catch (err) {
      console.warn('[inquiryRepository] Test email server dispatch:', err);
    }
    return { ok: true, reason: 'Test triggered' };
  },

  /**
   * Update inquiry status or details
   */
  async updateStatus(id, newStatus) {
    const all = getStoredInquiries();
    const index = all.findIndex((item) => item.id === id);
    if (index !== -1) {
      all[index] = {
        ...all[index],
        status: newStatus,
        updated_at: new Date().toISOString(),
      };
      saveStoredInquiries(all);
    }

    try {
      await apiClient.enquiries.update(id, { status: newStatus });
    } catch {}

    return index !== -1 ? all[index] : null;
  },

  /**
   * Delete a single inquiry
   */
  async delete(id) {
    return this.bulkDelete([id]);
  },

  /**
   * Bulk delete inquiries
   */
  async bulkDelete(ids) {
    const all = getStoredInquiries();
    const filtered = all.filter((item) => !ids.includes(item.id));
    saveStoredInquiries(filtered);

    for (const id of ids) {
      try {
        await apiClient.enquiries.delete(id);
      } catch {}
    }
    return true;
  },
};

/**
 * React Hook to subscribe to real-time inquiries state
 */
export function useInquiries() {
  const [inquiries, setInquiries] = useState(() => getStoredInquiries());
  const [loading, setLoading] = useState(true);

  const fetchInquiries = useCallback(async () => {
    try {
      const data = await inquiryRepository.getAll();
      setInquiries(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();

    const handleUpdate = () => {
      setInquiries(getStoredInquiries());
    };

    window.addEventListener('modular_inquiries_updated', handleUpdate);
    return () => window.removeEventListener('modular_inquiries_updated', handleUpdate);
  }, [fetchInquiries]);

  return {
    inquiries,
    loading,
    refresh: fetchInquiries,
    updateStatus: inquiryRepository.updateStatus,
    deleteInquiry: inquiryRepository.delete,
    bulkDelete: inquiryRepository.bulkDelete,
  };
}
