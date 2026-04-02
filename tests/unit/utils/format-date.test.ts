import { describe, it, expect } from "vitest";
import { formatDate, formatDateTime, formatTime, formatRelative } from "@/lib/utils/format-date";

describe("formatDate", () => {
  it("should format date as dd MMM yyyy", () => {
    const result = formatDate(new Date("2026-04-01"));
    expect(result).toMatch(/\d{2}\s\w{3}\s\d{4}/);
  });

  it("should handle string date input", () => {
    const result = formatDate("2026-04-01" as any);
    expect(result).toBeDefined();
  });
});

describe("formatDateTime", () => {
  it("should include time in format", () => {
    const result = formatDateTime(new Date("2026-04-01T18:30:00"));
    expect(result).toContain("18:30");
  });
});

describe("formatTime", () => {
  it("should return HH:mm format", () => {
    const result = formatTime(new Date("2026-04-01T18:30:00"));
    expect(result).toBe("18:30");
  });
});

describe("formatRelative", () => {
  it("should return relative time string", () => {
    const recent = new Date(Date.now() - 60000);
    const result = formatRelative(recent);
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });
});
