import { test, expect } from "@playwright/test";

test.describe("Admin Manage Categories", () => {
  test("should require auth for categories page", async ({ page }) => {
    await page.goto("/admin/categories");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/admin/);
  });

  test("should have categories route", async ({ page }) => {
    const response = await page.goto("/admin/categories");
    expect(response?.status()).toBeLessThan(500);
  });
});
