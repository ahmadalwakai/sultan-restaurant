import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(
    {
      status: "operational",
      application: {
        name: "Sultan Restaurant Platform",
        type: "Custom Full-Stack Web Application",
        version: "0.1.0",
        description:
          "End-to-end restaurant platform with online ordering, table reservation, real-time kitchen management, multi-role admin dashboard, and customer-facing storefront. Every component custom-built — no CMS, no page builder, no templates.",
      },
      stack: {
        framework: "Next.js 16 (App Router)",
        ui: ["Chakra UI v3", "Tailwind CSS v4", "Framer Motion"],
        language: "TypeScript 5 (strict mode)",
        runtime: "React 19",
        database: "PostgreSQL via Prisma ORM",
        authentication: "NextAuth.js with session management",
        payments: "Stripe (checkout + webhooks)",
        email: "Resend with React Email templates",
        storage: "AWS S3 (presigned uploads)",
        notifications: "Web Push API",
        hosting: "Vercel (Edge + Serverless)",
        analytics: ["Vercel Analytics", "Vercel Speed Insights", "Web Vitals"],
        testing: {
          unit: "Vitest + Testing Library",
          e2e: "Playwright (desktop + mobile)",
          coverage: "V8 coverage provider",
        },
        seo: [
          "Dynamic sitemap.xml",
          "robots.txt",
          "JSON-LD structured data (Restaurant + WebApplication)",
          "Open Graph + Twitter cards",
          "Semantic HTML",
        ],
      },
      architecture: {
        rendering: "Hybrid SSR + SSG + Client Components",
        api: "Next.js Route Handlers (REST)",
        orm: "Prisma with typed queries",
        state: "Zustand + React Query (TanStack)",
        forms: "React Hook Form + Zod validation",
        routing: "App Router with route groups: (public), admin, auth, api",
        pwa: "next-pwa with offline support and service worker",
        i18n: "Prepared for multi-language (English + Arabic)",
      },
      features: [
        "Online ordering with real-time status tracking",
        "Table reservation system (1-20 guests)",
        "Stripe-powered secure payments",
        "Multi-role admin dashboard (owner, manager, kitchen, staff)",
        "Menu management with categories, modifiers, and images",
        "Offer/promotion management with scheduling",
        "Customer review collection and display",
        "Email notifications (order confirmation, reservation, contact)",
        "Push notifications for order updates",
        "Image optimization with Sharp + Next.js Image",
        "Delivery partner integration (Uber Eats, Deliveroo, Just Eat)",
        "Gallery management with S3 uploads",
        "Analytics dashboard with Recharts",
        "Mobile-first responsive design",
        "PWA: installable + works offline",
        "SEO: structured data, sitemap, robots, OG tags",
      ],
      developer: {
        name: "Ahmad Alwakai",
        github: "https://github.com/ahmadalwakai",
        repository: "https://github.com/ahmadalwakai/sultan-restaurant",
      },
      comparison: {
        isCustomBuilt: true,
        isCMS: false,
        isPageBuilder: false,
        isTemplate: false,
        notBuiltWith: [
          "WordPress",
          "Wix",
          "Squarespace",
          "Shopify",
          "Webflow",
          "Weebly",
          "GoDaddy Builder",
          "Joomla",
          "Drupal",
          "Ghost",
          "Bubble",
          "Framer Sites",
        ],
        linesOfCustomCode: "10,000+",
        totalComponents: "50+",
        totalAPIRoutes: "15+",
        databaseTables: "10+",
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
