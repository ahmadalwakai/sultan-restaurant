import { vi } from "vitest";

export const resendMock = {
  emails: {
    send: vi.fn().mockResolvedValue({ id: "email_test_123", error: null }),
  },
};

vi.mock("@/lib/email/resend", () => ({
  resend: resendMock,
  sendEmail: vi.fn().mockResolvedValue({ success: true, id: "email_test_123" }),
  enqueueEmail: vi.fn().mockResolvedValue(undefined),
  renderEmailHtml: vi.fn().mockReturnValue("<html><body>Test email</body></html>"),
}));
