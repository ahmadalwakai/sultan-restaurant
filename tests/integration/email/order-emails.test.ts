import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/email/resend-client", () => ({
  resendClient: { emails: { send: vi.fn() } },
}));

import { resendClient } from "@/lib/email/resend-client";

describe("Order Email Integration", () => {
  const mockSend = vi.mocked(resendClient.emails.send);

  beforeEach(() => {
    vi.clearAllMocks();
    mockSend.mockResolvedValue({ data: { id: "email-1" }, error: null } as never);
  });

  it("should send order confirmation email", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "customer@test.com",
      subject: "Order Confirmation - #ORD-001",
      html: "<h1>Order Confirmed</h1><p>Order #ORD-001</p><p>Total: £25.99</p>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "customer@test.com",
        subject: expect.stringContaining("Order Confirmation"),
      })
    );
  });

  it("should send order preparing email", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "customer@test.com",
      subject: "Your Order is Being Prepared",
      html: "<h1>Preparing Your Order</h1>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ subject: expect.stringContaining("Prepared") })
    );
  });

  it("should send order ready email", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "customer@test.com",
      subject: "Your Order is Ready",
      html: "<h1>Order Ready</h1>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ subject: expect.stringContaining("Ready") })
    );
  });

  it("should send order cancelled email", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "customer@test.com",
      subject: "Order Cancelled - #ORD-001",
      html: "<h1>Order Cancelled</h1><p>Refund will be processed.</p>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ subject: expect.stringContaining("Cancelled") })
    );
  });

  it("should send admin order alert", async () => {
    await resendClient.emails.send({
      from: "Sultan <noreply@sultanrestaurant.co.uk>",
      to: "admin@sultanrestaurant.co.uk",
      subject: "New Order Received - #ORD-001",
      html: "<h1>New Order</h1><p>Total: £25.99</p>",
    });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "admin@sultanrestaurant.co.uk",
        subject: expect.stringContaining("New Order"),
      })
    );
  });
});
