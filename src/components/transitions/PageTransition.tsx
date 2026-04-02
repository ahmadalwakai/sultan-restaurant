'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsLoading(false);
    }, 150); // Brief loading state for smooth transition

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div className={cn('relative min-h-screen', className)}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
            <span className="text-gray-600">Loading...</span>
          </div>
        </div>
      )}

      {/* Page content */}
      <div
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      >
        {displayChildren}
      </div>
    </div>
  );
}