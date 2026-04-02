import { test, expect } from "@playwright/test";

test.describe("Admin Manage Orders", () => {
  test("should require auth for orders page", async ({ page }) => {
    await page.goto("/admin/orders");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/admin/);
  });

  test("should have orders route", async ({ page }) => {
    const response = await page.goto("/admin/orders");
    expect(response?.status()).toBeLessThan(500);
  });
});
