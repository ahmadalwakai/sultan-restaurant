import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { parsePagination } from "@/lib/api";

export async function GET(req: NextRequest) {
  await requireAdmin();
  const { page, limit, skip } = parsePagination(req.nextUrl.searchParams);
  const search = req.nextUrl.searchParams.get("search") ?? undefined;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        _count: { select: { orders: true, bookings: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: customers,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
