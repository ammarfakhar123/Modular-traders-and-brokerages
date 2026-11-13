/**
 * Subdomain and Domain Routing Helpers for Modular Traders & Brokerage
 * Supports both Production Subdomains and Local Development
 */

export function isAdminSubdomain() {
  if (typeof window === 'undefined') return false;

  const { hostname, search } = window.location;
  const lowerHost = hostname.toLowerCase();

  // 1. Explicit query parameter override (ideal for local testing e.g. localhost:3000/?subdomain=admin)
  const params = new URLSearchParams(search);
  if (params.get('subdomain') === 'admin') {
    return true;
  }

  // 2. Subdomain check (admin.yourdomain.com or admin.localhost)
  if (lowerHost.startsWith('admin.')) {
    return true;
  }

  return false;
}

/**
 * Returns the base URL or path for the Admin Subdomain
 */
export function getAdminBaseUrl(targetPath = '/products') {
  if (typeof window === 'undefined') return targetPath;

  const { protocol, hostname, port } = window.location;
  const portSuffix = port ? `:${port}` : '';
  const cleanPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;

  // If already on the admin subdomain, just return the relative path
  if (isAdminSubdomain()) {
    return cleanPath;
  }

  // Local development fallback
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // If the browser supports admin.localhost, redirect there; otherwise use /admin path
    return `http://admin.localhost${portSuffix}${cleanPath}`;
  }

  // Production: Prepend admin. to root domain
  // e.g. "modularagro.com" -> "https://admin.modularagro.com/products"
  const apexDomain = hostname.replace(/^www\./, '');
  return `${protocol}//admin.${apexDomain}${cleanPath}`;
}

/**
 * Returns the URL for returning back to the public website from the Admin Subdomain
 */
export function getPublicWebsiteUrl(targetPath = '/') {
  if (typeof window === 'undefined') return targetPath;

  const { protocol, hostname, port } = window.location;
  const portSuffix = port ? `:${port}` : '';
  const cleanPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;

  if (!isAdminSubdomain()) {
    return cleanPath;
  }

  if (hostname.startsWith('admin.localhost')) {
    return `http://localhost${portSuffix}${cleanPath}`;
  }

  // Strip admin. prefix in production
  const rootDomain = hostname.replace(/^admin\./, '');
  return `${protocol}//${rootDomain}${portSuffix}${cleanPath}`;
}
