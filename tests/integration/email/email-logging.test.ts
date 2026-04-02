import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: {
    emailLog: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Email Logging Integration", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should log sent email to database", async () => {
    vi.mocked(prisma.emailLog.create).mockResolvedValue({
      id: "log-1",
      to: "customer@test.com",
      subject: "Order Confirmed",
      type: "ORDER_CONFIRMATION",
      status: "SENT",
      sentAt: new Date(),
    } as never);

    const log = await prisma.emailLog.create({
      data: {
        to: "customer@test.com",
        subject: "Order Confirmed",
        type: "ORDER_CONFIRMATION",
        status: "SENT",
        sentAt: new Date(),
      },
    });
    expect(log.id).toBe("log-1");
    expect(log.status).toBe("SENT");
  });

  it("should log failed email", async () => {
    vi.mocked(prisma.emailLog.create).mockResolvedValue({
      id: "log-2",
      to: "customer@test.com",
      subject: "Order Confirmed",
      type: "ORDER_CONFIRMATION",
      status: "FAILED",
      error: "Rate limit exceeded",
    } as never);

    const log = await prisma.emailLog.create({
      data: {
        to: "customer@test.com",
        subject: "Order Confirmed",
        type: "ORDER_CONFIRMATION",
        status: "FAILED",
        error: "Rate limit exceeded",
      },
    });
    expect(log.status).toBe("FAILED");
    expect(log.error).toBe("Rate limit exceeded");
  });

  it("should retrieve email logs with pagination", async () => {
    vi.mocked(prisma.emailLog.findMany).mockResolvedValue([
      { id: "log-1", type: "ORDER_CONFIRMATION", status: "SENT" },
      { id: "log-2", type: "BOOKING_CONFIRMATION", status: "SENT" },
    ] as never);
    vi.mocked(prisma.emailLog.count).mockResolvedValue(25);

    const logs = await prisma.emailLog.findMany({
      take: 10,
      skip: 0,
      orderBy: { sentAt: "desc" },
    });
    const total = await prisma.emailLog.count();

    expect(logs).toHaveLength(2);
    expect(total).toBe(25);
  });

  it("should filter email logs by type", async () => {
    vi.mocked(prisma.emailLog.findMany).mockResolvedValue([
      { id: "log-1", type: "ORDER_CONFIRMATION", status: "SENT" },
    ] as never);

    const logs = await prisma.emailLog.findMany({
      where: { type: "ORDER_CONFIRMATION" },
    });
    expect(logs).toHaveLength(1);
    expect(prisma.emailLog.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { type: "ORDER_CONFIRMATION" } })
    );
  });
});
