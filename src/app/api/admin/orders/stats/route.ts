import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [total, todayCount, pending, revenue] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: today } } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { paymentStatus: "PAID" },
    }),
  ]);

  return NextResponse.json({
    success: true,
    data: { total, todayCount, pending, revenue: Number(revenue._sum.total ?? 0) },
  });
}
