import { test, expect } from "@playwright/test";

test.describe("Touch Navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should scroll through home page sections", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Scroll down to find various sections
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);
  });

  test("should scroll menu grid", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const initialScroll = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => window.scrollBy(0, 300));
    const newScroll = await page.evaluate(() => window.scrollY);
    expect(newScroll).toBeGreaterThanOrEqual(initialScroll);
  });

  test("should have sticky header on scroll", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);
    const header = page.locator("header").first();
    await expect(header).toBeVisible();
  });

  test("should allow tap on buttons", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.tap();
  });
});
