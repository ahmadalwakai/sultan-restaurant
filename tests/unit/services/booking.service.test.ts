import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { bookings } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("bookingService", () => {
  beforeEach(() => resetPrismaMock());

  describe("createBooking", () => {
    it("should create a booking with valid data", async () => {
      prismaMock.booking.create.mockResolvedValue(bookings[0]);

      const { createBooking } = await import("@/lib/services/bookings.service");
      const result = await createBooking({
        name: "John Doe",
        email: "john@test.com",
        phone: "07700900001",
        date: "2026-04-10",
        time: "19:00",
        guests: 4,
        specialRequests: "Window seat",
      });

      expect(prismaMock.booking.create).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });

  describe("getBookingById", () => {
    it("should return booking by id", async () => {
      prismaMock.booking.findUnique.mockResolvedValue(bookings[0]);

      const { getBookingById } = await import("@/lib/services/bookings.service");
      const result = await getBookingById("booking-1");

      expect(result).toEqual(bookings[0]);
    });

    it("should throw for non-existent booking", async () => {
      prismaMock.booking.findUnique.mockResolvedValue(null);

      const { getBookingById } = await import("@/lib/services/bookings.service");
      await expect(getBookingById("nonexistent")).rejects.toThrow();
    });
  });

  describe("cancelBooking", () => {
    it("should cancel a pending booking", async () => {
      prismaMock.booking.findUnique.mockResolvedValue(bookings[1]);
      prismaMock.booking.update.mockResolvedValue({ ...bookings[1], status: "CANCELLED" });

      const { cancelBooking } = await import("@/lib/services/bookings.service");
      const result = await cancelBooking("booking-2");

      expect(prismaMock.booking.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ status: "CANCELLED" }),
        })
      );
    });
  });

  describe("updateBookingStatus", () => {
    it("should update booking status to CONFIRMED", async () => {
      prismaMock.booking.findUnique.mockResolvedValue(bookings[1]);
      prismaMock.booking.update.mockResolvedValue({ ...bookings[1], status: "CONFIRMED" });

      const { updateBookingStatus } = await import("@/lib/services/bookings.service");
      const result = await updateBookingStatus("booking-2", "CONFIRMED" as any);

      expect(prismaMock.booking.update).toHaveBeenCalled();
    });
  });
});
