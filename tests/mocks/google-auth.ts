import { vi } from "vitest";

export const googleAuthMock = {
  tokenResponse: {
    access_token: "ya29.test-access-token",
    refresh_token: "1//test-refresh-token",
    scope: "openid email profile",
    token_type: "Bearer",
    id_token: "eyJhbGciOiJSUzI1NiJ9.test-id-token",
    expiry_date: Date.now() + 3600000,
  },
  userProfile: {
    sub: "google-123456",
    name: "Test User",
    given_name: "Test",
    family_name: "User",
    email: "testuser@gmail.com",
    email_verified: true,
    picture: "https://lh3.googleusercontent.com/test-photo",
    locale: "en-GB",
  },
};

vi.mock("next-auth/providers/google", () => ({
  default: vi.fn(() => ({
    id: "google",
    name: "Google",
    type: "oauth",
  })),
}));
