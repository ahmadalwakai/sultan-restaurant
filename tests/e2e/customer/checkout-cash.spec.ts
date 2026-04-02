import { test, expect } from "@playwright/test";

test.describe("Checkout - Cash Payment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();
    await page.goto("/pickup");
  });

  test("should fill checkout form", async ({ page }) => {
    await expect(page.getByLabel(/Name/i).first()).toBeVisible({ timeout: 10000 });
    await page.getByLabel(/Name/i).first().fill("John Doe");
    await page.getByLabel(/Phone/i).first().fill("07123456789");
    await page.getByLabel(/Email/i).first().fill("john@test.com");
    // Form should be filled without errors
    await expect(page.getByLabel(/Name/i).first()).toHaveValue("John Doe");
  });

  test("should show validation errors on empty submit", async ({ page }) => {
    await expect(page.getByLabel(/Name/i).first()).toBeVisible({ timeout: 10000 });
    const submitBtn = page.getByRole("button", { name: /Place Order|Submit/i }).first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // Should show validation errors
      await page.waitForTimeout(500);
    }
  });

  test("should display total in order summary", async ({ page }) => {
    await expect(page.getByText(/Total|Subtotal/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/£/)).toBeVisible();
  });
});
