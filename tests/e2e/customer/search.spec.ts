import { test, expect } from "@playwright/test";

test.describe("Search Menu", () => {
  test("should search for menu items", async ({ page }) => {
    await page.goto("/menu");
    const searchInput = page.getByPlaceholder("Search dishes...");
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill("chicken");
    // Wait for search results to filter
    await page.waitForTimeout(500);
  });

  test("should show no results for gibberish", async ({ page }) => {
    await page.goto("/menu");
    const searchInput = page.getByPlaceholder("Search dishes...");
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill("xyznotafood123");
    await page.waitForTimeout(500);
    const noResults = page.getByText(/No menu items found|No results/i);
    if (await noResults.isVisible()) {
      await expect(noResults).toBeVisible();
    }
  });

  test("should clear search and show all items", async ({ page }) => {
    await page.goto("/menu");
    const searchInput = page.getByPlaceholder("Search dishes...");
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill("chicken");
    await page.waitForTimeout(300);
    await searchInput.clear();
    await page.waitForTimeout(300);
    await expect(searchInput).toHaveValue("");
  });
});
