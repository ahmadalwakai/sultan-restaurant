// ─── Log Formatter ───────────────────────────────────────

import type { LogLevel } from "./log-constants";
import { MAX_LOG_MESSAGE_LENGTH } from "./log-constants";

export interface FormattedLog {
  level: LogLevel;
  msg: string;
  timestamp: string;
  requestId?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  durationMs?: number;
  context?: Record<string, unknown>;
  error?: { message: string; stack?: string };
}

export function formatLogEntry(
  level: LogLevel,
  message: string,
  meta?: Partial<Omit<FormattedLog, "level" | "msg" | "timestamp">>,
): FormattedLog {
  return {
    level,
    msg: message.length > MAX_LOG_MESSAGE_LENGTH
      ? message.slice(0, MAX_LOG_MESSAGE_LENGTH) + "…"
      : message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
}
