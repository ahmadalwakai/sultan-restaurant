// PWA utilities and configurations
export { registerServiceWorker, unregisterServiceWorker, updateServiceWorker } from './register-sw';
export { CACHE_STRATEGIES, CACHE_CONFIG, cacheFirst, networkFirst, staleWhileRevalidate, shouldCacheRequest, getCacheStrategy, cleanupOldCaches, getCacheSize, clearCache, clearAllCaches } from './cache-strategies';
export { OFFLINE_CONTENT, generateOfflineMenuHTML, isOnline, onOnlineStatusChange, OfflineQueue, offlineQueue } from './offline-fallback';
export { PRECACHE_MANIFEST, RUNTIME_CACHE_PATTERNS, CACHE_EXCLUSIONS, getPrecacheManifest, shouldPrecache, shouldRuntimeCache, shouldExcludeFromCache, getCacheKey, generateCacheManifest } from './precache-manifest';
export { SW_EVENTS, SW_STATES, handleInstall, handleActivate, handleFetch, handlePush, handleSync, handleMessage, handleNotificationClick, handleNotificationClose, registerSwEvents } from './sw-events';

// Re-export types
export type { CacheStrategy } from './cache-strategies';
export type { SwEvent, SwState } from './sw-events';