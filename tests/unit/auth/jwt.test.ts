import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("jose", () => ({
  SignJWT: vi.fn().mockImplementation((payload) => ({
    setProtectedHeader: vi.fn().mockReturnThis(),
    setIssuedAt: vi.fn().mockReturnThis(),
    setExpirationTime: vi.fn().mockReturnThis(),
    sign: vi.fn().mockResolvedValue("mock-jwt-token"),
  })),
  jwtVerify: vi.fn(),
}));

import { signJWT, verifyJWT } from "@/lib/session/jwt";
import { jwtVerify } from "jose";

describe("JWT utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("signJWT", () => {
    it("should return a signed JWT token", async () => {
      const token = await signJWT({
        sub: "user-1",
        email: "test@test.com",
        name: "Test",
        role: "admin",
      });
      expect(token).toBe("mock-jwt-token");
    });
  });

  describe("verifyJWT", () => {
    it("should return payload for valid token", async () => {
      const payload = {
        sub: "user-1",
        email: "test@test.com",
        name: "Test",
        role: "admin",
        iat: 1000,
        exp: 9999999999,
      };
      vi.mocked(jwtVerify).mockResolvedValue({
        payload,
        protectedHeader: { alg: "HS256" },
      } as never);

      const result = await verifyJWT("valid-token");
      expect(result).toEqual(payload);
    });

    it("should return null for invalid token", async () => {
      vi.mocked(jwtVerify).mockRejectedValue(new Error("invalid"));

      const result = await verifyJWT("invalid-token");
      expect(result).toBeNull();
    });

    it("should return null for expired token", async () => {
      vi.mocked(jwtVerify).mockRejectedValue(new Error("expired"));

      const result = await verifyJWT("expired-token");
      expect(result).toBeNull();
    });
  });
});
