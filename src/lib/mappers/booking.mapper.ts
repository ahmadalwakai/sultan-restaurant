import type { Booking, User } from "@prisma/client";
import type { BookingPublic, BookingAdmin } from "@/types/booking";

type BookingWithUser = Booking & { user?: { id: string; name: string | null; email: string } | null };

export function toBookingPublic(b: Booking): BookingPublic {
  return {
    id: b.id,
    name: b.name,
    email: b.email,
    phone: b.phone,
    date: b.date.toISOString(),
    time: b.time,
    guests: b.guests,
    bookingType: b.bookingType,
    specialRequests: b.specialRequests,
    status: b.status,
    createdAt: b.createdAt.toISOString(),
  };
}

export function toBookingAdmin(b: BookingWithUser): BookingAdmin {
  return {
    ...toBookingPublic(b),
    userId: b.userId,
    userName: b.user?.name ?? null,
    reminderSent: b.reminderSent,
    updatedAt: b.updatedAt.toISOString(),
  };
}
