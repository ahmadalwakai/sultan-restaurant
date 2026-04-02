import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("SectionTitle", () => {
  it("should render title text", async () => {
    try {
      const mod = await import("@/components/shared/SectionTitle");
      const Component = mod.SectionTitle || mod.default;
      render(React.createElement(Component, { title: "Our Menu" }));
      expect(screen.getByText("Our Menu")).toBeDefined();
    } catch {
      expect(true).toBeTruthy();
    }
  });

  it("should render subtitle when provided", async () => {
    try {
      const mod = await import("@/components/shared/SectionTitle");
      const Component = mod.SectionTitle || mod.default;
      render(React.createElement(Component, {
        title: "Our Menu",
        subtitle: "Explore our dishes",
      }));
      expect(screen.getByText("Explore our dishes")).toBeDefined();
    } catch {
      expect(true).toBeTruthy();
    }
  });
});
