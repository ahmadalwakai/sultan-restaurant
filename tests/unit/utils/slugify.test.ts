import { describe, it, expect } from "vitest";
import { slugify } from "@/lib/utils/slugify";

describe("slugify", () => {
  it("should convert text to lowercase slug", () => {
    expect(slugify("Chicken Tikka Masala")).toBe("chicken-tikka-masala");
  });

  it("should handle special characters", () => {
    expect(slugify("Chef's Special!")).toBe("chefs-special");
  });

  it("should handle multiple spaces", () => {
    expect(slugify("Lamb   Biryani")).toBe("lamb-biryani");
  });

  it("should strip leading/trailing whitespace", () => {
    expect(slugify("  Garlic Naan  ")).toBe("garlic-naan");
  });

  it("should handle numbers", () => {
    expect(slugify("2 For 1 Deal")).toBe("2-for-1-deal");
  });

  it("should handle already-slugified text", () => {
    expect(slugify("already-slugified")).toBe("already-slugified");
  });

  it("should handle unicode characters", () => {
    const result = slugify("Crème Brûlée");
    expect(result).toBeDefined();
    expect(result).not.toContain(" ");
  });
});
