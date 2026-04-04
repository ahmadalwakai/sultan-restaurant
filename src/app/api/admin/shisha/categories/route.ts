import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils/slugify";

export async function GET() {
  await requireAdmin();

  const categories = await prisma.shishaCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { items: true } } },
  });

  return NextResponse.json({ success: true, data: categories });
}

export async function POST(req: NextRequest) {
  await requireAdmin();

  const body = await req.json();
  const slug = slugify(body.name);

  const existing = await prisma.shishaCategory.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { success: false, error: "Category with this name already exists" },
      { status: 400 }
    );
  }

  const maxSort = await prisma.shishaCategory.aggregate({ _max: { sortOrder: true } });
  const sortOrder = (maxSort._max.sortOrder ?? -1) + 1;

  const category = await prisma.shishaCategory.create({
    data: {
      name: body.name,
      slug,
      description: body.description,
      image: body.image,
      sortOrder,
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json({ success: true, data: category }, { status: 201 });
}
