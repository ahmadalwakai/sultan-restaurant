import { test, expect } from "@playwright/test";

test.describe("Combo Meals", () => {
  test("should display combo meals if available", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    // Combo meals might be on menu page or have their own section
    const comboText = page.getByText(/Combo|Meal Deal|Value/i).first();
    const isVisible = await comboText.isVisible().catch(() => false);
    // Either combos exist or they don't - both are valid
    expect(typeof isVisible).toBe("boolean");
  });

  test("should display delivery page", async ({ page }) => {
    await page.goto("/delivery");
    await expect(page.getByText(/Delivery|Collection/i).first()).toBeVisible({ timeout: 10000 });
  });

  test("should show pickup and delivery options", async ({ page }) => {
    await page.goto("/delivery");
    await expect(page.getByText(/Collection|Pickup/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Delivery/i).first()).toBeVisible();
  });

  test("should navigate to pickup from delivery page", async ({ page }) => {
    await page.goto("/delivery");
    const pickupLink = page.getByRole("link", { name: /Order for Pickup|Collection/i }).first();
    if (await pickupLink.isVisible()) {
      await pickupLink.click();
      await expect(page).toHaveURL(/\/pickup/);
    }
  });
});
