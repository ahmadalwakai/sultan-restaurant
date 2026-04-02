import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  const updated = await prisma.offer.update({
    where: { id },
    data: { isActive: !offer.isActive },
  });
  return NextResponse.json({ success: true, data: updated });
}
