"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ImageWithBlurProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  blurColor?: string;
  borderRadius?: string;
  objectFit?: "cover" | "contain" | "fill";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Image component with blur-up loading effect
 * Shows a colored placeholder that fades to the actual image
 */
export function ImageWithBlur({
  src,
  alt,
  width = "100%",
  height = "auto",
  aspectRatio,
  blurColor = "#2D1810",
  borderRadius = "0",
  objectFit = "cover",
  className,
  style,
}: ImageWithBlurProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width,
        height,
        aspectRatio,
        borderRadius,
        overflow: "hidden",
        background: blurColor,
        ...style,
      }}
    >
      {/* Shimmer placeholder */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            120deg,
            ${blurColor} 30%,
            rgba(200, 169, 81, 0.15) 50%,
            ${blurColor} 70%
          )`,
          backgroundSize: "200% 100%",
          animation: isLoaded ? "none" : "shimmer 1.5s infinite",
        }}
      />

      {/* Actual image */}
      {!error && (
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit,
          }}
        />
      )}

      {/* Error fallback */}
      {error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: blurColor,
            color: "rgba(255,255,255,0.4)",
            fontSize: "14px",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ marginBottom: "8px", opacity: 0.5 }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Image unavailable</span>
        </div>
      )}

      {/* Shimmer keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Optimized menu image with blur-up loading
 */
export function MenuItemImage({
  src,
  alt,
  size = 120,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <ImageWithBlur
      src={src}
      alt={alt}
      width={size}
      height={size}
      borderRadius="16px"
      blurColor="#2D1810"
    />
  );
}

/**
 * Hero/banner image with blur-up loading
 */
export function HeroImage({
  src,
  alt,
  aspectRatio = "16/9",
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
}) {
  return (
    <ImageWithBlur
      src={src}
      alt={alt}
      aspectRatio={aspectRatio}
      blurColor="#1A0F0A"
    />
  );
}

/**
 * Gallery image with blur-up loading
 */
export function GalleryImage({
  src,
  alt,
  aspectRatio = "1",
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
}) {
  return (
    <ImageWithBlur
      src={src}
      alt={alt}
      aspectRatio={aspectRatio}
      borderRadius="12px"
      blurColor="#2D1810"
    />
  );
}
