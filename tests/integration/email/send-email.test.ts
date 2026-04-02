import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/email/resend-client", () => ({
  resendClient: { emails: { send: vi.fn() } },
}));
vi.mock("@/lib/db/prisma", () => ({
  default: { emailLog: { create: vi.fn().mockResolvedValue({ id: "log-1" }) } },
}));

import { resendClient } from "@/lib/email/resend-client";

describe("Email Send Integration", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should send email via Resend", async () => {
    vi.mocked(resendClient.emails.send).mockResolvedValue({
      data: { id: "email-1" }, error: null,
    } as never);

    const result = await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "customer@test.com",
      subject: "Order Confirmed",
      html: "<h1>Order Confirmed</h1>",
    });
    expect(result.data.id).toBe("email-1");
  });

  it("should handle send failure gracefully", async () => {
    vi.mocked(resendClient.emails.send).mockResolvedValue({
      data: null, error: { message: "Rate limit exceeded" },
    } as never);

    const result = await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "customer@test.com",
      subject: "Test",
      html: "<p>Test</p>",
    });
    expect(result.error).toBeDefined();
  });
});
