import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const openingHoursData = [
  { dayOfWeek: 0, openTime: "12:00", closeTime: "22:00", isClosed: false }, // Sunday
  { dayOfWeek: 1, openTime: "12:00", closeTime: "22:00", isClosed: false }, // Monday
  { dayOfWeek: 2, openTime: "12:00", closeTime: "22:00", isClosed: false }, // Tuesday
  { dayOfWeek: 3, openTime: "12:00", closeTime: "22:00", isClosed: false }, // Wednesday
  { dayOfWeek: 4, openTime: "12:00", closeTime: "22:00", isClosed: false }, // Thursday
  { dayOfWeek: 5, openTime: "12:00", closeTime: "23:00", isClosed: false }, // Friday
  { dayOfWeek: 6, openTime: "12:00", closeTime: "23:00", isClosed: false }, // Saturday
];

export async function seedOpeningHours(prisma: PrismaClient) {
  seedLogger.info("Seeding opening hours...");

  const hours = await Promise.all(
    openingHoursData.map((h) =>
      prisma.openingHours.upsert({
        where: { dayOfWeek: h.dayOfWeek },
        update: { openTime: h.openTime, closeTime: h.closeTime, isClosed: h.isClosed },
        create: h,
      })
    )
  );

  seedLogger.table("OpeningHours", hours.length);
  return hours;
}
