import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href }, children),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => React.createElement("img", props),
}));

describe("HeroSection", () => {
  it("should render hero heading", async () => {
    const { HeroSection } = await import("@/components/sections/HeroSection");
    render(React.createElement(HeroSection));
    expect(screen.getByText(/Unforgettable/i)).toBeDefined();
  });

  it("should have Order Now CTA", async () => {
    const { HeroSection } = await import("@/components/sections/HeroSection");
    render(React.createElement(HeroSection));
    expect(screen.getByText(/Order Now/i)).toBeDefined();
  });

  it("should have Book a Table CTA", async () => {
    const { HeroSection } = await import("@/components/sections/HeroSection");
    render(React.createElement(HeroSection));
    expect(screen.getByText(/Book a Table/i)).toBeDefined();
  });
});
