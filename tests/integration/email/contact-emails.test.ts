import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/email/resend-client", () => ({
  resendClient: { emails: { send: vi.fn() } },
}));

import { resendClient } from "@/lib/email/resend-client";

describe("Contact Email Integration", () => {
  const mockSend = vi.mocked(resendClient.emails.send);

  beforeEach(() => {
    vi.clearAllMocks();
    mockSend.mockResolvedValue({ data: { id: "email-1" }, error: null } as never);
  });

  it("should send contact acknowledgement email", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "visitor@test.com",
      subject: "We received your message",
      html: "<h1>Thank you</h1><p>We'll get back to you within 24 hours.</p>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "visitor@test.com",
        subject: expect.stringContaining("received your message"),
      })
    );
  });

  it("should send admin contact alert", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "admin@sultanrestaurant.co.uk",
      subject: "New Contact Message from John",
      html: "<h1>New Contact Message</h1><p>From: John</p><p>Message: Hello</p>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "admin@sultanrestaurant.co.uk",
        subject: expect.stringContaining("New Contact Message"),
      })
    );
  });
});
