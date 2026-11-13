import { useState, useEffect, useCallback } from 'react';
import { initialProducts } from '@/data/products';
import { supabase } from '@/lib/supabaseClient';
import { apiClient } from '@/lib/apiClient';

const STORAGE_KEY = 'modular_traders_products_v6';

/**
 * Storage Helper for Local Storage persistence with initial fallback
 */
function getStoredProducts() {
  if (typeof window === 'undefined') return initialProducts;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialProducts;
  } catch (err) {
    console.error('Failed to read products from localStorage:', err);
    return initialProducts;
  }
}

function saveProducts(products) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('modular_products_updated'));
  } catch (err) {
    console.error('Failed to save products to localStorage:', err);
  }
}

/**
 * Product Repository Interface & Implementation
 * Connects to Node.js serverless backend (/api/products), Supabase DB, with offline localStorage fallback
 */
export const productRepository = {
  /**
   * Fetch all products (including inactive for admin)
   */
  async getAll() {
    try {
      const res = await apiClient.products.getAll(true);
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        saveProducts(res.data);
        return [...res.data].sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    } catch {
      // Offline fallback
    }

    const products = getStoredProducts();
    return [...products].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  /**
   * Fetch only active products for the public catalog
   */
  async getActive() {
    try {
      const res = await apiClient.products.getAll(false);
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        return [...res.data].sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    } catch {
      // Offline fallback
    }

    const all = await this.getAll();
    return all.filter((item) => item.active !== false);
  },

  /**
   * Find product by its URL slug
   */
  async getBySlug(slug) {
    try {
      const res = await apiClient.products.getBySlugOrId(slug);
      if (res?.data) return res.data;
    } catch {}

    const all = await this.getAll();
    return all.find((item) => item.slug === slug) || null;
  },

  /**
   * Find product by ID
   */
  async getById(id) {
    try {
      const res = await apiClient.products.getBySlugOrId(id);
      if (res?.data) return res.data;
    } catch {}

    const all = await this.getAll();
    return all.find((item) => item.id === id) || null;
  },

  /**
   * Create a new product entry
   */
  async create(data) {
    const all = await this.getAll();
    const newId = `prod-${Date.now()}`;
    const slug =
      data.slug ||
      data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newProduct = {
      id: newId,
      order: all.length + 1,
      active: true,
      featured: false,
      slug,
      ...data,
      specs: data.specs || {},
      packagingOptions: data.packagingOptions || [],
    };

    const updated = [...all, newProduct];
    saveProducts(updated);

    try {
      await apiClient.products.create(newProduct);
    } catch (err) {
      console.warn('[productRepository] Server create sync notice:', err.message);
    }

    return newProduct;
  },

  /**
   * Update an existing product
   */
  async update(id, updates) {
    const all = await this.getAll();
    const index = all.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Product not found');

    all[index] = { ...all[index], ...updates };
    saveProducts(all);

    try {
      await apiClient.products.update(id, updates);
    } catch (err) {
      console.warn('[productRepository] Server update sync notice:', err.message);
    }

    return all[index];
  },

  /**
   * Delete a product
   */
  async delete(id) {
    const all = await this.getAll();
    const filtered = all.filter((item) => item.id !== id);
    saveProducts(filtered);

    try {
      await apiClient.products.delete(id);
    } catch (err) {
      console.warn('[productRepository] Server delete sync notice:', err.message);
    }

    return true;
  },

  /**
   * Toggle product active state
   */
  async toggleActive(id) {
    const all = await this.getAll();
    const product = all.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return this.update(id, { active: !product.active });
  },

  /**
   * Reorder products
   */
  async reorder(orderedIds) {
    const all = await this.getAll();
    const updated = all.map((item) => {
      const newOrder = orderedIds.indexOf(item.id);
      return newOrder !== -1 ? { ...item, order: newOrder + 1 } : item;
    });
    saveProducts(updated);
    return updated;
  },

  /**
   * Reset to default catalogue
   */
  async resetToDefaults() {
    saveProducts(initialProducts);
    return initialProducts;
  },
};

/**
 * React Hook for consuming products
 */
export function useProducts(activeOnly = true) {
  const [products, setProducts] = useState(() => {
    const stored = getStoredProducts();
    const sorted = [...stored].sort((a, b) => (a.order || 0) - (b.order || 0));
    return activeOnly ? sorted.filter((p) => p.active !== false) : sorted;
  });
  // Instant load: never block the initial render with a loading spinner
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const data = activeOnly
        ? await productRepository.getActive()
        : await productRepository.getAll();
      if (data && data.length > 0) {
        setProducts(data);
      }
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetchProducts();

    const handleUpdate = () => {
      const stored = getStoredProducts();
      const sorted = [...stored].sort((a, b) => (a.order || 0) - (b.order || 0));
      setProducts(activeOnly ? sorted.filter((p) => p.active !== false) : sorted);
    };

    window.addEventListener('modular_products_updated', handleUpdate);
    return () => window.removeEventListener('modular_products_updated', handleUpdate);
  }, [fetchProducts, activeOnly]);

  return { products, loading, refresh: fetchProducts };
}

/**
 * React Hook for single product lookup by slug (Instant 0ms synchronous render with background sync)
 */
export function useProductBySlug(slug) {
  const [product, setProduct] = useState(() => {
    const stored = getStoredProducts();
    return stored.find((p) => p.slug === slug || p.id === slug) || null;
  });
  const [loading, setLoading] = useState(() => !product);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const item = await productRepository.getBySlug(slug);
        if (isMounted && item) setProduct(item);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    if (slug) {
      load();
    } else {
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { product, loading };
}

