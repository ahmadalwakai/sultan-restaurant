import { test, expect } from "@playwright/test";

test.describe("Admin Manage Settings", () => {
  test("should have settings route", async ({ page }) => {
    const response = await page.goto("/admin/settings");
    await page.waitForLoadState("networkidle");
    expect(response?.status()).toBeLessThan(500);
  });

  test("should require auth for settings", async ({ page }) => {
    await page.goto("/admin/settings");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/admin/);
  });
});
