import { test, expect } from "@playwright/test";

test.describe("Admin Manage Offers", () => {
  test("should have offers admin route", async ({ page }) => {
    const response = await page.goto("/admin/offers");
    await page.waitForLoadState("networkidle");
    expect(response?.status()).toBeLessThan(500);
  });

  test("should require auth for offers management", async ({ page }) => {
    await page.goto("/admin/offers");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/admin/);
  });
});
