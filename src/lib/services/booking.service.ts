import { bookingRepository } from "@/lib/repositories";
import { toBookingPublic, toBookingAdmin } from "@/lib/mappers";
import { NotFoundError, BadRequestError } from "@/lib/errors";
import type { CreateBookingInput, BookingAvailability } from "@/types/booking";
import { BOOKING } from "@/lib/constants/site";

export const bookingService = {
  async create(input: CreateBookingInput, userId?: string) {
    const booking = await bookingRepository.create({
      ...input,
      date: new Date(input.date),
      ...(userId && { user: { connect: { id: userId } } }),
    });
    return toBookingPublic(booking);
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
