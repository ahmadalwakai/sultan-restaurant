import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils/slugify";

export async function GET(req: NextRequest) {
  await requireAdmin();

  const searchParams = req.nextUrl.searchParams;
  const categoryId = searchParams.get("categoryId");
  const available = searchParams.get("available");
  const featured = searchParams.get("featured");

  const where: Record<string, unknown> = {};

  if (categoryId) where.categoryId = categoryId;
  if (available === "true") where.isAvailable = true;
  if (available === "false") where.isAvailable = false;
  if (featured === "true") where.isFeatured = true;

  const items = await prisma.shishaMenuItem.findMany({
    where,
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return NextResponse.json({ success: true, data: items });
}

export async function POST(req: NextRequest) {
  await requireAdmin();

  const body = await req.json();
  const slug = slugify(body.name);

  const existing = await prisma.shishaMenuItem.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { success: false, error: "Item with this name already exists" },
      { status: 400 }
    );
  }

  const maxSort = await prisma.shishaMenuItem.aggregate({
    where: { categoryId: body.categoryId },
    _max: { sortOrder: true },
  });
  const sortOrder = (maxSort._max.sortOrder ?? -1) + 1;

  const item = await prisma.shishaMenuItem.create({
    data: {
      categoryId: body.categoryId,
      name: body.name,
      slug,
      description: body.description,
      price: body.price,
      discountedPrice: body.discountedPrice,
      image: body.image,
      images: body.images || [],
      isAvailable: body.isAvailable ?? true,
      isFeatured: body.isFeatured ?? false,
      sortOrder,
      tags: body.tags || [],
      intensity: body.intensity,
    },
    include: { category: true },
  });

  return NextResponse.json({ success: true, data: item }, { status: 201 });
}
