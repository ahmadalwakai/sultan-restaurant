'use client';

import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface SlideTransitionProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
  className?: string;
  trigger?: boolean;
}

export default function SlideTransition({
  children,
  direction = 'up',
  duration = 300,
  delay = 0,
  className,
  trigger = true,
}: SlideTransitionProps) {
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

  const directionClasses = {
    left: isVisible ? 'translate-x-0' : '-translate-x-full',
    right: isVisible ? 'translate-x-0' : 'translate-x-full',
    up: isVisible ? 'translate-y-0' : 'translate-y-full',
    down: isVisible ? 'translate-y-0' : '-translate-y-full',
  };

  return (
    <div
      className={cn(
        'transition-transform ease-out',
        directionClasses[direction],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}