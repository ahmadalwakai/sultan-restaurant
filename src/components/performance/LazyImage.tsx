'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  placeholder,
  blurDataURL,
  priority = false,
  quality = 75,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <Box ref={imgRef} position="relative" overflow="hidden" className={className}>
      {/* Placeholder/Loading state */}
      {!isLoaded && !hasError && (
        <Box
          position="absolute"
          inset={0}
          bg="gray.200"
          animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={width}
          h={height}
        >
          {placeholder && (
            <Box color="gray.400" fontSize="sm">
              {placeholder}
            </Box>
          )}
        </Box>
      )}

      {/* Error state */}
      {hasError && (
        <Box
          position="absolute"
          inset={0}
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="gray.400"
          w={width}
          h={height}
        >
          <svg
            width={32}
            height={32}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </Box>
      )}

      {/* Actual image */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width,
            height,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}
    </Box>
  );
}