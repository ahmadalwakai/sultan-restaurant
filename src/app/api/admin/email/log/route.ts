import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { parsePagination } from "@/lib/api";

export async function GET(req: NextRequest) {
  await requireAdmin();
  const { page, limit, skip } = parsePagination(req.nextUrl.searchParams);

  const [logs, total] = await Promise.all([
    prisma.emailLog.findMany({
      orderBy: { sentAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.emailLog.count(),
  ]);

  return NextResponse.json({
    success: true,
    data: logs,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
