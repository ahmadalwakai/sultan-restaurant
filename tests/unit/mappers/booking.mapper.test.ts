import { describe, it, expect } from "vitest";
import { toBookingPublic, toBookingAdmin } from "@/lib/mappers";

describe("bookingMapper", () => {
  const dbBooking = {
    id: "booking-1",
    name: "John Doe",
    email: "john@test.com",
    phone: "07700900001",
    date: new Date("2026-04-10"),
    time: "19:00",
    guests: 4,
    status: "CONFIRMED",
    specialRequests: "Window seat please",
    reminderSent: false,
    userId: null,
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-01"),
  };

  describe("toBookingPublic", () => {
    it("should map DB booking to public format", () => {
      const result = toBookingPublic(dbBooking as any);
      expect(result).toHaveProperty("id", "booking-1");
      expect(result).toHaveProperty("status", "CONFIRMED");
      expect(result).toHaveProperty("guests", 4);
    });
  });

  describe("toBookingAdmin", () => {
    it("should include admin-only fields", () => {
      const result = toBookingAdmin(dbBooking as any);
      expect(result).toHaveProperty("createdAt");
      expect(result).toHaveProperty("email");
    });
  });
});
