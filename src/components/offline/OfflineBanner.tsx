'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setIsVisible(true);
      // Auto-hide after 3 seconds when back online
      setTimeout(() => setIsVisible(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsVisible(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 p-4 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`max-w-md mx-auto rounded-lg shadow-lg p-4 flex items-center justify-between ${
          isOnline
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="text-xl">
            {isOnline ? '📶' : '📵'}
          </div>
          <div>
            <p className="font-medium">
              {isOnline ? 'Back Online' : 'You\'re Offline'}
            </p>
            <p className="text-sm opacity-90">
              {isOnline
                ? 'Connection restored'
                : 'Some features may be limited'
              }
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Dismiss"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}