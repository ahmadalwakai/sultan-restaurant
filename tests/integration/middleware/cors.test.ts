import { describe, it, expect } from "vitest";

describe("CORS Headers", () => {
  const allowedOrigins = ["http://localhost:3000", "https://sultanrestaurant.co.uk"];

  const isAllowedOrigin = (origin: string): boolean =>
    allowedOrigins.includes(origin);

  it("should allow localhost in development", () => {
    expect(isAllowedOrigin("http://localhost:3000")).toBe(true);
  });

  it("should allow production domain", () => {
    expect(isAllowedOrigin("https://sultanrestaurant.co.uk")).toBe(true);
  });

  it("should reject unknown origins", () => {
    expect(isAllowedOrigin("https://evil.com")).toBe(false);
  });
});
