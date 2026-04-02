'use client';

import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface FadeTransitionProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  trigger?: boolean;
  from?: number;
  to?: number;
}

export default function FadeTransition({
  children,
  duration = 300,
  delay = 0,
  className,
  trigger = true,
  from = 0,
  to = 1,
}: FadeTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [trigger, delay]);

  return (
    <div
      className={cn(
        'transition-opacity ease-out',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        opacity: isVisible ? to : from,
      }}
    >
      {children}
    </div>
  );
}