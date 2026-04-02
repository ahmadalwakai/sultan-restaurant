'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface SkipLinkProps {
  href: string;
  children: string;
  className?: string;
}

export default function SkipLink({ href, children, className }: SkipLinkProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsVisible(true);
      }
    };

    const handleClick = () => {
      setIsVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <a
      href={href}
      className={cn(
        'fixed top-4 left-4 z-50 bg-orange-600 text-white px-4 py-2 rounded-md',
        'font-medium text-sm transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
        'transform -translate-y-full',
        isVisible && 'translate-y-0',
        className
      )}
    >
      {children}
    </a>
  );
}