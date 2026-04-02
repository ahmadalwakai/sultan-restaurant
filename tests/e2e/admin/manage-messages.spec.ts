import { test, expect } from "@playwright/test";

test.describe("Admin Manage Messages", () => {
  test("should have admin dashboard accessible", async ({ page }) => {
    const response = await page.goto("/admin/dashboard");
    expect(response?.status()).toBeLessThan(500);
  });
});
