import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const customer = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      orders: {
        take: 10,
        orderBy: { createdAt: "desc" },
        select: { id: true, orderNumber: true, total: true, status: true, createdAt: true },
      },
      bookings: {
        take: 10,
        orderBy: { date: "desc" },
        select: { id: true, date: true, time: true, guests: true, status: true },
      },
    },
  });
  if (!customer) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: customer });
}
