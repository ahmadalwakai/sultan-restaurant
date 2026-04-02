import { describe, it, expect } from "vitest";

const truncateDescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "...";
};

describe("Truncate Description", () => {
  it("should return text as-is when under limit", () => {
    const text = "Short description";
    expect(truncateDescription(text)).toBe("Short description");
  });

  it("should truncate long text with ellipsis", () => {
    const text = "A".repeat(200);
    const result = truncateDescription(text);
    expect(result.length).toBeLessThanOrEqual(160);
    expect(result).toMatch(/\.\.\.$/);
  });

  it("should truncate at word boundary", () => {
    const text = "Sultan Restaurant serves the finest Indian cuisine in Glasgow with authentic recipes and fresh ingredients that you will love " + "a".repeat(100);
    const result = truncateDescription(text);
    expect(result).toMatch(/\.\.\.$/);
    expect(result).not.toMatch(/\s\.\.\.$/); // Should not have space before ellipsis
  });

  it("should respect custom max length", () => {
    const text = "This is a longer description that needs to be truncated";
    const result = truncateDescription(text, 30);
    expect(result.length).toBeLessThanOrEqual(30);
  });

  it("should handle exactly max length text", () => {
    const text = "A".repeat(160);
    expect(truncateDescription(text)).toBe(text);
  });
});
