import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();

  const [recentOrders, recentBookings] = await Promise.all([
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, orderNumber: true, total: true, status: true, createdAt: true },
    }),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    }),
  ]);

  return NextResponse.json({ success: true, data: { recentOrders, recentBookings } });
}
