'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, ShoppingCart, User, Phone } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface BottomNavigationProps {
  className?: string;
}

const navigationItems = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
    activePaths: ['/'],
  },
  {
    label: 'Menu',
    href: '/menu',
    icon: Menu,
    activePaths: ['/menu'],
  },
  {
    label: 'Cart',
    href: '/cart',
    icon: ShoppingCart,
    activePaths: ['/cart'],
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Phone,
    activePaths: ['/contact'],
  },
  {
    label: 'Account',
    href: '/account',
    icon: User,
    activePaths: ['/account', '/auth'],
  },
];

export default function BottomNavigation({ className }: BottomNavigationProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  const isActive = (item: typeof navigationItems[0]) => {
    return item.activePaths.some(path =>
      pathname === path || pathname.startsWith(path + '/')
    );
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200',
        'safe-area-bottom pb-safe',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200',
                'min-h-[44px] min-w-[44px]', // Touch target size
                active
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
              )}
              onClick={() => setActiveTab(item.href)}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                size={20}
                className={cn(
                  'transition-transform duration-200',
                  active && 'scale-110'
                )}
              />
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}