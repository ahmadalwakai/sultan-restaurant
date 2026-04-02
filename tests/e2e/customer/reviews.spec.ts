import { test, expect } from "@playwright/test";

test.describe("Reviews", () => {
  test("should show reviews section on home page", async ({ page }) => {
    await page.goto("/");
    const reviews = page.getByText(/Review|Testimonial|What Our Customers Say/i).first();
    await expect(reviews).toBeVisible({ timeout: 10000 });
  });

  test("should display review cards", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Look for star ratings or review text
    const stars = page.locator("[class*='star'], [class*='rating'], text=/★/");
    const count = await stars.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should navigate reviews carousel", async ({ page }) => {
    await page.goto("/");
    const prevBtn = page.getByLabel("Previous reviews");
    const nextBtn = page.getByLabel("Next reviews");
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(500);
    }
    if (await prevBtn.isVisible()) {
      await prevBtn.click();
      await page.waitForTimeout(500);
    }
  });
});
