import { describe, it, expect } from "vitest";
import { adminLoginSchema } from "@/lib/validations";

describe("adminLoginSchema", () => {
  it("should pass with valid email and password", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@sultan.com",
      password: "securePassword123",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = adminLoginSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject short password", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@sultan.com",
      password: "123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject missing fields", () => {
    const result = adminLoginSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
