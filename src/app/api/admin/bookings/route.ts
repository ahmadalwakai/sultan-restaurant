import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { parsePagination } from "@/lib/api";

export async function GET(req: NextRequest) {
  await requireAdmin();
  const { page, limit, skip } = parsePagination(req.nextUrl.searchParams);
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  const date = req.nextUrl.searchParams.get("date") ?? undefined;

  const where = {
    ...(status && { status: status as never }),
    ...(date && {
      date: {
        gte: new Date(date),
        lt: new Date(new Date(date).getTime() + 86400000),
      },
    }),
  };

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: { user: { select: { name: true, email: true } } },
      orderBy: { date: "desc" },
      skip,
      take: limit,
    }),
    prisma.booking.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: bookings,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
