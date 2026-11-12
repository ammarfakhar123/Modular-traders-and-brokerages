import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

const SETTINGS_STORAGE_KEY = 'modular_admin_settings_v1';

export const defaultAdminSettings = {
  receiveInquiriesByEmail: true,
  inquiryNotificationEmail: 'muhammadammarfakhar@gmail.com',
  savedEmails: ['muhammadammarfakhar@gmail.com'],
};

function getStoredSettings() {
  if (typeof window === 'undefined') return defaultAdminSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultAdminSettings));
      return defaultAdminSettings;
    }
    const parsed = JSON.parse(raw);
    return {
      ...defaultAdminSettings,
      ...parsed,
      savedEmails: Array.isArray(parsed.savedEmails) && parsed.savedEmails.length > 0
        ? parsed.savedEmails
        : defaultAdminSettings.savedEmails,
    };
  } catch (err) {
    console.error('Failed to read admin settings:', err);
    return defaultAdminSettings;
  }
}

export const settingsRepository = {
  get() {
    return getStoredSettings();
  },

  async save(newSettings) {
    const current = getStoredSettings();
    const emailTrimmed = (newSettings.inquiryNotificationEmail || '').trim();
    const updatedSaved = [...(current.savedEmails || [])];
    if (emailTrimmed && !updatedSaved.includes(emailTrimmed)) {
      updatedSaved.unshift(emailTrimmed);
    }

    const merged = {
      ...current,
      ...newSettings,
      inquiryNotificationEmail: emailTrimmed || current.inquiryNotificationEmail,
      savedEmails: updatedSaved.slice(0, 5), // Keep up to 5 recent/saved admin emails
      updated_at: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new Event('modular_settings_updated'));
    }

    // Attempt Supabase sync silently if configured
    try {
      await supabase.from('site_settings').insert({
        id: 'admin-inquiry-routing',
        ...merged,
      });
    } catch {
      // Fallback safely handled via localStorage
    }

    return merged;
  },
};

export function useAdminSettings() {
  const [settings, setSettings] = useState(getStoredSettings());

  const refresh = useCallback(() => {
    setSettings(settingsRepository.get());
  }, []);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener('modular_settings_updated', handler);
    return () => window.removeEventListener('modular_settings_updated', handler);
  }, [refresh]);

  return { settings, refresh };
}
