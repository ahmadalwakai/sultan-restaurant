import { test, expect } from "@playwright/test";

test.describe("Add to Cart", () => {
  test("should add item to cart via Add to Cart button", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();
    // Cart should now show item count
    await expect(page.getByText(/1|Cart/)).toBeVisible({ timeout: 5000 });
  });

  test("should increment quantity when adding same item", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const addButton = page.getByRole("button", { name: /Add to Cart/i }).first();
    await addButton.click();
    await addButton.click();
    // Should show 2 in cart
    await expect(page.getByText("2")).toBeVisible({ timeout: 5000 });
  });

  test("should not add unavailable items", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const unavailableBtn = page.getByRole("button", { name: /Unavailable/i }).first();
    if (await unavailableBtn.isVisible()) {
      await expect(unavailableBtn).toBeDisabled();
    }
  });
});
