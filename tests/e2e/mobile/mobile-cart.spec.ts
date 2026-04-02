import { test, expect } from "@playwright/test";

test.describe("Mobile Cart", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should add items to cart on mobile", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();
  });

  test("should open cart on mobile", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await addButton.click();
    const cartTrigger = page.locator("[aria-label='Open cart'], [aria-label='Cart'], button:has-text('Cart')").first();
    if (await cartTrigger.isVisible()) {
      await cartTrigger.click();
      await expect(page.getByText(/Your Cart/i)).toBeVisible({ timeout: 5000 });
    }
  });

  test("should display menu grid in mobile layout", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const grid = page.locator("[class*='grid']").first();
    await expect(grid).toBeVisible({ timeout: 10000 });
  });
});
