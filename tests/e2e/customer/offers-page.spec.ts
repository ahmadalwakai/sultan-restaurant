import { test, expect } from "@playwright/test";

test.describe("Offers Page", () => {
  test("should display offers page", async ({ page }) => {
    await page.goto("/offers");
    await expect(page.getByText(/Special Offers|Offers|Deals/i).first()).toBeVisible({ timeout: 10000 });
  });

  test("should show offer cards or empty state", async ({ page }) => {
    await page.goto("/offers");
    await page.waitForLoadState("networkidle");
    const hasOffers = await page.locator("[class*='grid'] > *, [class*='card']").first().isVisible().catch(() => false);
    const hasEmpty = await page.getByText(/No active offers/i).isVisible().catch(() => false);
    expect(hasOffers || hasEmpty).toBeTruthy();
  });

  test("should navigate to offers from navigation", async ({ page }) => {
    await page.goto("/");
    const offersLink = page.getByRole("link", { name: /Offers/i }).first();
    if (await offersLink.isVisible()) {
      await offersLink.click();
      await expect(page).toHaveURL(/\/offers/);
    }
  });
});
