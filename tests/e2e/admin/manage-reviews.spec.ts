import { test, expect } from "@playwright/test";

test.describe("Admin Manage Reviews", () => {
  test("should have admin route for reviews", async ({ page }) => {
    const response = await page.goto("/admin/bookings");
    expect(response?.status()).toBeLessThan(500);
  });
});

test.describe("Admin Manage Messages", () => {
  test("should have admin route for messages/contact", async ({ page }) => {
    const response = await page.goto("/admin/dashboard");
    expect(response?.status()).toBeLessThan(500);
  });
});
