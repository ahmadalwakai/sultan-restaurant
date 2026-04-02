import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ScreenReaderOnlyProps {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'p';
}

export default function ScreenReaderOnly({
  children,
  className,
  as: Component = 'span'
}: ScreenReaderOnlyProps) {
  return (
    <Component
      className={cn(
        'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
        'clip-[rect(0,0,0,0)]',
        className
      )}
    >
      {children}
    </Component>
  );
}