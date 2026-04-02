import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/session", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/lib/errors", () => ({
  UnauthorizedError: class UnauthorizedError extends Error {
    constructor(msg: string) {
      super(msg);
      this.name = "UnauthorizedError";
    }
  },
}));

import { requireCustomer } from "@/lib/guards/require-customer";
import { getSession } from "@/lib/session";

describe("requireCustomer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return session when authenticated", async () => {
    const session = {
      id: "user-1",
      email: "customer@test.com",
      name: "Customer",
      image: null,
      role: "CUSTOMER" as const,
    };
    vi.mocked(getSession).mockResolvedValue(session);

    const result = await requireCustomer();
    expect(result).toEqual(session);
  });

  it("should throw UnauthorizedError when no session", async () => {
    vi.mocked(getSession).mockResolvedValue(null);

    await expect(requireCustomer()).rejects.toThrow("Please sign in");
  });
});
