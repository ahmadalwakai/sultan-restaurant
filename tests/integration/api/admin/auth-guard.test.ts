import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn(),
}));

import { requireAdmin } from "@/lib/guards";

describe("Admin Auth Guard Integration", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should allow authenticated admin", async () => {
    vi.mocked(requireAdmin).mockResolvedValue({
      id: "admin-1", email: "admin@test.com", name: "Admin", role: "admin",
    });

    const session = await requireAdmin();
    expect(session.role).toBe("admin");
  });

  it("should reject unauthenticated requests", async () => {
    vi.mocked(requireAdmin).mockRejectedValue(new Error("Admin login required"));
    await expect(requireAdmin()).rejects.toThrow("Admin login required");
  });

  it("should reject non-admin users", async () => {
    vi.mocked(requireAdmin).mockRejectedValue(new Error("Admin access required"));
    await expect(requireAdmin()).rejects.toThrow("Admin access required");
  });
});
