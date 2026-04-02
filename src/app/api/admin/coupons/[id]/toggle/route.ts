import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  const updated = await prisma.coupon.update({
    where: { id },
    data: { isActive: !coupon.isActive },
  });
  return NextResponse.json({ success: true, data: updated });
}
