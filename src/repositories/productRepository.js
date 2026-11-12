import { useState, useEffect, useCallback } from 'react';
import { initialProducts } from '@/data/products';
import { supabase } from '@/lib/supabaseClient';

const STORAGE_KEY = 'modular_traders_products_v3';

/**
 * Storage Helper for Local Storage persistence with initial fallback
 */
function getStoredProducts() {
  if (typeof window === 'undefined') return initialProducts;
  try {
    // Clean up legacy cached product catalogs
    localStorage.removeItem('modular_traders_products_v1');
    localStorage.removeItem('modular_traders_products_v2');
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
    // Trigger custom event so all open hooks re-render automatically
    window.dispatchEvent(new Event('modular_products_updated'));
  } catch (err) {
    console.error('Failed to save products to localStorage:', err);
  }
}

/**
 * Product Repository Interface & Implementation (Mock / Client Data Layer)
 * 
 * In Module 2, this exact contract will be backed by Supabase DB
 * without needing any frontend UI component changes.
 */
export const productRepository = {
  /**
   * Fetch all products (including inactive, sorted by order)
   */
  async getAll() {
    const products = getStoredProducts();
    return [...products].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  /**
   * Fetch only active products for the public catalog
   */
  async getActive() {
    const all = await this.getAll();
    return all.filter((item) => item.active !== false);
  },

  /**
   * Find product by its URL slug
   */
  async getBySlug(slug) {
    const all = await this.getAll();
    return all.find((item) => item.slug === slug) || null;
  },

  /**
   * Find product by ID
   */
  async getById(id) {
    const all = await this.getAll();
    return all.find((item) => item.id === id) || null;
  },

  /**
   * Create a new product entry
   */
  async create(data) {
    const all = await this.getAll();
    const newId = `prod-${Date.now()}`;
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
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
    return newProduct;
  },

  /**
   * Update an existing product by ID
   */
  async update(id, data) {
    const all = await this.getAll();
    const index = all.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    const updatedProduct = {
      ...all[index],
      ...data,
      specs: { ...all[index].specs, ...(data.specs || {}) },
    };

    const updatedList = [...all];
    updatedList[index] = updatedProduct;
    saveProducts(updatedList);
    return updatedProduct;
  },

  /**
   * Delete a product by ID
   */
  async delete(id) {
    const all = await this.getAll();
    const filtered = all.filter((item) => item.id !== id);
    saveProducts(filtered);
    return true;
  },

  /**
   * Reorder products
   */
  async reorder(orderedIds) {
    const all = await this.getAll();
    const reordered = orderedIds.map((id, index) => {
      const match = all.find((item) => item.id === id);
      return match ? { ...match, order: index + 1 } : null;
    }).filter(Boolean);

    saveProducts(reordered);
    return reordered;
  },

  /**
   * Reset repository to pristine initial demo products
   */
  async resetToDefaults() {
    saveProducts(initialProducts);
    return initialProducts;
  },
};

/**
 * React Hook for consuming products reactively across components
 */
export function useProducts(onlyActive = true) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const data = onlyActive
      ? await productRepository.getActive()
      : await productRepository.getAll();
    setProducts(data);
    setLoading(false);
  }, [onlyActive]);

  useEffect(() => {
    fetchProducts();

    const handleUpdate = () => {
      fetchProducts();
    };

    window.addEventListener('modular_products_updated', handleUpdate);
    return () => {
      window.removeEventListener('modular_products_updated', handleUpdate);
    };
  }, [fetchProducts]);

  return { products, loading, refresh: fetchProducts };
}

/**
 * React Hook for single product detail
 */
export function useProductBySlug(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    const item = await productRepository.getBySlug(slug);
    setProduct(item);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchProduct();

    const handleUpdate = () => {
      fetchProduct();
    };

    window.addEventListener('modular_products_updated', handleUpdate);
    return () => {
      window.removeEventListener('modular_products_updated', handleUpdate);
    };
  }, [fetchProduct]);

  return { product, loading, refresh: fetchProduct };
}
