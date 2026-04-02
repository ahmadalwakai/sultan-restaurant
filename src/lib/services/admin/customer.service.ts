import prisma from "@/lib/db";

export async function getCustomers(params?: { search?: string; page?: number; limit?: number }) {
  const { search, page = 1, limit = 20 } = params ?? {};
  const where = search ? { OR: [{ name: { contains: search, mode: "insensitive" as const } }, { email: { contains: search, mode: "insensitive" as const } }] } : {};
  const [customers, total] = await Promise.all([
    prisma.user.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit, include: { _count: { select: { orders: true, bookings: true } } } }),
    prisma.user.count({ where }),
  ]);
  return { customers, total, pages: Math.ceil(total / limit) };
}

export async function getCustomerById(id: string) {
  return prisma.user.findUnique({ where: { id }, include: { orders: { orderBy: { createdAt: "desc" }, take: 10 }, bookings: { orderBy: { createdAt: "desc" }, take: 10 }, _count: { select: { orders: true, bookings: true } } } });
}
