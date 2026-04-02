import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [total, todayCount, pending, confirmed] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { date: { gte: today } } }),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
  ]);

  return NextResponse.json({
    success: true,
    data: { total, todayCount, pending, confirmed },
  });
}
