import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { parsePagination } from "@/lib/api";
import type { OrderSource } from "@prisma/client";

export async function GET(req: NextRequest) {
  await requireAdmin();
  const { page, limit, skip } = parsePagination(req.nextUrl.searchParams);
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  const search = req.nextUrl.searchParams.get("search") ?? undefined;
  const orderSource = req.nextUrl.searchParams.get("orderSource") ?? undefined;

  const where = {
    ...(status && { status: status as never }),
    ...(orderSource && { orderSource: orderSource as OrderSource }),
    ...(search && {
      OR: [
        { orderNumber: { contains: search, mode: "insensitive" as const } },
        { customerName: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        customerEmail: true,
        customerPhone: true,
        type: true,
        status: true,
        paymentMethod: true,
        paymentStatus: true,
        subtotal: true,
        discount: true,
        total: true,
        couponCode: true,
        pickupTime: true,
        specialRequests: true,
        createdAt: true,
        updatedAt: true,
        // Table scan fields
        tableNumber: true,
        menuType: true,
        orderSource: true,
        items: { include: { menuItem: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: orders,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
