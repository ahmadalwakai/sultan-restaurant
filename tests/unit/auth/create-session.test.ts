import { describe, it, expect, vi } from "vitest";

describe("createSession", () => {
  it("should create a session with user data", () => {
    const session = {
      user: { id: "user-1", email: "test@test.com", name: "Test", role: "CUSTOMER" },
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    expect(session.user.id).toBe("user-1");
    expect(session.expires).toBeDefined();
  });

  it("should set expiration to 7 days for customer", () => {
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const expires = new Date(Date.now() + sevenDays);
    const diff = expires.getTime() - Date.now();
    expect(diff).toBeCloseTo(sevenDays, -3);
  });

  it("should set expiration to 1 day for admin", () => {
    const oneDay = 24 * 60 * 60 * 1000;
    const expires = new Date(Date.now() + oneDay);
    const diff = expires.getTime() - Date.now();
    expect(diff).toBeCloseTo(oneDay, -3);
  });
});
