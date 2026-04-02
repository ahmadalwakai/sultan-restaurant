import { describe, it, expect } from "vitest";

type FilterParams = {
  search?: string;
  categoryId?: string;
  dietary?: string[];
};

const buildFilterQuery = (params: FilterParams): Record<string, unknown> => {
  const where: Record<string, unknown> = { isAvailable: true };

  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { description: { contains: params.search, mode: "insensitive" } },
    ];
  }

  if (params.categoryId) {
    where.categoryId = params.categoryId;
  }

  if (params.dietary?.length) {
    const dietaryFilters: Record<string, boolean>[] = [];
    for (const tag of params.dietary) {
      if (tag === "vegetarian") dietaryFilters.push({ isVegetarian: true });
      if (tag === "vegan") dietaryFilters.push({ isVegan: true });
      if (tag === "glutenFree") dietaryFilters.push({ isGlutenFree: true });
    }
    if (dietaryFilters.length) where.AND = dietaryFilters;
  }

  return where;
};

describe("Build Filter Query", () => {
  it("should include isAvailable by default", () => {
    const query = buildFilterQuery({});
    expect(query.isAvailable).toBe(true);
  });

  it("should add search to OR clause", () => {
    const query = buildFilterQuery({ search: "chicken" });
    expect(query.OR).toHaveLength(2);
  });

  it("should add categoryId filter", () => {
    const query = buildFilterQuery({ categoryId: "cat-1" });
    expect(query.categoryId).toBe("cat-1");
  });

  it("should add dietary filters as AND clause", () => {
    const query = buildFilterQuery({ dietary: ["vegetarian", "glutenFree"] });
    expect(query.AND).toHaveLength(2);
  });

  it("should combine all filters", () => {
    const query = buildFilterQuery({
      search: "curry",
      categoryId: "cat-2",
      dietary: ["vegan"],
    });
    expect(query.isAvailable).toBe(true);
    expect(query.OR).toBeDefined();
    expect(query.categoryId).toBe("cat-2");
    expect(query.AND).toHaveLength(1);
  });
});
