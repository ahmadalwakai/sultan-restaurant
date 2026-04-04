import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

// Transform DB response to frontend format
function toFrontend(coupon: { discount: unknown; [key: string]: unknown }) {
  const { discount, ...rest } = coupon;
  return { ...rest, discountValue: Number(discount) };
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await req.json();
  
  // Map frontend field names to schema field names
  const { discountValue, ...rest } = body;
  const data = {
    ...rest,
    ...(discountValue !== undefined && { discount: discountValue }),
  };
  
  const coupon = await prisma.coupon.update({ where: { id }, data });
  return NextResponse.json({ success: true, data: toFrontend(coupon) });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  await prisma.coupon.delete({ where: { id } });
  return NextResponse.json({ success: true, data: null });
}
