// ─── Log Constants ───────────────────────────────────────

export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

export const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export const SENSITIVE_FIELDS = [
  "password",
  "token",
  "secret",
  "authorization",
  "cookie",
  "credit_card",
  "cardNumber",
  "cvv",
  "ssn",
  "apiKey",
  "api_key",
] as const;

export const MAX_LOG_CONTEXT_DEPTH = 5;
export const MAX_LOG_MESSAGE_LENGTH = 2000;
export const MAX_STACK_LINES = 30;
