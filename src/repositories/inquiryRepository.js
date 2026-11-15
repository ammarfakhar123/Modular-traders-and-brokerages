import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { settingsRepository } from '@/repositories/settingsRepository';
import { apiClient } from '@/lib/apiClient';

const STORAGE_KEY = 'modular_traders_inquiries_v2';

function isDemoInquiry(item) {
  if (!item) return false;
  const demoIds = ['inq-101', 'inq-102', 'inq-103', 'MT-2026-1001', 'MT-2026-1002'];
  const demoNames = ['Tariq Al-Fahad', 'Patrick Ochieng', 'Klaus Lindner'];
  return demoIds.includes(item.id) || demoNames.includes(item.fullName);
}

function getStoredInquiries() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // Purge any legacy pre-seeded demo inquiries
    const cleaned = parsed.filter((item) => !isDemoInquiry(item));
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (err) {
    console.error('Failed to read inquiries from localStorage:', err);
    return [];
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
function normalizeInquiryRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    fullName: row.full_name || row.fullName || 'Trade Buyer',
    companyName: row.company_name || row.companyName || 'Export Client',
    email: row.email,
    phone: row.phone,
    country: row.country || 'International',
    destinationPort: row.destination_port || row.destinationPort || '',
    productName: row.product_name || row.productName || 'General Rice Sourcing',
    volumeMT: row.volume_mt || row.volumeMT || '25-50 MT',
    incoterms: row.incoterms || 'FOB Karachi / CIF',
    packaging: row.packaging || 'Standard Export 50kg Bags',
    notes: row.notes || '',
    status: row.status || 'New',
    created_at: row.created_at || row.createdAt || new Date().toISOString(),
  };
}

export const inquiryRepository = {
  /**
   * Fetch all inquiries sorted by most recent
   */
  async getAll() {
    // 1. Try serverless backend API
    try {
      const res = await apiClient.enquiries.getAll();
      if (res?.data && Array.isArray(res.data)) {
        saveStoredInquiries(res.data);
        return res.data;
      }
    } catch (apiErr) {
      console.warn('[inquiryRepository] Server API fetch notice:', apiErr.message);
    }

    // 2. Direct Supabase DB query fallback
    try {
      const { data: dbData, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(dbData) && dbData.length > 0) {
        const normalized = dbData.map(normalizeInquiryRow).filter(Boolean);
        saveStoredInquiries(normalized);
        return normalized;
      }
    } catch (dbErr) {
      console.warn('[inquiryRepository] Supabase direct read notice:', dbErr);
    }

    // 3. Browser storage fallback
    const list = getStoredInquiries();
    return [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  /**
   * Submit and save a new inquiry + trigger email notifications
   */
  async create(inquiryData) {
    const all = getStoredInquiries();
    const newInquiry = {
      id: `MT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      created_at: new Date().toISOString(),
      status: 'New',
      ...inquiryData,
    };

    // Optimistically update local storage so UI is instant
    const updated = [newInquiry, ...all];
    saveStoredInquiries(updated);

    // 1. Call serverless backend API to save in Supabase and send Brevo / Resend emails
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

      // 2. Fallback: direct Supabase write with correct snake_case columns
      try {
        const dbPayload = {
          id: newInquiry.id,
          full_name: newInquiry.fullName,
          company_name: newInquiry.companyName,
          email: newInquiry.email,
          phone: newInquiry.phone,
          country: newInquiry.country,
          destination_port: newInquiry.destinationPort || newInquiry.country,
          product_name: newInquiry.productName,
          volume_mt: newInquiry.volumeMT,
          incoterms: newInquiry.incoterms,
          packaging: newInquiry.packaging,
          notes: newInquiry.notes,
          status: 'New',
          created_at: newInquiry.created_at,
          updated_at: newInquiry.created_at,
        };
        await supabase.from('inquiries').insert([dbPayload]);
      } catch (dbErr) {
        console.warn('[inquiryRepository] Supabase direct write fallback notice:', dbErr);
      }
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
