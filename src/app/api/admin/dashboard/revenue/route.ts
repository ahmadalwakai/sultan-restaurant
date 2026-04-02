import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true, total: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ success: true, data: orders });
}
