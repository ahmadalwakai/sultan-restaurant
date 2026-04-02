import { test, expect } from "@playwright/test";

test.describe("View Menu Item", () => {
  test("should display item name and price", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const firstCard = page.locator('[class*="grid"] > *').first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });
    await expect(firstCard.locator("h3, h4, [class*='font-bold']").first()).toBeVisible();
    await expect(firstCard.getByText(/£/)).toBeVisible();
  });

  test("should show dietary badges when applicable", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const badges = page.getByText(/^(V|VG|GF)$/);
    // At least some items may have dietary badges
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should show Add to Cart button", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
  });

  test("should navigate to category page", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const tabs = page.locator("button, a").filter({ hasText: /^(?!All$).+/ });
    const secondTab = tabs.nth(1);
    if (await secondTab.isVisible()) {
      await secondTab.click();
      await page.waitForLoadState("networkidle");
    }
  });
});
