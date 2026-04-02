import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ success: true, data: images });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();
  const image = await prisma.galleryImage.create({ data: body });
  return NextResponse.json({ success: true, data: image }, { status: 201 });
}
