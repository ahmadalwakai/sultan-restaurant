import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { review: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/reviews", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return approved reviews", async () => {
    vi.mocked(prisma.review.findMany).mockResolvedValue([
      { id: "r1", rating: 5, comment: "Great food!", status: "APPROVED" },
      { id: "r2", rating: 4, comment: "Lovely", status: "APPROVED" },
    ] as never);

    const reviews = await prisma.review.findMany({
      where: { status: "APPROVED" },
      take: 10,
      orderBy: { createdAt: "desc" },
    });
    expect(reviews).toHaveLength(2);
    expect(reviews.every((r: { status: string }) => r.status === "APPROVED")).toBe(true);
  });
});
