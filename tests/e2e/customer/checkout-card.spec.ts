import { test, expect } from "@playwright/test";

test.describe("Checkout - Card Payment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();
  });

  test("should navigate to checkout/pickup page", async ({ page }) => {
    await page.goto("/pickup");
    await expect(page.getByText(/Order Summary|Your Details|Checkout/i)).toBeVisible({ timeout: 10000 });
  });

  test("should display checkout form fields", async ({ page }) => {
    await page.goto("/pickup");
    await expect(page.getByLabel(/Name/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel(/Phone/i).first()).toBeVisible();
    await expect(page.getByLabel(/Email/i).first()).toBeVisible();
  });

  test("should display order summary with items", async ({ page }) => {
    await page.goto("/pickup");
    await expect(page.getByText(/Order Summary/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/£/)).toBeVisible();
  });

  test("should show empty cart message when no items", async ({ page }) => {
    // Clear localStorage to empty cart
    await page.evaluate(() => localStorage.removeItem("sultan-cart"));
    await page.goto("/pickup");
    await expect(page.getByText(/cart is empty|Browse Menu/i)).toBeVisible({ timeout: 10000 });
  });
});
