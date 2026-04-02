import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { parsePagination } from "@/lib/api";

export async function GET(req: NextRequest) {
  await requireAdmin();
  const { page, limit, skip } = parsePagination(req.nextUrl.searchParams);
  const status = req.nextUrl.searchParams.get("status") ?? undefined;

  const where = status ? { status: status as never } : {};

  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.contactMessage.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: messages,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
