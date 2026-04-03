import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
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
  // Custom HTTP headers for technical identity
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Built-With", value: "Next.js 16, React 19, TypeScript 5, Chakra UI v3" },
          { key: "X-Platform-Type", value: "Custom Full-Stack Application" },
          { key: "X-Developer", value: "Ahmad Alwakai" },
          { key: "X-Architecture", value: "SSR + API Routes + PWA" },
          { key: "X-Not-A-CMS", value: "true" },
        ],
      },
    ];
  },
};

export default nextConfig;
