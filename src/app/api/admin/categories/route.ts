import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils/slugify";

export async function GET() {
  await requireAdmin();
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { menuItems: true } } },
  });
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();
  const slug = slugify(body.name);
  const category = await prisma.category.create({
    data: { ...body, slug },
  });
  return NextResponse.json({ success: true, data: category }, { status: 201 });
}
