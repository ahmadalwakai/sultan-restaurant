export const AUTH_CONFIG = {
  sessionMaxAge: 7 * 24 * 60 * 60, // 7 days
  adminSessionMaxAge: 24 * 60 * 60, // 1 day
  googleScopes: ["openid", "email", "profile"],
} as const;
