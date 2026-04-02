import { describe, it, expect } from "vitest";
import { menuItemSchema } from "@/lib/validations";

describe("menuItemSchema", () => {
  const validItem = {
    name: "Chicken Tikka",
    slug: "chicken-tikka",
    price: 12.95,
    categoryId: "cat-1",
    description: "Delicious chicken",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isSpicy: true,
    spiceLevel: 2,
    allergens: ["dairy"],
  };

  it("should pass with valid data", () => {
    const result = menuItemSchema.safeParse(validItem);
    expect(result.success).toBe(true);
  });

  it("should reject missing name", () => {
    const result = menuItemSchema.safeParse({ ...validItem, name: "" });
    expect(result.success).toBe(false);
  });

  it("should reject negative price", () => {
    const result = menuItemSchema.safeParse({ ...validItem, price: -1 });
    expect(result.success).toBe(false);
  });

  it("should reject invalid slug format", () => {
    const result = menuItemSchema.safeParse({ ...validItem, slug: "INVALID SLUG!" });
    expect(result.success).toBe(false);
  });

  it("should reject spice level above 5", () => {
    const result = menuItemSchema.safeParse({ ...validItem, spiceLevel: 6 });
    expect(result.success).toBe(false);
  });
});
