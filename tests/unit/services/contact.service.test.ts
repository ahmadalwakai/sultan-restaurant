import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { contactMessages } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("contactService", () => {
  beforeEach(() => resetPrismaMock());

  describe("submit", () => {
    it("should create a contact message", async () => {
      prismaMock.contactMessage.create.mockResolvedValue(contactMessages[0]);

      const { contactService } = await import("@/lib/services");
      const result = await contactService.submit({
        name: "Tom Hardy",
        email: "tom@example.com",
        phone: "07700900010",
        subject: "Catering enquiry",
        message: "Hi, I would like to enquire about catering.",
      });

      expect(prismaMock.contactMessage.create).toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should return all messages", async () => {
      prismaMock.contactMessage.findMany.mockResolvedValue(contactMessages);

      const { contactService } = await import("@/lib/services");
      const result = await contactService.getAll();

      expect(result).toHaveLength(2);
    });
  });

  describe("markRead", () => {
    it("should update message status to READ", async () => {
      prismaMock.contactMessage.update.mockResolvedValue({
        ...contactMessages[0],
        status: "READ",
      });

      const { contactService } = await import("@/lib/services");
      await contactService.markRead("msg-1");

      expect(prismaMock.contactMessage.update).toHaveBeenCalled();
    });
  });
});
