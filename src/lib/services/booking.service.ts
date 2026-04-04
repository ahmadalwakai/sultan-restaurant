import { bookingRepository } from "@/lib/repositories";
import { toBookingPublic, toBookingAdmin } from "@/lib/mappers";
import { NotFoundError, BadRequestError } from "@/lib/errors";
import type { CreateBookingInput, BookingAvailability } from "@/types/booking";
import { BOOKING } from "@/lib/constants/site";
import { prisma } from "@/lib/db/prisma";

// Helper function to calculate end time (booking time + 2:30)
function calculateEndTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  let endHours = hours + 2;
  let endMinutes = minutes + 30;

  if (endMinutes >= 60) {
    endHours += 1;
    endMinutes -= 60;
  }

  if (endHours >= 24) {
    endHours = 23;
    endMinutes = 59;
  }

  return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}

export const bookingService = {
  async create(input: CreateBookingInput, userId?: string) {
    const bookingDate = new Date(input.date);
    const requestedTime = input.time;
    const requestedEndTime = calculateEndTime(input.time);

    // Only assign tables for TABLE bookings (not WEDDING)
    let tableId: string | undefined;
    
    if (input.bookingType !== "WEDDING") {
      // Find an available table that fits the party size
      const availableTable = await this.findAvailableTable(
        bookingDate,
        requestedTime,
        requestedEndTime,
        input.guests
      );

      if (!availableTable) {
        throw new BadRequestError("No tables available for the requested time and party size");
      }

      tableId = availableTable.id;
    }

    const booking = await bookingRepository.create({
      ...input,
      date: bookingDate,
      endTime: requestedEndTime,
      ...(tableId && { table: { connect: { id: tableId } } }),
      ...(userId && { user: { connect: { id: userId } } }),
    });
    return toBookingPublic(booking);
  },

  async findAvailableTable(date: Date, startTime: string, endTime: string, guests: number) {
    // Get all active tables that can accommodate the party size
    const tables = await prisma.restaurantTable.findMany({
      where: {
        isActive: true,
        capacity: { gte: guests },
      },
      orderBy: [
        { capacity: "asc" }, // Prefer smaller tables first to save bigger ones
        { tableNumber: "asc" },
      ],
    });

    if (tables.length === 0) return null;

    // Get all bookings for that date that might conflict
    const existingBookings = await prisma.booking.findMany({
      where: {
        date: date,
        status: { in: ["PENDING", "CONFIRMED"] },
        tableId: { not: null },
      },
      select: {
        tableId: true,
        time: true,
        endTime: true,
      },
    });

    // Find first table without time conflict
    for (const table of tables) {
      const tableBookings = existingBookings.filter(b => b.tableId === table.id);
      
      const hasConflict = tableBookings.some(booking => {
        const bookingEndTime = booking.endTime || calculateEndTime(booking.time);
        // Overlap: requested start < booking end AND requested end > booking start
        return startTime < bookingEndTime && endTime > booking.time;
      });

      if (!hasConflict) {
        return table;
      }
    }

    return null;
  },

  async getById(id: string) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new NotFoundError("Booking");
    return toBookingAdmin(booking);
  },

  async cancel(id: string) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new NotFoundError("Booking");
    if (booking.status === "CANCELLED") throw new BadRequestError("Already cancelled");
    const updated = await bookingRepository.update(id, { status: "CANCELLED" });
    return toBookingPublic(updated);
  },

  async updateStatus(id: string, status: string) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new NotFoundError("Booking");
    const updated = await bookingRepository.update(id, { status: status as never });
    return toBookingAdmin(updated);
  },

  async getAvailability(dateStr: string): Promise<BookingAvailability> {
    const date = new Date(dateStr);
    const bookings = await bookingRepository.findByDate(date);
    const bookedTimes = bookings.map((b) => b.time);

    const slots: string[] = [];
    for (let h = 11; h <= 21; h++) {
      for (let m = 0; m < 60; m += BOOKING.timeSlotInterval) {
        const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
        if (!bookedTimes.includes(time)) slots.push(time);
      }
    }

    return { date: dateStr, availableSlots: slots };
  },

  async getUserBookings(userId: string) {
    const bookings = await bookingRepository.findUpcoming(userId);
    return bookings.map(toBookingPublic);
  },
};
