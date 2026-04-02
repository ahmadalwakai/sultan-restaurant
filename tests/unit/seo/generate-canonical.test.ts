import { describe, it, expect } from "vitest";

const BASE_URL = "https://sultanrestaurant.co.uk";

const generateCanonical = (path: string, baseUrl: string = BASE_URL): string => {
  const cleanPath = path.replace(/\/+$/, "").replace(/\/+/g, "/");
  if (cleanPath === "" || cleanPath === "/") return baseUrl;
  return `${baseUrl}${cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`}`;
};

describe("Generate Canonical URL", () => {
  it("should return base URL for root path", () => {
    expect(generateCanonical("/")).toBe(BASE_URL);
  });

  it("should append path to base URL", () => {
    expect(generateCanonical("/menu")).toBe(`${BASE_URL}/menu`);
  });

  it("should remove trailing slashes", () => {
    expect(generateCanonical("/menu/")).toBe(`${BASE_URL}/menu`);
  });

  it("should handle nested paths", () => {
    expect(generateCanonical("/menu/starters")).toBe(`${BASE_URL}/menu/starters`);
  });

  it("should collapse multiple slashes", () => {
    expect(generateCanonical("//menu///starters")).toBe(`${BASE_URL}/menu/starters`);
  });

  it("should add leading slash if missing", () => {
    expect(generateCanonical("menu")).toBe(`${BASE_URL}/menu`);
  });

  it("should handle empty path", () => {
    expect(generateCanonical("")).toBe(BASE_URL);
  });
});
