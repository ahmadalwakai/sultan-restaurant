// Service Worker lifecycle events and utilities

export const SW_EVENTS = {
  INSTALL: 'install',
  ACTIVATE: 'activate',
  FETCH: 'fetch',
  PUSH: 'push',
  SYNC: 'sync',
  MESSAGE: 'message',
  NOTIFICATION_CLICK: 'notificationclick',
  NOTIFICATION_CLOSE: 'notificationclose',
} as const;

export type SwEvent = typeof SW_EVENTS[keyof typeof SW_EVENTS];

// Service Worker states
export const SW_STATES = {
  INSTALLING: 'installing',
  INSTALLED: 'installed',
  ACTIVATING: 'activating',
  ACTIVATED: 'activated',
  REDUNDANT: 'redundant',
} as const;

export type SwState = typeof SW_STATES[keyof typeof SW_STATES];

// Service Worker event types
interface ExtendableEvent extends Event {
  waitUntil(f: Promise<any>): void;
}

interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Promise<Response> | Response): void;
}

interface PushEvent extends ExtendableEvent {
  data: PushMessageData | null;
}

interface PushMessageData {
  json(): any;
  text(): string;
  arrayBuffer(): ArrayBuffer;
  blob(): Blob;
}

interface SyncEvent extends ExtendableEvent {
  tag: string;
  lastChance?: boolean;
}

interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

interface NotificationOptions {
  body?: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  vibrate?: number[];
  data?: any;
  actions?: NotificationAction[];
}

interface NotificationEvent extends ExtendableEvent {
  notification: Notification;
  action: string;
}

interface Client {
  id: string;
  url: string;
  postMessage(message: any): void;
}

interface ServiceWorkerGlobalScope {
  skipWaiting(): Promise<void>;
  clients: {
    claim(): Promise<void>;
    matchAll(options?: { includeUncontrolled?: boolean }): Promise<ReadonlyArray<Client>>;
    openWindow(url: string): Promise<Client | null>;
  };
  registration: ServiceWorkerRegistration;
  addEventListener(type: 'install', listener: (event: ExtendableEvent) => void): void;
  addEventListener(type: 'activate', listener: (event: ExtendableEvent) => void): void;
  addEventListener(type: 'fetch', listener: (event: FetchEvent) => void): void;
  addEventListener(type: 'push', listener: (event: PushEvent) => void): void;
  addEventListener(type: 'sync', listener: (event: SyncEvent) => void): void;
  addEventListener(type: 'message', listener: (event: MessageEvent) => void): void;
  addEventListener(type: 'notificationclick', listener: (event: NotificationEvent) => void): void;
  addEventListener(type: 'notificationclose', listener: (event: NotificationEvent) => void): void;
  addEventListener(type: string, listener: EventListener): void;
}

// Declare service worker global
declare const self: ServiceWorkerGlobalScope & Window;

// Install event handler
export function handleInstall(event: ExtendableEvent): void {
  console.log('[SW Events] Install event fired');

  event.waitUntil(
    Promise.all([
      // Open cache and add critical assets
      caches.open('sultan-static-v1.0.0').then(cache => {
        return cache.addAll([
          '/',
          '/manifest.json',
          '/offline',
          '/icons/icon-192x192.png',
        ]);
      }),

      // Skip waiting to activate immediately
      self.skipWaiting(),
    ])
  );
}

// Activate event handler
export function handleActivate(event: ExtendableEvent): void {
  console.log('[SW Events] Activate event fired');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      cleanupOldCaches(),

      // Take control of all clients
      self.clients.claim(),
    ])
  );
}

// Fetch event handler
export function handleFetch(event: FetchEvent): void {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') return;

  // Handle different request types
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else if (request.destination === 'image' || isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === 'document' || request.mode === 'navigate') {
    event.respondWith(handleDocumentRequest(request));
  } else {
    event.respondWith(handleStaticRequest(request));
  }
}

// Push event handler
export function handlePush(event: PushEvent): void {
  console.log('[SW Events] Push event received');

  if (!event.data) return;

  const data = event.data.json();

  const options: NotificationOptions = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: data.data,
    actions: data.actions || [],
    requireInteraction: true,
    tag: data.tag || 'default',
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
}

// Sync event handler
export function handleSync(event: SyncEvent): void {
  console.log('[SW Events] Sync event:', event.tag);

  if (event.tag === 'background-sync-cart') {
    event.waitUntil(syncCartData());
  } else if (event.tag === 'background-sync-orders') {
    event.waitUntil(syncPendingOrders());
  }
}

// Message event handler
export function handleMessage(event: MessageEvent): void {
  console.log('[SW Events] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: '1.0.0' });
  }
}

// Notification click handler
export function handleNotificationClick(event: NotificationEvent): void {
  console.log('[SW Events] Notification clicked');
  event.notification.close();

  const action = event.action;
  const data = event.notification.data;

  let url = '/';

  if (action === 'view-order' && data?.orderId) {
    url = `/orders/${data.orderId}`;
  } else if (action === 'view-menu') {
    url = '/menu';
  } else if (action === 'view-bookings') {
    url = '/account/bookings';
  }

  event.waitUntil(
    self.clients.openWindow(url)
  );
}

// Notification close handler
export function handleNotificationClose(event: NotificationEvent): void {
  console.log('[SW Events] Notification closed');
  // Could track analytics here
}

// Helper functions

async function handleApiRequest(request: Request): Promise<Response> {
  try {
    // Network-first for API requests
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open('sultan-api-v1.0.0');
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Fallback to cache
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function handleImageRequest(request: Request): Promise<Response> {
  // Cache-first for images
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open('sultan-images-v1.0.0');
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return a placeholder or offline image
    const offlineResponse = await caches.match('/offline-image.png');
    return offlineResponse || new Response('', { status: 404 });
  }
}

async function handleDocumentRequest(request: Request): Promise<Response> {
  try {
    // Network-first for documents
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open('sultan-dynamic-v1.0.0');
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Fallback to cache, then offline page
    const cached = await caches.match(request);
    if (cached) return cached;
    const offlineResponse = await caches.match('/offline');
    return offlineResponse || new Response('Offline', { status: 503 });
  }
}

async function handleStaticRequest(request: Request): Promise<Response> {
  // Cache-first for static assets
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open('sultan-static-v1.0.0');
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    throw error;
  }
}

function isImageRequest(request: Request): boolean {
  const url = new URL(request.url);
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname);
}

async function cleanupOldCaches(): Promise<void> {
  const cacheNames = await caches.keys();
  const validCaches = ['sultan-static-v1.0.0', 'sultan-dynamic-v1.0.0', 'sultan-images-v1.0.0', 'sultan-api-v1.0.0'];

  await Promise.all(
    cacheNames
      .filter(name => !validCaches.includes(name))
      .map(name => caches.delete(name))
  );
}

async function syncCartData(): Promise<void> {
  // Implementation would sync cart data with server
  console.log('[SW Events] Syncing cart data...');
}

async function syncPendingOrders(): Promise<void> {
  // Implementation would sync pending orders with server
  console.log('[SW Events] Syncing pending orders...');
}

// Register all event listeners
export function registerSwEvents(): void {
  self.addEventListener(SW_EVENTS.INSTALL, handleInstall);
  self.addEventListener(SW_EVENTS.ACTIVATE, handleActivate);
  self.addEventListener(SW_EVENTS.FETCH, handleFetch);
  self.addEventListener(SW_EVENTS.PUSH, handlePush);
  self.addEventListener(SW_EVENTS.SYNC, handleSync);
  self.addEventListener(SW_EVENTS.MESSAGE, handleMessage);
  self.addEventListener(SW_EVENTS.NOTIFICATION_CLICK, handleNotificationClick);
  self.addEventListener(SW_EVENTS.NOTIFICATION_CLOSE, handleNotificationClose);
}