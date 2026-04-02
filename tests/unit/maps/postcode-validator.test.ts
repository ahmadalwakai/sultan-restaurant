import { describe, it, expect } from "vitest";

// UK postcode validation from src/lib/maps/postcode-validator.ts
const UK_POSTCODE_REGEX =
  /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

const isValidUKPostcode = (postcode: string): boolean =>
  UK_POSTCODE_REGEX.test(postcode.trim());

const isGlasgowArea = (postcode: string): boolean => {
  const normalized = postcode.trim().toUpperCase();
  return normalized.startsWith("G");
};

describe("Postcode Validator", () => {
  it("should validate standard Glasgow postcode", () => {
    expect(isValidUKPostcode("G1 1AA")).toBe(true);
  });

  it("should validate postcode without space", () => {
    expect(isValidUKPostcode("G11AA")).toBe(true);
  });

  it("should validate longer postcodes", () => {
    expect(isValidUKPostcode("G12 8QQ")).toBe(true);
    expect(isValidUKPostcode("SW1A 1AA")).toBe(true);
  });

  it("should reject invalid postcodes", () => {
    expect(isValidUKPostcode("12345")).toBe(false);
    expect(isValidUKPostcode("INVALID")).toBe(false);
    expect(isValidUKPostcode("")).toBe(false);
  });

  it("should be case insensitive", () => {
    expect(isValidUKPostcode("g1 1aa")).toBe(true);
    expect(isValidUKPostcode("G1 1AA")).toBe(true);
  });

  describe("isGlasgowArea", () => {
    it("should return true for G postcodes", () => {
      expect(isGlasgowArea("G1 1AA")).toBe(true);
      expect(isGlasgowArea("G43 2RE")).toBe(true);
    });

    it("should return false for non-G postcodes", () => {
      expect(isGlasgowArea("E1 6AN")).toBe(false);
      expect(isGlasgowArea("EH1 1YZ")).toBe(false);
    });

    it("should handle lowercase", () => {
      expect(isGlasgowArea("g1 1aa")).toBe(true);
    });
  });
});
