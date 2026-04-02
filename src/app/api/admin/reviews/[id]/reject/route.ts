import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const review = await prisma.review.update({
    where: { id },
    data: { status: "REJECTED" },
  });
  return NextResponse.json({ success: true, data: review });
}
