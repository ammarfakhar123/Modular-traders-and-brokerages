/**
 * Universal Frontend API Client for Modular Traders & Brokerage
 * Calls the Node.js Express serverless backend at /api/*
 */

const API_BASE = '/api';

function getAuthHeader() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('modular_admin_session_v2');
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed.token) {
      return { Authorization: `Bearer ${parsed.token}` };
    }
  } catch {}
  return {};
}

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers || {}),
  };

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 2500) : null;

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      signal: options.signal || (controller ? controller.signal : undefined),
    });
    if (timeoutId) clearTimeout(timeoutId);

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json.error || `Request failed with status ${res.status}`);
    }
    return json;
  } catch (err) {
    if (timeoutId) clearTimeout(timeoutId);
    console.warn(`[apiClient] Notice on ${endpoint}:`, err.message);
    throw err;
  }
}

export const apiClient = {
  products: {
    async getAll(includeAll = false) {
      const q = includeAll ? '?all=true' : '';
      return request(`/products${q}`);
    },
    async getBySlugOrId(slugOrId) {
      return request(`/products/${encodeURIComponent(slugOrId)}`);
    },
    async create(data) {
      return request('/products', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    async update(id, data) {
      return request(`/products/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    async delete(id) {
      return request(`/products/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    },
  },

  enquiries: {
    async submit(data) {
      return request('/enquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    async getAll() {
      return request('/enquiries');
    },
    async update(id, updates) {
      return request(`/enquiries/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    },
    async delete(id) {
      return request(`/enquiries/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    },
  },

  auth: {
    async login(email, password) {
      return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },
    async logout() {
      return request('/auth/logout', { method: 'POST' });
    },
    async me() {
      return request('/auth/me');
    },
  },

  settings: {
    async get() {
      return request('/settings');
    },
    async update(data) {
      return request('/settings', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    async testEmail(targetEmail) {
      return request('/settings/test-email', {
        method: 'POST',
        body: JSON.stringify({ targetEmail }),
      });
    },
  },
};
