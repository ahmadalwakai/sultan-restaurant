import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();
  const keys = ["facebook", "instagram", "twitter", "youtube", "tiktok", "tripadvisor"];
  const settings = await prisma.siteSetting.findMany({ where: { key: { in: keys } } });
  const data = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return NextResponse.json({ success: true, data });
}

export async function PUT(req: NextRequest) {
  await requireAdmin();
  const body: Record<string, string> = await req.json();

  await prisma.$transaction(
    Object.entries(body).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      })
    )
  );

  return NextResponse.json({ success: true, data: body });
}
