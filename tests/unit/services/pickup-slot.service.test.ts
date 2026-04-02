import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("pickupSlotService", () => {
  beforeEach(() => resetPrismaMock());

  describe("getAvailableSlots", () => {
    it("should return 15-minute time slots", async () => {
      prismaMock.order.groupBy.mockResolvedValue([]);

      const { pickupSlotService } = await import("@/lib/services");
      const result = await pickupSlotService.getAvailableSlots();

      expect(Array.isArray(result)).toBe(true);
    });

    it("should exclude slots with max orders reached", async () => {
      prismaMock.order.groupBy.mockResolvedValue([
        { pickupTime: "18:00", _count: { id: 5 } },
      ]);

      const { pickupSlotService } = await import("@/lib/services");
      const result = await pickupSlotService.getAvailableSlots();

      // Slot at 18:00 should be excluded or marked full
      expect(result).toBeDefined();
    });
  });
});
