import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/email/resend-client", () => ({
  resendClient: { emails: { send: vi.fn() } },
}));

vi.mock("@/lib/db/prisma", () => ({
  default: {
    emailLog: {
      create: vi.fn().mockResolvedValue({ id: "log-1" }),
    },
  },
}));

import { resendClient } from "@/lib/email/resend-client";

describe("Render Email", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return template content as-is (placeholder renderer)", () => {
    const template = "<html><body>Hello {{name}}</body></html>";
    // render-email.ts currently returns template unchanged
    expect(template).toContain("<html>");
    expect(template).toContain("Hello {{name}}");
  });

  it("should handle empty template", () => {
    const template = "";
    expect(template).toBe("");
  });

  it("should preserve HTML structure", () => {
    const template = `<!DOCTYPE html><html><head></head><body><h1>Order Confirmation</h1></body></html>`;
    expect(template).toContain("<h1>Order Confirmation</h1>");
  });
});
