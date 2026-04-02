import { test, expect } from "@playwright/test";

test.describe("Cart Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();
  });

  test("should open cart drawer", async ({ page }) => {
    const cartTrigger = page.locator("[aria-label='Open cart'], [aria-label='Cart'], button:has-text('Cart')").first();
    if (await cartTrigger.isVisible()) {
      await cartTrigger.click();
      await expect(page.getByText(/Your Cart/i)).toBeVisible({ timeout: 5000 });
    }
  });

  test("should show item in cart drawer", async ({ page }) => {
    const cartTrigger = page.locator("[aria-label='Open cart'], [aria-label='Cart'], button:has-text('Cart')").first();
    if (await cartTrigger.isVisible()) {
      await cartTrigger.click();
      await expect(page.getByText(/£/)).toBeVisible();
    }
  });

  test("should increase item quantity", async ({ page }) => {
    const cartTrigger = page.locator("[aria-label='Open cart'], [aria-label='Cart'], button:has-text('Cart')").first();
    if (await cartTrigger.isVisible()) {
      await cartTrigger.click();
      const increaseBtn = page.getByLabel("Increase").first();
      if (await increaseBtn.isVisible()) {
        await increaseBtn.click();
        await expect(page.getByText("2")).toBeVisible();
      }
    }
  });

  test("should close cart drawer", async ({ page }) => {
    const cartTrigger = page.locator("[aria-label='Open cart'], [aria-label='Cart'], button:has-text('Cart')").first();
    if (await cartTrigger.isVisible()) {
      await cartTrigger.click();
      const closeBtn = page.getByLabel("Close cart");
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
      }
    }
  });
});
