import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/session", () => ({
  getAdminSession: vi.fn(),
}));

vi.mock("@/lib/errors", () => ({
  UnauthorizedError: class UnauthorizedError extends Error {
    constructor(msg: string) {
      super(msg);
      this.name = "UnauthorizedError";
    }
  },
  ForbiddenError: class ForbiddenError extends Error {
    constructor(msg: string) {
      super(msg);
      this.name = "ForbiddenError";
    }
  },
}));

import { requireAdmin } from "@/lib/guards/require-admin";
import { getAdminSession } from "@/lib/session";

describe("requireAdmin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return admin session when valid", async () => {
    const session = { id: "admin-1", email: "admin@test.com", name: "Admin", role: "admin" };
    vi.mocked(getAdminSession).mockResolvedValue(session);

    const result = await requireAdmin();
    expect(result).toEqual(session);
  });

  it("should throw UnauthorizedError when no session", async () => {
    vi.mocked(getAdminSession).mockResolvedValue(null);

    await expect(requireAdmin()).rejects.toThrow("Admin login required");
  });

  it("should throw ForbiddenError when role is not admin", async () => {
    vi.mocked(getAdminSession).mockResolvedValue({
      id: "user-1",
      email: "user@test.com",
      name: "User",
      role: "customer",
    });

    await expect(requireAdmin()).rejects.toThrow("Admin access required");
  });
});
