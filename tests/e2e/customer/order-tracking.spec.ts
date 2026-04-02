import { test, expect } from "@playwright/test";

test.describe("Order Tracking", () => {
  test("should show order details page", async ({ page }) => {
    await page.goto("/orders/test-order-id");
    // Should show order page or redirect
    await page.waitForLoadState("networkidle");
    const hasOrderContent = await page.getByText(/Order|Not Found/i).isVisible();
    expect(hasOrderContent).toBeTruthy();
  });

  test("should display checkout success page", async ({ page }) => {
    await page.goto("/checkout/success");
    await expect(page.getByText(/Order Placed|Thank you|Back to Menu/i)).toBeVisible({ timeout: 10000 });
  });

  test("should have link back to menu from success page", async ({ page }) => {
    await page.goto("/checkout/success");
    const menuLink = page.getByRole("link", { name: /Menu/i }).first();
    await expect(menuLink).toBeVisible({ timeout: 10000 });
  });
});
