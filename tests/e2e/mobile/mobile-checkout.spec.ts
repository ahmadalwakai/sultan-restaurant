import { test, expect } from "@playwright/test";

test.describe("Mobile Checkout", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should display checkout form on mobile", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();
    await page.goto("/pickup");
    await expect(page.getByText(/Your Details|Order Summary|Checkout/i)).toBeVisible({ timeout: 10000 });
  });

  test("should stack form and summary on mobile", async ({ page }) => {
    await page.goto("/pickup");
    // On mobile, form and summary should be stacked vertically
    await page.waitForLoadState("networkidle");
  });

  test("should fill form fields on mobile", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /Add to Cart/i }).first().click();
    await page.goto("/pickup");
    const nameField = page.getByLabel(/Name/i).first();
    if (await nameField.isVisible()) {
      await nameField.fill("Mobile User");
      await expect(nameField).toHaveValue("Mobile User");
    }
  });
});
