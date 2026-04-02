'use client';

import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-4 py-2',
  md: 'px-6 py-4',
  lg: 'px-8 py-6',
};

export default function ResponsiveContainer({
  children,
  className,
  maxWidth = '2xl',
  padding = 'md',
  center = true,
}: ResponsiveContainerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        center && 'mx-auto',
        paddingClasses[padding],
        isMobile && 'px-4', // Force consistent mobile padding
        className
      )}
    >
      {children}
    </div>
  );
}