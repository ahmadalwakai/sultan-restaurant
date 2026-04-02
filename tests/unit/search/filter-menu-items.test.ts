import { describe, it, expect } from "vitest";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  categoryId: string;
  isAvailable: boolean;
};

const filterMenuItems = (
  items: MenuItem[],
  search: string,
  dietary: string[],
  categoryId?: string
): MenuItem[] => {
  return items.filter((item) => {
    if (!item.isAvailable) return false;
    if (categoryId && item.categoryId !== categoryId) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !item.name.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q)
      )
        return false;
    }
    if (dietary.includes("vegetarian") && !item.isVegetarian) return false;
    if (dietary.includes("vegan") && !item.isVegan) return false;
    if (dietary.includes("glutenFree") && !item.isGlutenFree) return false;
    return true;
  });
};

const items: MenuItem[] = [
  {
    id: "1",
    name: "Chicken Tikka",
    description: "Grilled chicken",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    categoryId: "cat-1",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Vegetable Curry",
    description: "Mixed veg in sauce",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    categoryId: "cat-2",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Lamb Biryani",
    description: "Spiced rice with lamb",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    categoryId: "cat-1",
    isAvailable: false,
  },
];

describe("Filter Menu Items", () => {
  it("should exclude unavailable items", () => {
    const result = filterMenuItems(items, "", []);
    expect(result).toHaveLength(2);
    expect(result.every((i) => i.isAvailable)).toBe(true);
  });

  it("should filter by search query in name", () => {
    const result = filterMenuItems(items, "chicken", []);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Chicken Tikka");
  });

  it("should filter by search query in description", () => {
    const result = filterMenuItems(items, "sauce", []);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Vegetable Curry");
  });

  it("should filter by category", () => {
    const result = filterMenuItems(items, "", [], "cat-2");
    expect(result).toHaveLength(1);
    expect(result[0].categoryId).toBe("cat-2");
  });

  it("should filter by dietary tags", () => {
    const result = filterMenuItems(items, "", ["vegan"]);
    expect(result).toHaveLength(1);
    expect(result[0].isVegan).toBe(true);
  });

  it("should combine all filters", () => {
    const result = filterMenuItems(items, "veg", ["vegetarian"], "cat-2");
    expect(result).toHaveLength(1);
  });

  it("should return empty for no matches", () => {
    const result = filterMenuItems(items, "pizza", []);
    expect(result).toHaveLength(0);
  });
});
