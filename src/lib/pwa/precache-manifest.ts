// Precache manifest for critical assets
export const PRECACHE_MANIFEST: (string | RegExp)[] = [
  // Core app assets
  '/',
  '/manifest.json',
  '/offline',

  // Critical pages
  '/menu',
  '/book',
  '/contact',

  // Fonts (add your actual font URLs)
  // '/fonts/inter-var.woff2',

  // Icons
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',

  // Critical CSS/JS (add your actual build files)
  // '/_next/static/css/main.css',
  // '/_next/static/js/main.js',
];

// Runtime cacheable assets patterns
export const RUNTIME_CACHE_PATTERNS = [
  // Google Fonts
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//,

  // Images
  /^https:\/\/images\.unsplash\.com\//,
  /\.(jpg|jpeg|png|gif|webp|svg)$/,

  // API responses (with short cache)
  /^\/api\/menu$/,
  /^\/api\/categories$/,
];

// Assets to exclude from caching
export const CACHE_EXCLUSIONS = [
  // Admin routes
  /^\/admin/,

  // Auth routes
  /^\/api\/auth/,

  // Checkout/payment routes
  /^\/api\/checkout/,
  /^\/checkout/,

  // User-specific routes
  /^\/account/,
  /^\/orders/,

  // External links
  /^https?:\/\/(?!.*\.yourdomain\.com)/,
];

// Get precache manifest with version
export function getPrecacheManifest(version: string = '1.0.0'): string[] {
  return PRECACHE_MANIFEST.filter((asset): asset is string => typeof asset === 'string')
    .map(asset => {
      // Add cache-busting for static assets
      if (asset.includes('.')) {
        return `${asset}?v=${version}`;
      }
      return asset;
    });
}

// Check if URL should be precached
export function shouldPrecache(url: string): boolean {
  return PRECACHE_MANIFEST.some(asset => {
    if (typeof asset === 'string') {
      return url === asset || url.startsWith(asset);
    }
    return asset.test(url);
  });
}

// Check if URL should be runtime cached
export function shouldRuntimeCache(url: string): boolean {
  return RUNTIME_CACHE_PATTERNS.some(pattern => {
    if (typeof pattern === 'string') {
      return url.includes(pattern);
    }
    return pattern.test(url);
  });
}

// Check if URL should be excluded from caching
export function shouldExcludeFromCache(url: string): boolean {
  return CACHE_EXCLUSIONS.some(pattern => {
    if (typeof pattern === 'string') {
      return url.includes(pattern);
    }
    return pattern.test(url);
  });
}

// Get cache key for URL
export function getCacheKey(url: string, version: string = '1.0.0'): string {
  // Add version to cache key for cache invalidation
  return `${url}?v=${version}`;
}

// Generate cache manifest for service worker
export function generateCacheManifest(): string {
  const manifest = getPrecacheManifest();

  return `
// Precache manifest generated at ${new Date().toISOString()}
const PRECACHE_MANIFEST = ${JSON.stringify(manifest, null, 2)};

const RUNTIME_CACHE_PATTERNS = ${JSON.stringify(RUNTIME_CACHE_PATTERNS, null, 2)};

const CACHE_EXCLUSIONS = ${JSON.stringify(CACHE_EXCLUSIONS, null, 2)};
`;
}