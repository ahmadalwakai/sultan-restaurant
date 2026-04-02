import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ pageSlug: string }> }
) {
  await requireAdmin();
  const { pageSlug } = await params;
  const seo = await prisma.seoSettings.findUnique({ where: { pageSlug } });
  if (!seo) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: seo });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ pageSlug: string }> }
) {
  await requireAdmin();
  const { pageSlug } = await params;
  const body = await req.json();

  const seo = await prisma.seoSettings.upsert({
    where: { pageSlug },
    create: { pageSlug, ...body },
    update: body,
  });
  return NextResponse.json({ success: true, data: seo });
}
