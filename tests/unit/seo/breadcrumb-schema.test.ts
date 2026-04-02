import { describe, it, expect } from "vitest";

const createBreadcrumbData = (
  pathname: string,
  baseUrl: string = "https://sultanrestaurant.co.uk"
) => {
  const segments = pathname.split("/").filter(Boolean);
  const items = [{ name: "Home", url: baseUrl }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const name = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({ name, url: `${baseUrl}${currentPath}` });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

describe("Breadcrumb Schema", () => {
  it("should generate BreadcrumbList schema", () => {
    const schema = createBreadcrumbData("/menu");
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema["@context"]).toBe("https://schema.org");
  });

  it("should start with Home", () => {
    const schema = createBreadcrumbData("/menu");
    expect(schema.itemListElement[0].name).toBe("Home");
    expect(schema.itemListElement[0].position).toBe(1);
  });

  it("should add segment items", () => {
    const schema = createBreadcrumbData("/menu/starters");
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[1].name).toBe("Menu");
    expect(schema.itemListElement[2].name).toBe("Starters");
  });

  it("should format slugs as title case", () => {
    const schema = createBreadcrumbData("/our-menu");
    expect(schema.itemListElement[1].name).toBe("Our Menu");
  });

  it("should include full URLs", () => {
    const schema = createBreadcrumbData("/menu", "https://example.com");
    expect(schema.itemListElement[0].item).toBe("https://example.com");
    expect(schema.itemListElement[1].item).toBe("https://example.com/menu");
  });

  it("should handle root path", () => {
    const schema = createBreadcrumbData("/");
    expect(schema.itemListElement).toHaveLength(1);
  });
});
