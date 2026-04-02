import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const item = await prisma.menuItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  const updated = await prisma.menuItem.update({
    where: { id },
    data: { isAvailable: !item.isAvailable },
  });
  return NextResponse.json({ success: true, data: updated });
}
