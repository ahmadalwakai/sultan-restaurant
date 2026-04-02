import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

/**
 * POST /api/seed/reset
 * Resets all seeded data (DANGEROUS - dev only)
 */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { status: "error", message: "Reset disabled in production" },
      { status: 403 }
    );
  }

  // Require confirmation
  const body = await request.json().catch(() => ({}));
  if (body.confirm !== "RESET_DATABASE") {
    return NextResponse.json(
      {
        status: "error",
        message: "Confirmation required. Send { confirm: 'RESET_DATABASE' }",
      },
      { status: 400 }
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
    // Delete in correct order (respecting foreign keys)
    const deleteCounts = await prisma.$transaction([
      prisma.orderItem.deleteMany(),
      prisma.order.deleteMany(),
      prisma.booking.deleteMany(),
      prisma.review.deleteMany(),
      prisma.contactMessage.deleteMany(),
      prisma.emailLog.deleteMany(),
      prisma.menuItem.deleteMany(),
      prisma.category.deleteMany(),
      prisma.offer.deleteMany(),
      prisma.coupon.deleteMany(),
      prisma.galleryImage.deleteMany(),
      prisma.openingHours.deleteMany(),
      prisma.siteSetting.deleteMany(),
      prisma.seoSettings.deleteMany(),
      prisma.session.deleteMany(),
      prisma.account.deleteMany(),
      prisma.user.deleteMany(),
      // Keep admin users by default
    ]);

    return NextResponse.json({
      status: "ok",
      message: "Database reset complete",
      deleted: {
        orderItems: deleteCounts[0].count,
        orders: deleteCounts[1].count,
        bookings: deleteCounts[2].count,
        reviews: deleteCounts[3].count,
        contactMessages: deleteCounts[4].count,
        emailLogs: deleteCounts[5].count,
        menuItems: deleteCounts[6].count,
        categories: deleteCounts[7].count,
        offers: deleteCounts[8].count,
        coupons: deleteCounts[9].count,
        galleryImages: deleteCounts[10].count,
        openingHours: deleteCounts[11].count,
        siteSettings: deleteCounts[12].count,
        seoSettings: deleteCounts[13].count,
        sessions: deleteCounts[14].count,
        accounts: deleteCounts[15].count,
        users: deleteCounts[16].count,
      },
    });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Reset failed",
      },
      { status: 500 }
    );
  }
}
