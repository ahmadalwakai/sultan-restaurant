import { test, expect } from "@playwright/test";

test.describe("Booking Flow", () => {
  test("should display booking page", async ({ page }) => {
    await page.goto("/book");
    await expect(page.getByText(/Table Reservation|Book a Table/i)).toBeVisible({ timeout: 10000 });
  });

  test("should show booking form fields", async ({ page }) => {
    await page.goto("/book");
    await expect(page.getByLabel(/Name/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel(/Email/i).first()).toBeVisible();
    await expect(page.getByLabel(/Phone/i).first()).toBeVisible();
    await expect(page.getByLabel(/Date/i).first()).toBeVisible();
    await expect(page.getByLabel(/Guests/i).first()).toBeVisible();
  });

  test("should fill booking form", async ({ page }) => {
    await page.goto("/book");
    await page.getByLabel(/Name/i).first().fill("Jane Doe");
    await page.getByLabel(/Email/i).first().fill("jane@test.com");
    await page.getByLabel(/Phone/i).first().fill("07123456789");
    // Set date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];
    await page.getByLabel(/Date/i).first().fill(dateStr);
    await page.getByLabel(/Guests/i).first().fill("4");
    await expect(page.getByLabel(/Name/i).first()).toHaveValue("Jane Doe");
  });

  test("should have submit button", async ({ page }) => {
    await page.goto("/book");
    await expect(
      page.getByRole("button", { name: /Book Table|Reserve|Submit/i }).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test("should navigate to booking from home page", async ({ page }) => {
    await page.goto("/");
    const bookLink = page.getByRole("link", { name: /Book a Table/i }).first();
    await expect(bookLink).toBeVisible({ timeout: 10000 });
    await bookLink.click();
    await expect(page).toHaveURL(/\/book/);
  });
});
