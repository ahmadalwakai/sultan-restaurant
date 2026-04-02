'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const gapClasses = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export default function ResponsiveGrid({
  children,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
  className,
}: ResponsiveGridProps) {
  const gridClasses = [
    'grid',
    columns.default && `grid-cols-${columns.default}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
  ].filter(Boolean);

  return (
    <div
      className={cn(
        gridClasses,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}