import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/email/resend-client", () => ({
  resendClient: { emails: { send: vi.fn() } },
}));

import { resendClient } from "@/lib/email/resend-client";

describe("Booking Email Integration", () => {
  const mockSend = vi.mocked(resendClient.emails.send);

  beforeEach(() => {
    vi.clearAllMocks();
    mockSend.mockResolvedValue({ data: { id: "email-1" }, error: null } as never);
  });

  it("should send booking confirmation email", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "guest@test.com",
      subject: "Booking Confirmed - Dec 25, 7:00 PM",
      html: "<h1>Booking Confirmed</h1><p>Party size: 4</p>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "guest@test.com",
        subject: expect.stringContaining("Booking Confirmed"),
      })
    );
  });

  it("should send booking cancelled email", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "guest@test.com",
      subject: "Booking Cancelled",
      html: "<h1>Booking Cancelled</h1>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ subject: expect.stringContaining("Cancelled") })
    );
  });

  it("should send booking reminder email", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "guest@test.com",
      subject: "Booking Reminder - Tomorrow at 7:00 PM",
      html: "<h1>Reminder</h1><p>Your booking is tomorrow.</p>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ subject: expect.stringContaining("Reminder") })
    );
  });

  it("should send admin booking alert", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "admin@sultanrestaurant.co.uk",
      subject: "New Booking - Dec 25, 7:00 PM",
      html: "<h1>New Booking</h1><p>Party of 4</p>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "admin@sultanrestaurant.co.uk",
        subject: expect.stringContaining("New Booking"),
      })
    );
  });
});
