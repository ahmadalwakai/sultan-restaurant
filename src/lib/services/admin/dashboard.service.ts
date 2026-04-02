import prisma from "@/lib/db";

export async function getDashboardStats() {
  const [orders, bookings, revenue, customers] = await Promise.all([
    prisma.order.count(),
    prisma.booking.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: "PAID" } }),
    prisma.user.count(),
  ]);
  return { orders, bookings, revenue: Number(revenue._sum.total ?? 0), customers };
}

export async function getRevenueData(days = 30) {
  const since = new Date(Date.now() - days * 86400000);
  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: since }, paymentStatus: "PAID" },
    select: { total: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const byDate = new Map<string, number>();
  for (const o of orders) {
    const key = o.createdAt.toISOString().slice(0, 10);
    byDate.set(key, (byDate.get(key) ?? 0) + Number(o.total));
  }
  return Array.from(byDate.entries()).map(([date, amount]) => ({ date, amount }));
}
