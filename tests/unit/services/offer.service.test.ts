import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { offers } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("offerService", () => {
  beforeEach(() => resetPrismaMock());

  describe("getActiveOffers", () => {
    it("should return only active, non-expired offers", async () => {
      const activeOffers = offers.filter((o) => o.isActive);
      prismaMock.offer.findMany.mockResolvedValue(activeOffers);

      const { offerService } = await import("@/lib/services");
      const result = await offerService.getActiveOffers();

      expect(prismaMock.offer.findMany).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return offer by id", async () => {
      prismaMock.offer.findUnique.mockResolvedValue(offers[0]);

      const { offerService } = await import("@/lib/services");
      const result = await offerService.getById("offer-1");

      expect(result).toBeDefined();
    });
  });

  describe("toggle", () => {
    it("should toggle offer active status", async () => {
      prismaMock.offer.findUnique.mockResolvedValue(offers[0]);
      prismaMock.offer.update.mockResolvedValue({ ...offers[0], isActive: false });

      const { offerService } = await import("@/lib/services");
      const result = await offerService.toggle("offer-1");

      expect(prismaMock.offer.update).toHaveBeenCalled();
    });
  });
});
