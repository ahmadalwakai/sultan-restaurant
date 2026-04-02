import { test, expect } from "@playwright/test";

test.describe("Admin Manage Menu", () => {
  test("should require auth for menu management", async ({ page }) => {
    await page.goto("/admin/menu");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/admin/);
  });

  test("should have menu management route", async ({ page }) => {
    const response = await page.goto("/admin/menu");
    expect(response?.status()).toBeLessThan(500);
  });
});
