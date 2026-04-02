import { describe, it, expect } from "vitest";
import { formatCurrency } from "@/lib/utils/format-currency";

describe("formatCurrency", () => {
  it("should format number as GBP currency", () => {
    expect(formatCurrency(12.95)).toBe("£12.95");
  });

  it("should format zero", () => {
    expect(formatCurrency(0)).toBe("£0.00");
  });

  it("should format large numbers", () => {
    expect(formatCurrency(1234.56)).toBe("£1,234.56");
  });

  it("should format string input", () => {
    expect(formatCurrency("12.95")).toBe("£12.95");
  });

  it("should handle single decimal", () => {
    expect(formatCurrency(10.5)).toBe("£10.50");
  });

  it("should round to 2 decimal places", () => {
    expect(formatCurrency(10.999)).toBe("£11.00");
  });
});
