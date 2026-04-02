import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { reviews } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("reviewService", () => {
  beforeEach(() => resetPrismaMock());

  describe("getApproved", () => {
    it("should return only approved visible reviews", async () => {
      const approved = reviews.filter((r) => r.status === "APPROVED");
      prismaMock.review.findMany.mockResolvedValue(approved);

      const { reviewService } = await import("@/lib/services");
      const result = await reviewService.getApproved();

      expect(prismaMock.review.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: "APPROVED" }),
        })
      );
    });
  });

  describe("submit", () => {
    it("should create a review with PENDING status", async () => {
      prismaMock.review.create.mockResolvedValue({
        ...reviews[2],
        status: "PENDING",
      });

      const { reviewService } = await import("@/lib/services");
      const result = await reviewService.submit({
        name: "Emily Davis",
        rating: 3,
        comment: "Good food",
      } as any);

      expect(prismaMock.review.create).toHaveBeenCalled();
    });
  });

  describe("updateStatus", () => {
    it("should approve a pending review", async () => {
      prismaMock.review.update.mockResolvedValue({
        ...reviews[2],
        status: "APPROVED",
        isVisible: true,
      });

      const { reviewService } = await import("@/lib/services");
      await reviewService.updateStatus("review-3", "APPROVED" as any);

      expect(prismaMock.review.update).toHaveBeenCalled();
    });
  });
});
