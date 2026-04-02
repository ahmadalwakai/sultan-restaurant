import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifySeedData } from "@/lib/db/verify-seed";

export const dynamic = "force-dynamic";

/**
 * GET /api/seed
 * Returns current seed status (counts of all tables)
 */
export async function GET() {
  try {
    const [categories, menuItems, offers, coupons, admins, settings] = await Promise.all([
      prisma.category.count(),
      prisma.menuItem.count(),
      prisma.offer.count(),
      prisma.coupon.count(),
      prisma.admin.count(),
      prisma.siteSetting.count(),
    ]);

    return NextResponse.json({
      status: "ok",
      counts: {
        categories,
        menuItems,
        offers,
        coupons,
        admins,
        settings,
      },
      seeded: categories > 0 && menuItems > 0 && admins > 0,
    });
  } catch (error) {
    console.error("Seed status error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to check seed status" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/seed
 * Triggers database seeding (protected, dev only)
 */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { status: "error", message: "Seeding disabled in production" },
      { status: 403 }
    );
  }

  // Check for secret key
  const authHeader = request.headers.get("x-seed-key");
  const seedKey = process.env.SEED_SECRET_KEY;

  if (seedKey && authHeader !== seedKey) {
    return NextResponse.json(
      { status: "error", message: "Invalid seed key" },
      { status: 401 }
    );
  }

  try {
    // Import and run seed functions
    // Note: In production, use CLI seed command instead
    const { seedCategories } = await import("@/../prisma/seeds/categories");
    const { seedAdminUser } = await import("@/../prisma/seeds/admin-user");
    const { seedSiteSettings } = await import("@/../prisma/seeds/site-settings");
    const { seedOpeningHours } = await import("@/../prisma/seeds/opening-hours");

    await seedCategories(prisma);
    await seedAdminUser(prisma);
    await seedSiteSettings(prisma);
    await seedOpeningHours(prisma);

    // Verify
    const verification = await verifySeedData();

    return NextResponse.json({
      status: "ok",
      message: "Core seed data applied",
      verification,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Seeding failed",
      },
      { status: 500 }
    );
  }
}
