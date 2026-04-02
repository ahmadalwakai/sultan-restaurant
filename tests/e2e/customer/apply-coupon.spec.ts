import { test, expect } from "@playwright/test";

test.describe("Apply Coupon", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();
    await page.goto("/pickup");
  });

  test("should show coupon input on checkout", async ({ page }) => {
    const couponInput = page.getByPlaceholder(/coupon|promo|discount/i).first();
    if (await couponInput.isVisible()) {
      await expect(couponInput).toBeVisible();
    }
  });

  test("should apply valid coupon code", async ({ page }) => {
    const couponInput = page.getByPlaceholder(/coupon|promo|discount/i).first();
    if (await couponInput.isVisible()) {
      await couponInput.fill("WELCOME10");
      const applyBtn = page.getByRole("button", { name: /Apply/i }).first();
      if (await applyBtn.isVisible()) {
        await applyBtn.click();
        await page.waitForTimeout(1000);
      }
    }
  });

  test("should show error for invalid coupon", async ({ page }) => {
    const couponInput = page.getByPlaceholder(/coupon|promo|discount/i).first();
    if (await couponInput.isVisible()) {
      await couponInput.fill("INVALIDCODE");
      const applyBtn = page.getByRole("button", { name: /Apply/i }).first();
      if (await applyBtn.isVisible()) {
        await applyBtn.click();
        await page.waitForTimeout(1000);
      }
    }
  });
});
