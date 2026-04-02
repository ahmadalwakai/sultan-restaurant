'use client';

import { useState, useRef, useCallback, ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  className?: string;
  pullText?: string;
  refreshingText?: string;
  releaseText?: string;
}

export default function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  className,
  pullText = 'Pull to refresh',
  refreshingText = 'Refreshing...',
  releaseText = 'Release to refresh',
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isRefreshing) return;

    const touch = e.touches[0];
    setStartY(touch.clientY);
    setIsPulling(true);
  }, [isRefreshing]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isPulling || isRefreshing) return;

      const touch = e.touches[0];
      const currentY = touch.clientY;
      const distance = Math.max(0, currentY - startY);

      // Only allow pull-to-refresh when at the top
      if (containerRef.current?.scrollTop === 0) {
        setPullDistance(distance);
      }
    },
    [isPulling, isRefreshing, startY]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling || isRefreshing) return;

    setIsPulling(false);

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }

    setPullDistance(0);
  }, [isPulling, isRefreshing, pullDistance, threshold, onRefresh]);

  const getRefreshState = () => {
    if (isRefreshing) return 'refreshing';
    if (pullDistance >= threshold) return 'release';
    if (pullDistance > 0) return 'pulling';
    return 'idle';
  };

  const refreshState = getRefreshState();
  const progress = Math.min(pullDistance / threshold, 1);
  const rotation = progress * 360;

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 z-10 flex items-center justify-center',
          'bg-white border-b border-gray-200 transition-transform duration-200',
          'safe-area-top pt-safe'
        )}
        style={{
          transform: `translateY(${Math.max(-60, pullDistance - 60)}px)`,
          height: '60px',
        }}
      >
        <div className="flex items-center space-x-3">
          <RefreshCw
            size={20}
            className={cn(
              'text-gray-500 transition-transform duration-200',
              (refreshState === 'refreshing' || refreshState === 'release') &&
                'text-orange-600'
            )}
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          />
          <span className="text-sm font-medium text-gray-600">
            {refreshState === 'refreshing' && refreshingText}
            {refreshState === 'release' && releaseText}
            {refreshState === 'pulling' && pullText}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: `translateY(${Math.max(0, pullDistance)}px)`,
        }}
      >
        {children}
      </div>

      {/* Loading overlay */}
      {isRefreshing && (
        <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <RefreshCw size={24} className="text-orange-600 animate-spin" />
            <span className="text-lg font-medium text-gray-900">
              {refreshingText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}