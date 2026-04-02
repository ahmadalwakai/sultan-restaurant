import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Clean up DOM after each component test
afterEach(() => {
  cleanup();
});

// Reset all mocks after each test
afterEach(() => {
  vi.restoreAllMocks();
});

// Set test environment variables
// NODE_ENV is set by vitest automatically
process.env.NEXTAUTH_SECRET = "test-secret-key-for-testing-only";
process.env.ADMIN_JWT_SECRET = "test-admin-jwt-secret";
process.env.STRIPE_SECRET_KEY = "sk_test_fake_key_for_testing";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_fake_webhook_secret";
process.env.RESEND_API_KEY = "re_test_fake_key";
