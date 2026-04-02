import { test, expect } from "@playwright/test";

test.describe("Google Sign In", () => {
  test("should display sign in page", async ({ page }) => {
    await page.goto("/signin");
    await expect(page.getByText(/Sign In/i).first()).toBeVisible({ timeout: 10000 });
  });

  test("should show Google OAuth button", async ({ page }) => {
    await page.goto("/signin");
    await expect(
      page.getByRole("button", { name: /Continue with Google|Sign in with Google|Google/i }).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test("should have back to home link", async ({ page }) => {
    await page.goto("/signin");
    const homeLink = page.getByRole("link", { name: /Back to Home|Home/i }).first();
    await expect(homeLink).toBeVisible({ timeout: 10000 });
    await homeLink.click();
    await expect(page).toHaveURL("/");
  });

  test("should show sign in description", async ({ page }) => {
    await page.goto("/signin");
    await expect(page.getByText(/manage your orders|bookings/i)).toBeVisible({ timeout: 10000 });
  });
});
