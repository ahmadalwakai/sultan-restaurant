// Cache strategies for PWA
export const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only',
} as const;

export type CacheStrategy = typeof CACHE_STRATEGIES[keyof typeof CACHE_STRATEGIES];

// Cache configuration
export const CACHE_CONFIG = {
  static: {
    name: 'sultan-static-v1.0.0',
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  dynamic: {
    name: 'sultan-dynamic-v1.0.0',
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    maxAge: 60 * 60 * 1000, // 1 hour
  },
  images: {
    name: 'sultan-images-v1.0.0',
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  api: {
    name: 'sultan-api-v1.0.0',
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    maxAge: 5 * 60 * 1000, // 5 minutes
  },
};

// Cache-first strategy implementation
export async function cacheFirst(request: Request): Promise<Response> {
  try {
    const cache = await caches.open(CACHE_CONFIG.static.name);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[Cache] Cache-first failed:', error);
    throw error;
  }
}

// Network-first strategy implementation
export async function networkFirst(request: Request): Promise<Response> {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_CONFIG.dynamic.name);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[Cache] Network-first failed, trying cache:', error);
    const cache = await caches.open(CACHE_CONFIG.dynamic.name);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}

// Stale-while-revalidate strategy
export async function staleWhileRevalidate(request: Request): Promise<Response> {
  const cache = await caches.open(CACHE_CONFIG.dynamic.name);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Check if asset should be cached
export function shouldCacheRequest(request: Request): boolean {
  const url = new URL(request.url);

  // Don't cache non-GET requests
  if (request.method !== 'GET') return false;

  // Don't cache Chrome extension requests
  if (url.protocol === 'chrome-extension:') return false;

  // Don't cache admin routes
  if (url.pathname.startsWith('/admin')) return false;

  // Don't cache auth routes
  if (url.pathname.startsWith('/api/auth')) return false;

  return true;
}

// Get appropriate cache strategy for request
export function getCacheStrategy(request: Request): CacheStrategy {
  const url = new URL(request.url);

  // API requests: network-first
  if (url.pathname.startsWith('/api/')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Images: cache-first
  if (request.destination === 'image' ||
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // Static assets: cache-first
  if (/\.(js|css|woff2?|ttf|eot)$/i.test(url.pathname)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // HTML pages: network-first
  if (request.destination === 'document' || request.mode === 'navigate') {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Default: stale-while-revalidate
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
}

// Clean up old caches
export async function cleanupOldCaches(): Promise<void> {
  const cacheNames = await caches.keys();
  const validCacheNames = Object.values(CACHE_CONFIG).map(config => config.name);

  const cleanupPromises = cacheNames
    .filter(name => !validCacheNames.includes(name))
    .map(name => caches.delete(name));

  await Promise.all(cleanupPromises);
}

// Get cache size (approximate)
export async function getCacheSize(cacheName: string): Promise<number> {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    return keys.length;
  } catch (error) {
    console.error('[Cache] Error getting cache size:', error);
    return 0;
  }
}

// Clear specific cache
export async function clearCache(cacheName: string): Promise<void> {
  try {
    await caches.delete(cacheName);
    console.log(`[Cache] Cleared cache: ${cacheName}`);
  } catch (error) {
    console.error(`[Cache] Error clearing cache ${cacheName}:`, error);
  }
}

// Clear all caches
export async function clearAllCaches(): Promise<void> {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('[Cache] Cleared all caches');
}