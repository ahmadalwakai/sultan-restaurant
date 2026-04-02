import prisma from "@/lib/db";
import type { BookingStatus } from "@prisma/client";

export async function getBookings(params?: { status?: BookingStatus; date?: string; page?: number; limit?: number }) {
  const { status, date, page = 1, limit = 20 } = params ?? {};
  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (date) where.date = { gte: new Date(date), lt: new Date(new Date(date).getTime() + 86400000) };

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit, include: { user: { select: { name: true, email: true } } } }),
    prisma.booking.count({ where }),
  ]);
  return { bookings, total, pages: Math.ceil(total / limit) };
}

export async function getBookingById(id: string) {
  return prisma.booking.findUnique({ where: { id }, include: { user: { select: { name: true, email: true } } } });
}

export async function createBooking(data: { name: string; email: string; phone: string; date: string; time: string; guests: number; specialRequests?: string; userId?: string }) {
  return prisma.booking.create({ data: { ...data, date: new Date(data.date) } });
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  return prisma.booking.update({ where: { id }, data: { status } });
}

export async function cancelBooking(id: string) {
  return prisma.booking.update({ where: { id }, data: { status: "CANCELLED" } });
}
