import { describe, it, expect } from "vitest";
import { generateValidToken, generateExpiredToken, verifyTestToken } from "../../helpers/auth/test-tokens";

describe("verifySession", () => {
  it("should verify a valid JWT token", async () => {
    const token = await generateValidToken();
    const result = await verifyTestToken(token);
    expect(result.payload.sub).toBe("test-admin-1");
    expect(result.payload.email).toBe("admin@sultan.com");
  });

  it("should reject an expired token", async () => {
    const token = await generateExpiredToken();
    await expect(verifyTestToken(token)).rejects.toThrow();
  });

  it("should include role in token payload", async () => {
    const token = await generateValidToken({ role: "ADMIN" });
    const result = await verifyTestToken(token);
    expect(result.payload.role).toBe("ADMIN");
  });
});
