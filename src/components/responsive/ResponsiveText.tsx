'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ResponsiveTextProps {
  children: ReactNode;
  size?: {
    base?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    sm?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    md?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    lg?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    xl?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  };
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
};

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

export default function ResponsiveText({
  children,
  size = { base: 'base' },
  weight = 'normal',
  color,
  align = 'left',
  className,
  as: Component = 'p',
}: ResponsiveTextProps) {
  const sizeClasses = [
    size.base && textSizeClasses[size.base],
    size.sm && `sm:${textSizeClasses[size.sm]}`,
    size.md && `md:${textSizeClasses[size.md]}`,
    size.lg && `lg:${textSizeClasses[size.lg]}`,
    size.xl && `xl:${textSizeClasses[size.xl]}`,
  ].filter(Boolean);

  return (
    <Component
      className={cn(
        sizeClasses,
        weightClasses[weight],
        alignClasses[align],
        color && `text-${color}`,
        className
      )}
    >
      {children}
    </Component>
  );
}