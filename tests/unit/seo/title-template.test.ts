import { describe, it, expect } from "vitest";

const SITE_NAME = "Sultan Restaurant";

const generateTitle = (pageTitle?: string): string => {
  if (!pageTitle) return SITE_NAME;
  return `${pageTitle} | ${SITE_NAME}`;
};

describe("Title Template", () => {
  it("should return site name when no page title", () => {
    expect(generateTitle()).toBe("Sultan Restaurant");
  });

  it("should format page title with site name", () => {
    expect(generateTitle("Menu")).toBe("Menu | Sultan Restaurant");
  });

  it("should handle long page titles", () => {
    const title = generateTitle("Best Indian Restaurant in Glasgow");
    expect(title).toBe("Best Indian Restaurant in Glasgow | Sultan Restaurant");
  });

  it("should handle empty string as no title", () => {
    expect(generateTitle("")).toBe("Sultan Restaurant");
  });
});
