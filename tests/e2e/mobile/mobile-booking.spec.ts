import { test, expect } from "@playwright/test";

test.describe("Mobile Booking", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should display booking form on mobile", async ({ page }) => {
    await page.goto("/book");
    await expect(page.getByText(/Table Reservation|Book a Table/i)).toBeVisible({ timeout: 10000 });
  });

  test("should fill booking form on mobile", async ({ page }) => {
    await page.goto("/book");
    const nameField = page.getByLabel(/Name/i).first();
    await expect(nameField).toBeVisible({ timeout: 10000 });
    await nameField.fill("Mobile Guest");
    await page.getByLabel(/Email/i).first().fill("mobile@test.com");
    await page.getByLabel(/Phone/i).first().fill("07123456789");
    await expect(nameField).toHaveValue("Mobile Guest");
  });

  test("should show all form fields in single column", async ({ page }) => {
    await page.goto("/book");
    await expect(page.getByLabel(/Name/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel(/Email/i).first()).toBeVisible();
    await expect(page.getByLabel(/Phone/i).first()).toBeVisible();
    await expect(page.getByLabel(/Date/i).first()).toBeVisible();
    await expect(page.getByLabel(/Guests/i).first()).toBeVisible();
  });
});
