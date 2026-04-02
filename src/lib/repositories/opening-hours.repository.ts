import prisma from "@/lib/db/prisma";

export const openingHoursRepository = {
  findAll() {
    return prisma.openingHours.findMany({ orderBy: { dayOfWeek: "asc" } });
  },

  findByDay(dayOfWeek: number) {
    return prisma.openingHours.findUnique({ where: { dayOfWeek } });
  },

  upsert(dayOfWeek: number, data: { openTime: string; closeTime: string; isClosed: boolean }) {
    return prisma.openingHours.upsert({
      where: { dayOfWeek },
      update: data,
      create: { dayOfWeek, ...data },
    });
  },

  async upsertAll(hours: { dayOfWeek: number; openTime: string; closeTime: string; isClosed: boolean }[]) {
    await prisma.$transaction(
      hours.map((h) =>
        prisma.openingHours.upsert({
          where: { dayOfWeek: h.dayOfWeek },
          update: { openTime: h.openTime, closeTime: h.closeTime, isClosed: h.isClosed },
          create: h,
        })
      )
    );
  },
};
