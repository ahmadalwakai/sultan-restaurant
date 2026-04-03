// Service Worker for Sultan Restaurant PWA
const CACHE_NAME = 'sultan-restaurant-v1.1.0';
const STATIC_CACHE = 'sultan-static-v1.1.0';
const DYNAMIC_CACHE = 'sultan-dynamic-v1.1.0';
const MENU_CACHE = 'sultan-menu-v1.1.0';

// Critical assets to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
  '/offline',
  '/menu',
  '/fonts/poppins-regular.woff2',
  '/fonts/poppins-semibold.woff2',
  '/fonts/poppins-bold.woff2',
];

// Menu-specific assets for offline access
const MENU_ASSETS = [
  '/api/menu',
  '/api/menu/categories',
  '/api/menu/featured',
];

// Runtime cacheable assets
const RUNTIME_ASSETS = [
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//,
  /^https:\/\/images\.unsplash\.com\//,
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE)
        .then(cache => {
          console.log('[SW] Caching critical assets');
          return cache.addAll(CRITICAL_ASSETS);
        }),
      // Cache menu data for offline access
      caches.open(MENU_CACHE)
        .then(cache => {
          console.log('[SW] Caching menu data for offline');
          return Promise.allSettled(
            MENU_ASSETS.map(url => 
              fetch(url)
                .then(response => {
                  if (response.ok) {
                    return cache.put(url, response);
                  }
                })
                .catch(() => console.log('[SW] Could not cache:', url))
            )
          );
        }),
    ]).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, MENU_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') return;

  // Handle menu API requests with stale-while-revalidate for offline support
  if (url.pathname.startsWith('/api/menu')) {
    event.respondWith(staleWhileRevalidate(request, MENU_CACHE));
    return;
  }

  // Handle other API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Handle images with cache-first strategy
  if (request.destination === 'image' || isImageRequest(request)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Default: network-first for HTML pages
  event.respondWith(networkFirstStrategy(request));
});

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache-first failed:', error);
    return caches.match('/offline');
  }
}

// Network-first strategy for dynamic content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network-first failed:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }
    throw error;
  }
}

// Stale-while-revalidate for menu data (best for offline support)
async function staleWhileRevalidate(request, cacheName = MENU_CACHE) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Fetch fresh data in background
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(error => {
      console.log('[SW] Stale-while-revalidate fetch failed:', error);
      return null;
    });

  // Return cached response immediately if available, otherwise wait for network
  if (cachedResponse) {
    console.log('[SW] Serving menu from cache');
    return cachedResponse;
  }
  
  const networkResponse = await fetchPromise;
  if (networkResponse) {
    return networkResponse;
  }
  
  // If both cache and network fail, return offline-safe response
  return new Response(
    JSON.stringify({ 
      error: 'Offline',
      message: 'Menu data not available offline. Please check your connection.',
      offline: true 
    }),
    { 
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// Check if request is for a static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  const staticExtensions = ['.js', '.css', '.woff2', '.woff', '.ttf', '.eot'];
  return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

// Check if request is for an image
function isImageRequest(request) {
  const url = new URL(request.url);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return imageExtensions.some(ext => url.pathname.endsWith(ext));
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'background-sync-cart') {
    event.waitUntil(syncCartChanges());
  }

  if (event.tag === 'background-sync-orders') {
    event.waitUntil(syncPendingOrders());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);

  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: data.data,
    actions: data.actions || [],
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click:', event);
  event.notification.close();

  const action = event.action;
  const data = event.notification.data;

  if (action === 'view-order') {
    event.waitUntil(
      clients.openWindow(`/orders/${data.orderId}`)
    );
  } else if (action === 'view-menu') {
    event.waitUntil(
      clients.openWindow('/menu')
    );
  } else {
    // Default action - open home
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sync cart changes when back online
async function syncCartChanges() {
  try {
    const cartData = await getStoredCartData();
    if (cartData && cartData.length > 0) {
      // Sync with server
      await fetch('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes: cartData }),
      });
      // Clear stored data
      await clearStoredCartData();
    }
  } catch (error) {
    console.error('[SW] Cart sync failed:', error);
  }
}

// Sync pending orders when back online
async function syncPendingOrders() {
  try {
    const pendingOrders = await getStoredPendingOrders();
    if (pendingOrders && pendingOrders.length > 0) {
      for (const order of pendingOrders) {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        });
      }
      await clearStoredPendingOrders();
    }
  } catch (error) {
    console.error('[SW] Order sync failed:', error);
  }
}

// IndexedDB helpers (simplified)
async function getStoredCartData() {
  // Implementation would use IndexedDB
  return null;
}

async function clearStoredCartData() {
  // Implementation would use IndexedDB
}

async function getStoredPendingOrders() {
  // Implementation would use IndexedDB
  return null;
}

async function clearStoredPendingOrders() {
  // Implementation would use IndexedDB
}