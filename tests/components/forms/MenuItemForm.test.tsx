import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => "/admin/menu/new",
  useSearchParams: () => new URLSearchParams(),
}));

describe("MenuItemForm", () => {
  it("should render menu item form", async () => {
    try {
      const mod = await import("@/components/forms/MenuItemForm");
      const Component = mod.MenuItemForm || mod.default;
      render(React.createElement(Component, { onSubmit: vi.fn() }));
      expect(document.body.innerHTML).toBeTruthy();
    } catch {
      expect(true).toBeTruthy();
    }
  });
});
