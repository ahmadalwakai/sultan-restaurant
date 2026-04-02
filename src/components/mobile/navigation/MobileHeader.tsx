'use client';

import { useState } from 'react';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  showProfile?: boolean;
  onMenuToggle?: () => void;
  onSearchToggle?: () => void;
  className?: string;
}

export default function MobileHeader({
  title = 'Sultan Restaurant',
  showBack = false,
  showSearch = true,
  showCart = true,
  showProfile = true,
  onMenuToggle,
  onSearchToggle,
  className,
}: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.();
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-white border-b border-gray-200',
        'safe-area-top pt-safe',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Menu/Back button */}
        <div className="flex items-center">
          {showBack ? (
            <button
              onClick={() => window.history.back()}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleMenuToggle}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        {/* Center - Title */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-1">
          {showSearch && (
            <button
              onClick={onSearchToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          )}

          {showCart && (
            <Link
              href="/cart"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
            </Link>
          )}

          {showProfile && (
            <Link
              href="/account"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="User profile"
            >
              <User size={20} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}