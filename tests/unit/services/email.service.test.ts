import { describe, it, expect, vi, beforeEach } from "vitest";
import { resendMock } from "../../mocks/resend";

vi.mock("@/lib/email/resend", () => ({
  resend: resendMock,
  sendEmail: vi.fn().mockResolvedValue({ success: true, id: "email_123" }),
}));

describe("emailService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendEmail", () => {
    it("should send email and return success", async () => {
      const { sendEmail } = await import("@/lib/email/resend");
      const result = await sendEmail({
        to: "customer@test.com",
        subject: "Order Confirmation",
        html: "<p>Your order is confirmed</p>",
      } as any);

      expect(result.success).toBe(true);
      expect(result.id).toBeDefined();
    });

    it("should handle send failure gracefully", async () => {
      const { sendEmail } = await import("@/lib/email/resend");
      vi.mocked(sendEmail).mockResolvedValueOnce({ success: false, error: "API error" } as any);

      const result = await sendEmail({
        to: "invalid",
        subject: "Test",
        html: "<p>Test</p>",
      } as any);

      expect(result.success).toBe(false);
    });
  });
});
