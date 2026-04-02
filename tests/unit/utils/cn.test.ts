import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils/cn";

describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("should merge Tailwind conflicts", () => {
    // tailwind-merge should keep the last conflicting class
    expect(cn("p-4", "p-6")).toBe("p-6");
  });

  it("should handle arrays", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("should handle undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("should handle empty string", () => {
    expect(cn("")).toBe("");
  });

  it("should merge conflicting Tailwind colours", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
