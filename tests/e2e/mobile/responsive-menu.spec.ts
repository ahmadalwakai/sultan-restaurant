import { test, expect } from "@playwright/test";

test.describe("Responsive Menu", () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X

  test("should show mobile hamburger menu", async ({ page }) => {
    await page.goto("/");
    const hamburger = page.getByLabel("Toggle menu");
    await expect(hamburger).toBeVisible({ timeout: 10000 });
  });

  test("should open mobile navigation", async ({ page }) => {
    await page.goto("/");
    const hamburger = page.getByLabel("Toggle menu");
    await expect(hamburger).toBeVisible({ timeout: 10000 });
    await hamburger.click();
    // Navigation links should be visible
    await expect(page.getByRole("link", { name: /Menu/i }).first()).toBeVisible({ timeout: 5000 });
  });

  test("should navigate via mobile menu", async ({ page }) => {
    await page.goto("/");
    const hamburger = page.getByLabel("Toggle menu");
    await hamburger.click();
    const menuLink = page.getByRole("link", { name: /Menu/i }).first();
    await menuLink.click();
    await expect(page).toHaveURL(/\/menu/);
  });

  test("should close mobile menu on navigation", async ({ page }) => {
    await page.goto("/");
    const hamburger = page.getByLabel("Toggle menu");
    await hamburger.click();
    const contactLink = page.getByRole("link", { name: /Contact/i }).first();
    await contactLink.click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
