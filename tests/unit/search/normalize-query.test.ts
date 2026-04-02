import { describe, it, expect } from "vitest";

const normalizeQuery = (query: string): string =>
  query.trim().toLowerCase().replace(/\s+/g, " ");

describe("Normalize Query", () => {
  it("should lowercase the query", () => {
    expect(normalizeQuery("CHICKEN TIKKA")).toBe("chicken tikka");
  });

  it("should trim whitespace", () => {
    expect(normalizeQuery("  biryani  ")).toBe("biryani");
  });

  it("should collapse multiple spaces", () => {
    expect(normalizeQuery("chicken   tikka   masala")).toBe("chicken tikka masala");
  });

  it("should handle empty string", () => {
    expect(normalizeQuery("")).toBe("");
  });

  it("should handle single word", () => {
    expect(normalizeQuery("korma")).toBe("korma");
  });
});
