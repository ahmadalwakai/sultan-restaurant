import { test, expect } from "@playwright/test";

test.describe("Admin Manage Combos", () => {
  test("should have admin routes accessible", async ({ page }) => {
    // Test various admin routes exist (don't 500)
    const routes = ["/admin/dashboard", "/admin/orders", "/admin/bookings"];
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(500);
    }
  });
});
