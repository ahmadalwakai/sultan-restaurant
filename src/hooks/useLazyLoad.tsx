"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook for lazy loading elements when they enter the viewport
 * Returns [ref, isInView, hasBeenInView]
 */
export function useLazyLoad<T extends HTMLElement = HTMLDivElement>(
  options: UseLazyLoadOptions = {}
): [RefObject<T>, boolean, boolean] {
  const { threshold = 0.1, rootMargin = "50px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasBeenInView]);

  return [ref as RefObject<T>, isInView, hasBeenInView];
}

/**
 * Hook for lazy loading images
 * Returns src to use (placeholder until in view)
 */
export function useLazyImage(
  src: string,
  placeholder: string = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
): [RefObject<HTMLImageElement>, string, boolean] {
  const [ref, , hasBeenInView] = useLazyLoad<HTMLImageElement>({ rootMargin: "200px" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (hasBeenInView) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [hasBeenInView, src]);

  return [ref, hasBeenInView ? src : placeholder, isLoaded];
}

/**
 * Hook for progressive loading of content sections
 * Delays rendering heavy components until user scrolls near
 */
export function useProgressiveLoad(delay: number = 0): boolean {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldRender(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return shouldRender;
}

/**
 * Hook for virtualized list rendering
 * Only renders items near the viewport
 */
export function useVirtualizedList<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 3
) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => setScrollTop(container.scrollTop);
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex).map((item, index) => ({
    item,
    index: startIndex + index,
    style: {
      position: "absolute" as const,
      top: (startIndex + index) * itemHeight,
      height: itemHeight,
      width: "100%",
    },
  }));

  const totalHeight = items.length * itemHeight;

  return {
    containerRef,
    visibleItems,
    totalHeight,
    containerStyle: {
      height: containerHeight,
      overflow: "auto" as const,
      position: "relative" as const,
    },
    innerStyle: {
      height: totalHeight,
      position: "relative" as const,
    },
  };
}

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
}

/**
 * Component wrapper for lazy loading sections
 */
export function LazySection({
  children,
  fallback,
  rootMargin = "200px",
  minHeight = 400,
}: LazyComponentProps) {
  const [ref, , hasBeenInView] = useLazyLoad<HTMLDivElement>({ rootMargin });

  return (
    <div ref={ref} style={{ minHeight: hasBeenInView ? "auto" : minHeight }}>
      {hasBeenInView ? (
        children
      ) : (
        fallback || (
          <div
            style={{
              height: minHeight,
              background: "rgba(255,255,255,0.02)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid rgba(200, 169, 81, 0.2)",
                borderTopColor: "#C8A951",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <style jsx global>{`
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </div>
        )
      )}
    </div>
  );
}

/**
 * Image component with native lazy loading and blur placeholder
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  style,
}: {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        background: "#2D1810",
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              120deg,
              #2D1810 30%,
              rgba(200, 169, 81, 0.1) 50%,
              #2D1810 70%
            )`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}
    </div>
  );
}
