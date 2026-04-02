import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'upload.wikimedia.org',
      'placehold.co',
      'placehold.it',
      'picsum.photos',
      'localhost',
      '127.0.0.1',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // PWA and performance optimizations
  experimental: {
    optimizeCss: true,
  },
  // Enable compression
  compress: true,
  // Turbopack configuration
  turbopack: {},
};

export default nextConfig;
