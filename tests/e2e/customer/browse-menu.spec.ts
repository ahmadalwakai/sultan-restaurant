import { test, expect } from "@playwright/test";

test.describe("Browse Menu", () => {
  test("should display menu page with categories and items", async ({ page }) => {
    await page.goto("/menu");
    await expect(page.locator("h1, h2").filter({ hasText: /Our Menu/i })).toBeVisible();
    await expect(page.getByText("All")).toBeVisible();
  });

  test("should show search input", async ({ page }) => {
    await page.goto("/menu");
    await expect(page.getByPlaceholder("Search dishes...")).toBeVisible();
  });

  test("should display menu items in grid", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const items = page.locator('[class*="grid"] > *');
    await expect(items.first()).toBeVisible({ timeout: 10000 });
  });

  test("should navigate to menu from home page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Order Now/i }).first().click();
    await expect(page).toHaveURL(/\/menu|\/pickup/);
  });
});
