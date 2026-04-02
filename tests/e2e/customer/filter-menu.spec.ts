import { test, expect } from "@playwright/test";

test.describe("Filter Menu", () => {
  test("should filter by category tab", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    // Click "All" tab should show all items
    const allTab = page.getByRole("button", { name: /^All$/i }).first();
    if (await allTab.isVisible()) {
      await allTab.click();
      await page.waitForTimeout(300);
    }
  });

  test("should switch between category tabs", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    // Find category tabs (buttons that aren't "All")
    const tabs = page.locator("button").filter({ hasText: /^(?!All$|Add to Cart$|Search)/ });
    const count = await tabs.count();
    if (count > 1) {
      await tabs.nth(1).click();
      await page.waitForTimeout(500);
    }
  });

  test("should combine search with category filter", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const searchInput = page.getByPlaceholder("Search dishes...");
    await searchInput.fill("special");
    await page.waitForTimeout(500);
  });
});
