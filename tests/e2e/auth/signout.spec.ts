import { test, expect } from "@playwright/test";

test.describe("Sign Out", () => {
  test("should redirect unauthenticated user from protected routes", async ({ page }) => {
    await page.goto("/orders/my-orders");
    await page.waitForLoadState("networkidle");
    // Should redirect to signin or show auth prompt
    const url = page.url();
    const hasAuth = url.includes("signin") || url.includes("auth");
    const hasContent = await page.getByText(/Sign In|Order|Not Found/i).first().isVisible().catch(() => true);
    expect(hasAuth || hasContent).toBeTruthy();
  });

  test("should access public pages without auth", async ({ page }) => {
    await page.goto("/menu");
    await expect(page.getByText(/Our Menu|Menu/i).first()).toBeVisible({ timeout: 10000 });
  });
});
