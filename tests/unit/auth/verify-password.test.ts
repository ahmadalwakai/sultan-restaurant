import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";

describe("verifyPassword", () => {
  it("should verify a correct password", async () => {
    const hash = await bcrypt.hash("password123", 10);
    const isValid = await bcrypt.compare("password123", hash);
    expect(isValid).toBe(true);
  });

  it("should reject an incorrect password", async () => {
    const hash = await bcrypt.hash("password123", 10);
    const isValid = await bcrypt.compare("wrongpassword", hash);
    expect(isValid).toBe(false);
  });

  it("should reject an empty password", async () => {
    const hash = await bcrypt.hash("password123", 10);
    const isValid = await bcrypt.compare("", hash);
    expect(isValid).toBe(false);
  });
});
