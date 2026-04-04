import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  await requireAdmin();
  const from = req.nextUrl.searchParams.get("from");
  const to = req.nextUrl.searchParams.get("to");

  const where = {
    ...(from && to && {
      createdAt: { gte: new Date(from), lte: new Date(to) },
    }),
  };

  const orders = await prisma.order.findMany({
    where,
    include: { 
      items: { 
        include: { 
          menuItem: { select: { name: true } },
          shishaMenuItem: { select: { name: true } },
        } 
      } 
    },
    orderBy: { createdAt: "desc" },
  });

  const header = "Order Number,Date,Customer,Items,Total,Status,Payment\n";
  const rows = orders.map((o) => {
    const items = o.items.map((i) => {
      const itemName = i.menuItem?.name || i.shishaMenuItem?.name || "Unknown";
      return `${itemName}x${i.quantity}`;
    }).join("; ");
    return `${o.orderNumber},${o.createdAt.toISOString()},${o.customerName},"${items}",${Number(o.total)},${o.status},${o.paymentStatus}`;
  });

  return new NextResponse(header + rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="orders-${Date.now()}.csv"`,
    },
  });
}
