import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { parsePagination } from "@/lib/api";

export async function GET(req: NextRequest) {
  await requireAdmin();
  const { page, limit, skip } = parsePagination(req.nextUrl.searchParams);
  const search = req.nextUrl.searchParams.get("search") ?? undefined;
  const categoryId = req.nextUrl.searchParams.get("categoryId") ?? undefined;

  const where = {
    ...(search && { name: { contains: search, mode: "insensitive" as const } }),
    ...(categoryId && { categoryId }),
  };

  const [items, total] = await Promise.all([
    prisma.menuItem.findMany({
      where,
      include: { category: { select: { name: true } } },
      orderBy: { sortOrder: "asc" },
      skip,
      take: limit,
    }),
    prisma.menuItem.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: items,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();

  const item = await prisma.menuItem.create({ data: body });
  return NextResponse.json({ success: true, data: item }, { status: 201 });
}
