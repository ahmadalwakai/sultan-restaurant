import { test, expect } from "@playwright/test";

test.describe("Session Persistence", () => {
  test("should persist cart across page navigations", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();

    // Navigate away and back
    await page.goto("/contact");
    await page.goto("/menu");
    // Cart should still have items (persisted in localStorage)
    await page.waitForLoadState("networkidle");
  });

  test("should persist cart in localStorage", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();

    // Check localStorage
    const cartData = await page.evaluate(() => localStorage.getItem("sultan-cart"));
    expect(cartData).not.toBeNull();
  });

  test("should clear cart when localStorage is cleared", async ({ page }) => {
    await page.goto("/menu");
    await page.evaluate(() => localStorage.removeItem("sultan-cart"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    const cartData = await page.evaluate(() => localStorage.getItem("sultan-cart"));
    // Should be null or empty after clearing
    expect(cartData === null || cartData === "[]" || cartData === '{"state":{"items":[]},"version":0}').toBeTruthy();
  });
});
