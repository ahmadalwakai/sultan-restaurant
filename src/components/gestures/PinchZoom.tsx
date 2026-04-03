'use client';

import { useRef, useState, useCallback, ReactNode } from 'react';
import { Box, Button } from '@chakra-ui/react';

interface PinchZoomProps {
  children: ReactNode;
  minScale?: number;
  maxScale?: number;
  onScaleChange?: (scale: number) => void;
  className?: string;
}

export default function PinchZoom({
  children,
  minScale = 0.5,
  maxScale = 3,
  onScaleChange,
  className,
}: PinchZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const initialDistanceRef = useRef<number | null>(null);

  const getDistance = useCallback((touches: React.TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsZooming(true);
      initialDistanceRef.current = getDistance(e.touches);
    }
  }, [getDistance]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isZooming || !initialDistanceRef.current || e.touches.length !== 2) {
        return;
      }

      e.preventDefault(); // Prevent scrolling during zoom

      const currentDistance = getDistance(e.touches);
      const newScale = Math.min(
        maxScale,
        Math.max(minScale, (currentDistance / initialDistanceRef.current) * scale)
      );

      setScale(newScale);
      onScaleChange?.(newScale);
    },
    [isZooming, scale, minScale, maxScale, onScaleChange, getDistance]
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      setIsZooming(false);
      initialDistanceRef.current = null;
    }
  }, []);

  const handleDoubleClick = useCallback(() => {
    const newScale = scale >= 1 ? 1 : 2;
    setScale(newScale);
    onScaleChange?.(newScale);
  }, [scale, onScaleChange]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      overflow="hidden"
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
      style={{
        touchAction: isZooming ? 'none' : 'auto',
      }}
    >
      <Box
        transition="transform 0.2s ease-out"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </Box>

      {/* Zoom indicator */}
      {scale !== 1 && (
        <Box position="absolute" top={4} right={4} bg="blackAlpha.750" color="white" px={3} py={1} rounded="full" fontSize="sm" fontWeight="medium">
          {Math.round(scale * 100)}%
        </Box>
      )}

      {/* Reset zoom button */}
      {scale !== 1 && (
        <Button
          onClick={() => {
            setScale(1);
            onScaleChange?.(1);
          }}
          position="absolute"
          bottom={4}
          right={4}
          bg="orange.600"
          color="white"
          p={3}
          rounded="full"
          shadow="lg"
          _hover={{ bg: "orange.700" }}
          transition="background 0.2s"
          aria-label="Reset zoom"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="13" y1="9" x2="9" y2="13" />
            <line x1="9" y1="9" x2="13" y2="13" />
          </svg>
        </Button>
      )}
    </Box>
  );
}