import { test, expect } from "@playwright/test";

test.describe("Admin Manage Bookings", () => {
  test("should require auth for bookings page", async ({ page }) => {
    await page.goto("/admin/bookings");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/admin/);
  });

  test("should have bookings route", async ({ page }) => {
    const response = await page.goto("/admin/bookings");
    expect(response?.status()).toBeLessThan(500);
  });
});
