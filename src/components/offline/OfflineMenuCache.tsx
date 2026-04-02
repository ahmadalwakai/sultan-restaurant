'use client';

import { useState, useEffect } from 'react';
import { Menu, Clock, Wifi, WifiOff } from 'lucide-react';

interface CachedMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface CachedMenuCategory {
  id: string;
  name: string;
  items: CachedMenuItem[];
}

export default function OfflineMenuCache() {
  const [isOnline, setIsOnline] = useState(true);
  const [cachedMenu, setCachedMenu] = useState<CachedMenuCategory[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load cached menu data
    loadCachedMenu();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadCachedMenu = async () => {
    try {
      // Try to load from IndexedDB or localStorage
      const cached = localStorage.getItem('sultan_cached_menu');
      if (cached) {
        const menuData = JSON.parse(cached);
        setCachedMenu(menuData.categories || []);
        setLastUpdated(new Date(menuData.timestamp));
      }
    } catch (error) {
      console.error('Error loading cached menu:', error);
    }
  };

  if (isOnline || cachedMenu.length === 0) {
    return null;
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center space-x-2 text-amber-700">
          <WifiOff size={20} />
          <span className="font-medium">Offline Mode</span>
        </div>
        {lastUpdated && (
          <div className="flex items-center space-x-1 text-sm text-amber-600">
            <Clock size={14} />
            <span>Last updated: {lastUpdated.toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-amber-800">
          <Menu size={18} />
          <span className="font-medium">Cached Menu Available</span>
        </div>

        <p className="text-amber-700 text-sm">
          You're viewing a cached version of our menu. Prices and availability may have changed.
          Connect to the internet to see the latest menu and place orders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {cachedMenu.slice(0, 6).map((category) => (
            <div key={category.id} className="bg-white rounded-lg p-4 border border-amber-200">
              <h3 className="font-medium text-gray-900 mb-2">{category.name}</h3>
              <div className="space-y-2">
                {category.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600 line-clamp-1">{item.description}</p>
                    </div>
                    <span className="text-sm font-medium text-amber-700 ml-2">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
                {category.items.length > 3 && (
                  <p className="text-xs text-gray-500">
                    +{category.items.length - 3} more items
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-amber-200">
          <p className="text-sm text-amber-700">
            Showing {cachedMenu.reduce((total, cat) => total + cat.items.length, 0)} cached items
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
          >
            Refresh when online
          </button>
        </div>
      </div>
    </div>
  );
}