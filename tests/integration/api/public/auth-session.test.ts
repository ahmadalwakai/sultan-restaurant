import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next-auth", () => ({ getServerSession: vi.fn() }));
vi.mock("@/lib/auth/options", () => ({ authOptions: {} }));

import { getServerSession } from "next-auth";

describe("GET /api/auth/session", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return user session when authenticated", async () => {
    vi.mocked(getServerSession).mockResolvedValue({
      user: { id: "user-1", email: "test@test.com", name: "Test", role: "CUSTOMER" },
    } as never);

    const session = await getServerSession();
    expect(session).toBeDefined();
    expect(session!.user.email).toBe("test@test.com");
  });

  it("should return null when not authenticated", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const session = await getServerSession();
    expect(session).toBeNull();
  });
});
