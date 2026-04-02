import { describe, it, expect } from "vitest";

const highlightMatches = (text: string, query: string): string => {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

describe("Highlight Matches", () => {
  it("should wrap matching text in mark tags", () => {
    const result = highlightMatches("Chicken Tikka Masala", "tikka");
    expect(result).toBe("Chicken <mark>Tikka</mark> Masala");
  });

  it("should highlight multiple occurrences", () => {
    const result = highlightMatches("Chicken and chicken wings", "chicken");
    expect(result).toContain("<mark>Chicken</mark>");
    expect(result).toContain("<mark>chicken</mark>");
  });

  it("should return original text when no match", () => {
    const result = highlightMatches("Biryani", "pizza");
    expect(result).toBe("Biryani");
  });

  it("should handle empty query", () => {
    const result = highlightMatches("Some text", "");
    expect(result).toBe("Some text");
  });

  it("should escape regex special characters", () => {
    const result = highlightMatches("Price: £9.99", "£9.99");
    expect(result).toBe("Price: <mark>£9.99</mark>");
  });
});
