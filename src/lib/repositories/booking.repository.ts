import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const bookingRepository = {
  findAll(params: {
    where?: Prisma.BookingWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.BookingOrderByWithRelationInput;
  }) {
    return prisma.booking.findMany({
      ...params,
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  },

  count(where?: Prisma.BookingWhereInput) {
    return prisma.booking.count({ where });
  },

  findById(id: string) {
    return prisma.booking.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  },

  findByDate(date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return this.findAll({
      where: {
        date: { gte: start, lte: end },
        status: { notIn: ["CANCELLED"] },
      },
      orderBy: { time: "asc" },
    });
  },

  findUpcoming(userId: string) {
    return this.findAll({
      where: {
        userId,
        date: { gte: new Date() },
        status: { notIn: ["CANCELLED", "COMPLETED"] },
      },
      orderBy: { date: "asc" },
    });
  },

  findNeedingReminder() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    return this.findAll({
      where: {
        date: { gte: tomorrow, lt: dayAfter },
        status: "CONFIRMED",
        reminderSent: false,
      },
    });
  },

  create(data: Prisma.BookingCreateInput) {
    return prisma.booking.create({ data });
  },

  update(id: string, data: Prisma.BookingUpdateInput) {
    return prisma.booking.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.booking.delete({ where: { id } });
  },
};
