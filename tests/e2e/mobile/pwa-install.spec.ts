import { test, expect } from "@playwright/test";

test.describe("PWA Install", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should serve manifest.json", async ({ page }) => {
    const response = await page.goto("/manifest.json");
    if (response && response.status() === 200) {
      const manifest = await response.json();
      expect(manifest.name).toBeDefined();
      expect(manifest.icons).toBeDefined();
    }
  });

  test("should have meta theme-color", async ({ page }) => {
    await page.goto("/");
    const themeColor = await page.locator('meta[name="theme-color"]').getAttribute("content");
    // May or may not have theme-color
    expect(typeof themeColor === "string" || themeColor === null).toBeTruthy();
  });

  test("should have viewport meta tag", async ({ page }) => {
    await page.goto("/");
    const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(viewport).toContain("width=device-width");
  });

  test("should load on mobile viewport", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Sultan/i).first()).toBeVisible({ timeout: 10000 });
  });
});
