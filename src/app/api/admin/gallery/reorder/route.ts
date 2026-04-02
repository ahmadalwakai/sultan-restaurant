import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function PUT(req: NextRequest) {
  await requireAdmin();
  const body: { id: string; sortOrder: number }[] = await req.json();

  await prisma.$transaction(
    body.map(({ id, sortOrder }) =>
      prisma.galleryImage.update({ where: { id }, data: { sortOrder } })
    )
  );

  return NextResponse.json({ success: true, data: null });
}
