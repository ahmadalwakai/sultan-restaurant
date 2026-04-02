import { describe, it, expect } from "vitest";

type BookingEmailData = {
  customerName: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  bookingId: string;
};

const buildBookingConfirmation = (data: BookingEmailData) => ({
  to: data.email,
  subject: `Booking Confirmed - ${data.date} at ${data.time}`,
  html: `<h1>Booking Confirmed</h1><p>Dear ${data.customerName}</p><p>Date: ${data.date}</p><p>Time: ${data.time}</p><p>Guests: ${data.guests}</p>`,
});

const buildBookingCancelled = (data: BookingEmailData) => ({
  to: data.email,
  subject: "Booking Cancelled",
  html: `<h1>Booking Cancelled</h1><p>Your booking for ${data.date} has been cancelled.</p>`,
});

const buildBookingReminder = (data: BookingEmailData) => ({
  to: data.email,
  subject: `Reminder: Booking Tomorrow at ${data.time}`,
  html: `<h1>Booking Reminder</h1><p>Don't forget your booking tomorrow!</p>`,
});

const buildBookingAdminAlert = (data: BookingEmailData) => ({
  to: "admin@sultanrestaurant.co.uk",
  subject: `New Booking: ${data.customerName} - ${data.date}`,
  html: `<h1>New Booking</h1><p>${data.customerName} - ${data.guests} guests</p>`,
});

describe("Booking Email Builder", () => {
  const bookingData: BookingEmailData = {
    customerName: "John Smith",
    email: "john@example.com",
    date: "25 Dec 2024",
    time: "19:00",
    guests: 4,
    specialRequests: "Window seat",
    bookingId: "booking-1",
  };

  describe("Confirmation", () => {
    it("should address to customer email", () => {
      const email = buildBookingConfirmation(bookingData);
      expect(email.to).toBe("john@example.com");
    });

    it("should include date and time in subject", () => {
      const email = buildBookingConfirmation(bookingData);
      expect(email.subject).toContain("25 Dec 2024");
      expect(email.subject).toContain("19:00");
    });

    it("should include guest count in body", () => {
      const email = buildBookingConfirmation(bookingData);
      expect(email.html).toContain("4");
    });
  });

  describe("Cancellation", () => {
    it("should send to customer", () => {
      const email = buildBookingCancelled(bookingData);
      expect(email.to).toBe("john@example.com");
    });

    it("should mention date in body", () => {
      const email = buildBookingCancelled(bookingData);
      expect(email.html).toContain("25 Dec 2024");
    });
  });

  describe("Reminder", () => {
    it("should include time in subject", () => {
      const email = buildBookingReminder(bookingData);
      expect(email.subject).toContain("19:00");
    });
  });

  describe("Admin Alert", () => {
    it("should send to admin email", () => {
      const email = buildBookingAdminAlert(bookingData);
      expect(email.to).toBe("admin@sultanrestaurant.co.uk");
    });

    it("should include customer name", () => {
      const email = buildBookingAdminAlert(bookingData);
      expect(email.subject).toContain("John Smith");
    });
  });
});
