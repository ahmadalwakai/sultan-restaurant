'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Menu as MenuIcon,
  ShoppingCart,
  User,
  Phone,
  BookOpen,
  Truck,
  Gift,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
    description: 'Restaurant homepage',
  },
  {
    label: 'Menu',
    href: '/menu',
    icon: MenuIcon,
    description: 'Browse our dishes',
  },
  {
    label: 'Book Table',
    href: '/book',
    icon: BookOpen,
    description: 'Reserve a table',
  },
  {
    label: 'Delivery',
    href: '/delivery',
    icon: Truck,
    description: 'Order for delivery',
  },
  {
    label: 'Pickup',
    href: '/pickup',
    icon: ShoppingCart,
    description: 'Order for pickup',
  },
  {
    label: 'Offers',
    href: '/offers',
    icon: Gift,
    description: 'Special deals',
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Phone,
    description: 'Get in touch',
  },
];

const accountItems = [
  {
    label: 'My Account',
    href: '/account',
    icon: User,
    description: 'Manage your profile',
  },
  {
    label: 'Order History',
    href: '/account/orders',
    icon: ShoppingCart,
    description: 'View past orders',
  },
  {
    label: 'Settings',
    href: '/account/settings',
    icon: Settings,
    description: 'App preferences',
  },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50',
          'transform transition-transform duration-300 ease-out',
          'safe-area-top pt-safe',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Navigation
            </h3>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      'flex items-center px-3 py-3 rounded-lg transition-colors',
                      active
                        ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                    )}
                  >
                    <Icon size={20} className="mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Account Section */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Account
            </h3>
            <nav className="space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      'flex items-center px-3 py-3 rounded-lg transition-colors',
                      active
                        ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                    )}
                  >
                    <Icon size={20} className="mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center w-full px-3 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-lg transition-colors">
              <LogOut size={20} className="mr-3 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium">Sign Out</div>
                <div className="text-sm text-gray-500">End your session</div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center text-sm text-gray-500">
            Sultan Restaurant © 2024
          </div>
        </div>
      </div>
    </>
  );
}