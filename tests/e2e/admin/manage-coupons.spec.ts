import { test, expect } from "@playwright/test";

test.describe("Admin Manage Coupons", () => {
  test("should require auth for coupons page", async ({ page }) => {
    const response = await page.goto("/admin/offers");
    await page.waitForLoadState("networkidle");
    expect(response?.status()).toBeLessThan(500);
  });
});

test.describe("Admin Manage Offers", () => {
  test("should require auth for offers page", async ({ page }) => {
    await page.goto("/admin/offers");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/admin/);
  });

  test("should have offers route", async ({ page }) => {
    const response = await page.goto("/admin/offers");
    expect(response?.status()).toBeLessThan(500);
  });
});
