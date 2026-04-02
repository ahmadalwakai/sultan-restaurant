import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();

  const [totalOrders, totalRevenue, totalBookings, totalCustomers] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.booking.count(),
      prisma.user.count(),
    ]);

  return NextResponse.json({
    success: true,
    data: {
      totalOrders,
      totalRevenue: Number(totalRevenue._sum.total ?? 0),
      totalBookings,
      totalCustomers,
    },
  });
}
