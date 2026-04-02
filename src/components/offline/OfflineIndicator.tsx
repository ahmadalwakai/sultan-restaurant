'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface OfflineIndicatorProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function OfflineIndicator({
  position = 'top-right',
  showLabel = false,
  size = 'md'
}: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      // Auto-hide after 3 seconds when back online
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showIndicator) return null;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-40 transition-all duration-300 ${
        showIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div
        className={`${
          sizeClasses[size]
        } rounded-full flex items-center justify-center shadow-lg ${
          isOnline
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white animate-pulse'
        }`}
        role="status"
        aria-label={isOnline ? 'Online' : 'Offline'}
      >
        {isOnline ? (
          <Wifi size={iconSizes[size]} />
        ) : (
          <WifiOff size={iconSizes[size]} />
        )}
      </div>

      {showLabel && (
        <div
          className={`absolute top-full mt-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
            isOnline
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {isOnline ? 'Online' : 'Offline'}
        </div>
      )}
    </div>
  );
}