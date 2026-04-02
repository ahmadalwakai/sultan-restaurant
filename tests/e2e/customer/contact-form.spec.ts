import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test("should display contact page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText(/Contact/i).first()).toBeVisible({ timeout: 10000 });
  });

  test("should show contact form fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel(/Name/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel(/Email/i).first()).toBeVisible();
    await expect(page.getByLabel(/Subject/i).first()).toBeVisible();
    await expect(page.getByLabel(/Message/i).first()).toBeVisible();
  });

  test("should fill and validate contact form", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/Name/i).first().fill("Test User");
    await page.getByLabel(/Email/i).first().fill("test@example.com");
    await page.getByLabel(/Subject/i).first().fill("Test Subject");
    await page.getByLabel(/Message/i).first().fill("This is a test message for the restaurant.");
    await expect(page.getByLabel(/Name/i).first()).toHaveValue("Test User");
    await expect(page.getByLabel(/Message/i).first()).toHaveValue("This is a test message for the restaurant.");
  });

  test("should show contact information", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText(/Address|Phone|Email|Opening Hours/i).first()).toBeVisible({ timeout: 10000 });
  });

  test("should have send button", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("button", { name: /Send Message|Submit/i }).first()
    ).toBeVisible({ timeout: 10000 });
  });
});
