import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";

describe("hashPassword", () => {
  it("should hash a password", async () => {
    const hash = await bcrypt.hash("password123", 10);
    expect(hash).toBeDefined();
    expect(hash).not.toBe("password123");
    expect(hash.startsWith("$2")).toBe(true);
  });

  it("should produce different hashes for same password", async () => {
    const hash1 = await bcrypt.hash("password123", 10);
    const hash2 = await bcrypt.hash("password123", 10);
    expect(hash1).not.toBe(hash2);
  });
});
