import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// Public: Get shisha menu with categories
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const categorySlug = searchParams.get("category");

  const where: Record<string, unknown> = {
    isAvailable: true,
    category: { isActive: true },
  };

  if (categorySlug) {
    where.category = { slug: categorySlug, isActive: true };
  }

  const [categories, items] = await Promise.all([
    prisma.shishaCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.shishaMenuItem.findMany({
      where,
      include: { category: true },
      orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    }),
  ]);

  // Group items by category
  const menu = categories.map((category) => ({
    ...category,
    items: items.filter((item) => item.categoryId === category.id),
  }));

  return NextResponse.json({
    success: true,
    data: {
      categories,
      menu,
      featuredItems: items.filter((item) => item.isFeatured),
    },
  });
}
