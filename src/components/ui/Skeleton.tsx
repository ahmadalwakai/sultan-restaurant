"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

/**
 * Shimmer skeleton loader with gold accent
 */
export function Skeleton({ 
  width = "100%", 
  height = "20px", 
  borderRadius = "8px",
  className 
}: SkeletonProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, #2D1810 0%, #3D2820 50%, #2D1810 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

/**
 * Card skeleton for menu items
 */
export function MenuCardSkeleton() {
  return (
    <div
      style={{
        background: "#2D1810",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(200, 169, 81, 0.1)",
      }}
    >
      <Skeleton height="180px" borderRadius="0" />
      <div style={{ padding: "16px" }}>
        <Skeleton width="70%" height="24px" />
        <div style={{ marginTop: "8px" }}>
          <Skeleton width="100%" height="16px" />
        </div>
        <div style={{ marginTop: "4px" }}>
          <Skeleton width="80%" height="16px" />
        </div>
        <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between" }}>
          <Skeleton width="60px" height="28px" />
          <Skeleton width="100px" height="36px" borderRadius="18px" />
        </div>
      </div>
    </div>
  );
}

/**
 * Grid of skeleton cards
 */
export function MenuGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
        padding: "24px",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <MenuCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Text skeleton with multiple lines
 */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          width={i === lines - 1 ? "60%" : "100%"} 
          height="16px" 
        />
      ))}
    </div>
  );
}

/**
 * Image skeleton with aspect ratio
 */
export function ImageSkeleton({ aspectRatio = "16/9" }: { aspectRatio?: string }) {
  return (
    <div style={{ aspectRatio, width: "100%" }}>
      <Skeleton width="100%" height="100%" />
    </div>
  );
}
