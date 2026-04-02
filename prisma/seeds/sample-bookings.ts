import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

export async function seedSampleBookings(prisma: PrismaClient) {
  if (process.env.NODE_ENV === "production") return [];

  seedLogger.info("Seeding sample bookings (dev only)...");

  const users = await prisma.user.findMany({ take: 5 });
  const now = new Date();

  const bookingsData = [
    { name: "John D.", email: "john@example.com", phone: "+44 7700 900001", guests: 4, status: "CONFIRMED" as const, daysFromNow: 2, time: "19:00" },
    { name: "Sarah S.", email: "sarah@example.com", phone: "+44 7700 900002", guests: 2, status: "PENDING" as const, daysFromNow: 3, time: "20:00" },
    { name: "Ahmed A.", email: "ahmed@example.com", phone: "+44 7700 900003", guests: 6, status: "CONFIRMED" as const, daysFromNow: 5, time: "18:30" },
    { name: "Emma W.", email: "emma@example.com", phone: "+44 7700 900004", guests: 3, status: "PENDING" as const, daysFromNow: 7, time: "19:30" },
    { name: "Omar H.", email: "omar@example.com", phone: "+44 7700 900005", guests: 8, status: "CONFIRMED" as const, daysFromNow: -1, time: "20:00" },
    { name: "Lisa C.", email: "lisa@example.com", phone: "+44 7700 900006", guests: 2, status: "COMPLETED" as const, daysFromNow: -3, time: "19:00" },
    { name: "James P.", email: "james@example.com", phone: "+44 7700 900007", guests: 4, status: "CANCELLED" as const, daysFromNow: 1, time: "18:00" },
    { name: "Fatima A.", email: "fatima@example.com", phone: "+44 7700 900008", guests: 5, status: "NO_SHOW" as const, daysFromNow: -2, time: "19:00" },
  ];

  const bookings = await Promise.all(
    bookingsData.map((b, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() + b.daysFromNow);
      date.setHours(0, 0, 0, 0);

      return prisma.booking.create({
        data: {
          userId: users[i % users.length]?.id,
          name: b.name,
          email: b.email,
          phone: b.phone,
          date,
          time: b.time,
          guests: b.guests,
          status: b.status,
        },
      });
    })
  );

  seedLogger.table("Booking (sample)", bookings.length);
  return bookings;
}
