import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

// Transform DB response to frontend format
function toFrontend(coupon: { discount: unknown; [key: string]: unknown }) {
  const { discount, ...rest } = coupon;
  return { ...rest, discountValue: Number(discount) };
}

export async function GET() {
  await requireAdmin();
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: coupons.map(toFrontend) });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();
  
  // Map frontend field names to schema field names
  const { discountValue, ...rest } = body;
  const data = {
    ...rest,
    ...(discountValue !== undefined && { discount: discountValue }),
  };
  
  const coupon = await prisma.coupon.create({ data });
  return NextResponse.json({ success: true, data: toFrontend(coupon) }, { status: 201 });
}
