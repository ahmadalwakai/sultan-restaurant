import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();
  const seo = await prisma.seoSettings.findUnique({ where: { pageSlug: "global" } });
  return NextResponse.json({ success: true, data: seo });
}

export async function PUT(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();

  const seo = await prisma.seoSettings.upsert({
    where: { pageSlug: "global" },
    create: { pageSlug: "global", ...body },
    update: body,
  });
  return NextResponse.json({ success: true, data: seo });
}
