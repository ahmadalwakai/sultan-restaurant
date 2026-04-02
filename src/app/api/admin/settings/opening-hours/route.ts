import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();
  const hours = await prisma.openingHours.findMany({ orderBy: { dayOfWeek: "asc" } });
  return NextResponse.json({ success: true, data: hours });
}

export async function PUT(req: NextRequest) {
  await requireAdmin();
  const body: { dayOfWeek: number; openTime: string; closeTime: string; isClosed: boolean }[] =
    await req.json();

  await prisma.$transaction(
    body.map((h) =>
      prisma.openingHours.upsert({
        where: { dayOfWeek: h.dayOfWeek },
        create: h,
        update: h,
      })
    )
  );

  const hours = await prisma.openingHours.findMany({ orderBy: { dayOfWeek: "asc" } });
  return NextResponse.json({ success: true, data: hours });
}
