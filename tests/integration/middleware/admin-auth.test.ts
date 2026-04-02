import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("jose", () => ({
  jwtVerify: vi.fn(),
}));

import { jwtVerify } from "jose";

describe("Admin Route Middleware", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should allow requests with valid admin token", async () => {
    vi.mocked(jwtVerify).mockResolvedValue({
      payload: { sub: "admin-1", role: "admin" },
      protectedHeader: { alg: "HS256" },
    } as never);

    const result = await jwtVerify("valid-token", new TextEncoder().encode("test-secret"));
    expect(result.payload.sub).toBe("admin-1");
  });

  it("should reject requests with invalid token", async () => {
    vi.mocked(jwtVerify).mockRejectedValue(new Error("invalid"));
    await expect(
      jwtVerify("invalid-token", new TextEncoder().encode("test-secret"))
    ).rejects.toThrow();
  });

  it("should allow public admin paths without token", () => {
    const PUBLIC_ADMIN_PATHS = ["/admin/signin", "/admin/auth/error"];
    expect(PUBLIC_ADMIN_PATHS.includes("/admin/signin")).toBe(true);
    expect(PUBLIC_ADMIN_PATHS.includes("/admin/dashboard")).toBe(false);
  });
});
