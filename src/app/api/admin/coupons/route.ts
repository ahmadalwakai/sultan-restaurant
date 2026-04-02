import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: coupons });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();
  const coupon = await prisma.coupon.create({ data: body });
  return NextResponse.json({ success: true, data: coupon }, { status: 201 });
}
