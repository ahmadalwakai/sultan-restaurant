'use client';

import { useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface StickyBarProps {
  children: ReactNode;
  position?: 'top' | 'bottom';
  showOnScroll?: boolean;
  hideOnScroll?: boolean;
  threshold?: number;
  className?: string;
}

export default function StickyBar({
  children,
  position = 'bottom',
  showOnScroll = false,
  hideOnScroll = false,
  threshold = 100,
  className,
}: StickyBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!showOnScroll && !hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (showOnScroll) {
        // Show bar when scrolling down past threshold
        setIsVisible(currentScrollY > threshold);
      } else if (hideOnScroll) {
        // Hide bar when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > threshold) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScroll, hideOnScroll, threshold, lastScrollY]);

  const positionClasses = {
    top: 'top-0',
    bottom: 'bottom-0',
  };

  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-40 transition-transform duration-300 ease-in-out',
        positionClasses[position],
        'safe-area-bottom pb-safe',
        isVisible ? 'translate-y-0' : position === 'top' ? '-translate-y-full' : 'translate-y-full',
        className
      )}
    >
      {children}
    </div>
  );
}