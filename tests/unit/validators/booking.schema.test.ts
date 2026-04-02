import { describe, it, expect } from "vitest";
import { bookingSchema } from "@/lib/validations";

describe("bookingSchema", () => {
  const validBooking = {
    name: "John Doe",
    email: "john@example.com",
    phone: "07700900001",
    date: "2026-04-10",
    time: "19:00",
    guests: 4,
    specialRequests: "Window seat",
  };

  it("should pass with valid data", () => {
    const result = bookingSchema.safeParse(validBooking);
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = bookingSchema.safeParse({ ...validBooking, email: "notanemail" });
    expect(result.success).toBe(false);
  });

  it("should reject zero guests", () => {
    const result = bookingSchema.safeParse({ ...validBooking, guests: 0 });
    expect(result.success).toBe(false);
  });

  it("should reject more than 20 guests", () => {
    const result = bookingSchema.safeParse({ ...validBooking, guests: 21 });
    expect(result.success).toBe(false);
  });

  it("should allow optional specialRequests", () => {
    const { specialRequests, ...withoutSpecial } = validBooking;
    const result = bookingSchema.safeParse(withoutSpecial);
    expect(result.success).toBe(true);
  });

  it("should reject missing required fields", () => {
    const result = bookingSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
