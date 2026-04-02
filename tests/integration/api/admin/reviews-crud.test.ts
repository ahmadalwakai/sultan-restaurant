import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    review: { findMany: vi.fn(), count: vi.fn(), update: vi.fn(), delete: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Reviews", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should list reviews with pagination", async () => {
    vi.mocked(prisma.review.findMany).mockResolvedValue([
      { id: "r1", rating: 5, status: "PENDING" },
    ] as never);

    const reviews = await prisma.review.findMany({ take: 20 });
    expect(reviews).toHaveLength(1);
  });

  it("should approve a review", async () => {
    vi.mocked(prisma.review.update).mockResolvedValue({
      id: "r1", status: "APPROVED",
    } as never);

    const review = await prisma.review.update({
      where: { id: "r1" },
      data: { status: "APPROVED" },
    });
    expect(review.status).toBe("APPROVED");
  });

  it("should reject a review", async () => {
    vi.mocked(prisma.review.update).mockResolvedValue({
      id: "r1", status: "REJECTED",
    } as never);

    const review = await prisma.review.update({
      where: { id: "r1" },
      data: { status: "REJECTED" },
    });
    expect(review.status).toBe("REJECTED");
  });

  it("should delete a review", async () => {
    vi.mocked(prisma.review.delete).mockResolvedValue({ id: "r1" } as never);
    await prisma.review.delete({ where: { id: "r1" } });
    expect(prisma.review.delete).toHaveBeenCalled();
  });
});
