import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { settingsRepository } from '@/repositories/settingsRepository';

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
 * Dispatch trade inquiry via email to the active Admin Receiving Email
 */
async function dispatchInquiryEmail(inquiry, targetEmail) {
  if (!targetEmail || !targetEmail.includes('@')) return { ok: false, reason: 'Invalid target email' };

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `New Rice Trade Inquiry: ${inquiry.productName || 'General Inquiry'} (${inquiry.companyName || inquiry.fullName})`,
        _template: 'table',
        _captcha: 'false',
        _replyto: inquiry.email || targetEmail,
        'Full Name': inquiry.fullName || 'N/A',
        'Company Name': inquiry.companyName || 'N/A',
        'Buyer Email': inquiry.email || 'N/A',
        'Phone / WhatsApp': inquiry.phone || 'N/A',
        'Country / Destination': inquiry.country || inquiry.destinationPort || 'N/A',
        'Product / Service': inquiry.productName || 'N/A',
        'Estimated Quantity': inquiry.volumeMT || 'Not Specified',
        'Commercial Terms': inquiry.incoterms || 'Standard',
        'Packaging': inquiry.packaging || 'Standard',
        'Requirements / Message': inquiry.notes || 'No message provided',
      }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.warn('Email dispatch error:', err);
    return { ok: false, error: err.message };
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
   * Submit and save a new inquiry + optionally forward to Admin Email
   */
  async create(inquiryData) {
    const settings = settingsRepository.get();
    const shouldEmail = Boolean(settings.receiveInquiriesByEmail && settings.inquiryNotificationEmail);

    const all = await this.getAll();
    const newInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      created_at: new Date().toISOString(),
      status: 'New',
      emailForwardedTo: shouldEmail ? settings.inquiryNotificationEmail : 'Disabled',
      ...inquiryData,
    };

    const updated = [newInquiry, ...all];
    saveStoredInquiries(updated);

    // Attempt saving via Supabase client asynchronously
    try {
      await supabase.from('inquiries').insert(newInquiry);
    } catch (e) {
      // Graceful fallback already handled
    }

    // Forward to Admin Receiving Email if enabled in Admin Settings
    if (shouldEmail) {
      await dispatchInquiryEmail(newInquiry, settings.inquiryNotificationEmail);
    }

    return newInquiry;
  },

  /**
   * Send a test notification email from Admin Settings
   */
  async sendTestNotification(targetEmail) {
    return dispatchInquiryEmail(
      {
        fullName: 'Modular Traders System Verification',
        companyName: 'Modular Traders and Brokerage (Karachi HQ)',
        email: targetEmail,
        phone: '+92 3144447656',
        country: 'Pakistan',
        productName: 'Email Notification Test (Super Kernel Basmati & Portfolio)',
        volumeMT: 'Test Verification',
        incoterms: 'N/A',
        packaging: 'N/A',
        notes: `This is a test verification confirming that customer inquiries from Modular Traders website will be delivered to: ${targetEmail}`,
      },
      targetEmail
    );
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
   * Delete a single inquiry
   */
  async delete(id) {
    return this.bulkDelete([id]);
  },

  /**
   * Bulk delete multiple inquiries by ID
   */
  async bulkDelete(ids) {
    const idSet = new Set(ids || []);
    const all = await this.getAll();
    const filtered = all.filter((item) => !idSet.has(item.id));
    saveStoredInquiries(filtered);

    // Attempt deletion via Supabase client silently if configured
    for (const id of idSet) {
      try {
        await supabase.from('inquiries').delete().eq('id', id);
      } catch {
        // Fallback already handled in localStorage
      }
    }

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
