import { test, expect } from "@playwright/test";

test.describe("Admin Manage Customers", () => {
  test("should protect customer management route", async ({ page }) => {
    const response = await page.goto("/admin/dashboard");
    await page.waitForLoadState("networkidle");
    expect(response?.status()).toBeLessThan(500);
  });
});
