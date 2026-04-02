import { describe, it, expect } from "vitest";

describe("Search Scoring", () => {
  const scoreMatch = (query: string, name: string, description: string): number => {
    const q = query.toLowerCase();
    const n = name.toLowerCase();
    const d = description.toLowerCase();

    let score = 0;
    if (n === q) score += 100;
    else if (n.startsWith(q)) score += 75;
    else if (n.includes(q)) score += 50;
    if (d.includes(q)) score += 25;
    return score;
  };

  it("should score exact name match highest", () => {
    const score = scoreMatch("Biryani", "Biryani", "A rice dish");
    expect(score).toBe(125); // 100 (exact) + 25 (desc doesn't match)
  });

  it("should score name prefix match higher than contains", () => {
    const prefixScore = scoreMatch("Birya", "Biryani", "Rice dish");
    const containsScore = scoreMatch("irya", "Biryani", "Rice dish");
    expect(prefixScore).toBeGreaterThan(containsScore);
  });

  it("should score description match", () => {
    const score = scoreMatch("spicy", "Chicken Tikka", "A spicy grilled chicken");
    expect(score).toBe(25);
  });

  it("should return 0 for no match", () => {
    const score = scoreMatch("pizza", "Biryani", "A rice dish");
    expect(score).toBe(0);
  });

  it("should be case insensitive", () => {
    const score1 = scoreMatch("BIRYANI", "biryani", "rice");
    const score2 = scoreMatch("biryani", "BIRYANI", "rice");
    expect(score1).toBe(score2);
  });
});
