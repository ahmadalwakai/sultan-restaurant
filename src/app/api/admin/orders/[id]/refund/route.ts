import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const { reason } = await req.json();

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  const updated = await prisma.order.update({
    where: { id },
    data: {
      status: "CANCELLED",
      paymentStatus: "REFUNDED",
      notes: reason ? `Refund reason: ${reason}` : undefined,
    },
  });

  return NextResponse.json({ success: true, data: updated });
}
