import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(
    {
      status: "operational",
      app: "Sultan Restaurant",
      version: "1.0.0",
      type: "Custom full-stack application",
      stack: {
        framework: "Next.js 16 (App Router)",
        ui: "Chakra UI v3, Tailwind CSS v4",
        language: "TypeScript 5",
        runtime: "React 19",
        database: "PostgreSQL + Prisma ORM",
        auth: "NextAuth.js",
        payments: "Stripe",
        hosting: "Vercel",
      },
      developer: "Ahmad Alwakai",
      repository: "https://github.com/ahmadalwakai/sultan-restaurant",
    },
    {
      headers: { "Cache-Control": "public, s-maxage=3600" },
    }
  );
}
