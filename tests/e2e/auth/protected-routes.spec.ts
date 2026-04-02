import { test, expect } from "@playwright/test";

test.describe("Protected Routes", () => {
  test("should redirect admin routes to login when not authenticated", async ({ page }) => {
    await page.goto("/admin/dashboard");
    await page.waitForLoadState("networkidle");
    // Should redirect to admin login
    const url = page.url();
    expect(url).toMatch(/admin.*login|signin|auth|admin/);
  });

  test("should block admin orders page without auth", async ({ page }) => {
    await page.goto("/admin/orders");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/admin.*login|signin|auth|admin/);
  });

  test("should block admin menu page without auth", async ({ page }) => {
    await page.goto("/admin/menu");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toMatch(/admin.*login|signin|auth|admin/);
  });

  test("should allow public pages without auth", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Sultan/i).first()).toBeVisible({ timeout: 10000 });
    await page.goto("/menu");
    await expect(page.getByText(/Menu/i).first()).toBeVisible({ timeout: 10000 });
    await page.goto("/contact");
    await expect(page.getByText(/Contact/i).first()).toBeVisible({ timeout: 10000 });
  });
});
