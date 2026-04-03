'use client';

import { useState, useRef, useCallback, ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';
import { Box, HStack, Text } from '@chakra-ui/react';

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
    <Box
      ref={containerRef}
      position="relative"
      overflow="hidden"
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        zIndex={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        transition="transform 0.2s"
        pt={4}
        transform={`translateY(${Math.max(-60, pullDistance - 60)}px)`}
        h="60px"
      >
        <HStack gap={3}>
          <RefreshCw
            size={20}
            color={
              (refreshState === 'refreshing' || refreshState === 'release')
                ? 'orange.600'
                : 'gray.500'
            }
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.2s',
            }}
          />
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            {refreshState === 'refreshing' && refreshingText}
            {refreshState === 'release' && releaseText}
            {refreshState === 'pulling' && pullText}
          </Text>
        </HStack>
      </Box>

      {/* Content */}
      <Box
        transition="transform 0.2s"
        transform={`translateY(${Math.max(0, pullDistance)}px)`}
      >
        {children}
      </Box>

      {/* Loading overlay */}
      {isRefreshing && (
        <Box
          position="absolute"
          inset={0}
          zIndex={20}
          bg="whiteAlpha.800"
          backdropFilter="blur(4px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <HStack gap={3}>
            <RefreshCw size={24} color="orange.600" className="animate-spin" />
            <Text fontSize="lg" fontWeight="medium" color="gray.900">
              {refreshingText}
            </Text>
          </HStack>
        </Box>
      )}
    </Box>
  );
}