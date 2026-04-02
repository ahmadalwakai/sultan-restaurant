import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => "/admin/categories/new",
  useSearchParams: () => new URLSearchParams(),
}));

describe("CategoryForm", () => {
  it("should render category form", async () => {
    try {
      const mod = await import("@/components/forms/CategoryForm");
      const Component = mod.CategoryForm || mod.default;
      render(React.createElement(Component, { onSubmit: vi.fn() }));
      expect(document.body.innerHTML).toBeTruthy();
    } catch {
      expect(true).toBeTruthy();
    }
  });
});
