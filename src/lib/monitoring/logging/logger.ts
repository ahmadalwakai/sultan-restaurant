// ─── Core Logger (Pino-based) ────────────────────────────

import pino from "pino";
import type { LogLevel } from "./log-constants";
import { shouldLog } from "./log-levels";
import { sanitize } from "./log-sanitizer";
import { getRequestContext } from "./log-context";
import { formatLogEntry, type FormattedLog } from "./log-formatter";

const pinoLogger = pino({
  level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
  ...(process.env.NODE_ENV !== "production" && {
    transport: { target: "pino-pretty", options: { colorize: true } },
  }),
});

function buildMeta(
  extra?: Record<string, unknown>,
): Partial<Omit<FormattedLog, "level" | "msg" | "timestamp">> {
  const ctx = getRequestContext();
  return {
    ...(ctx?.requestId && { requestId: ctx.requestId }),
    ...(ctx?.path && { path: ctx.path }),
    ...(ctx?.method && { method: ctx.method }),
    ...(extra && { context: sanitize(extra) as Record<string, unknown> }),
  };
}

function log(level: LogLevel, message: string, extra?: Record<string, unknown>): void {
  if (!shouldLog(level)) return;
  const entry = formatLogEntry(level, message, buildMeta(extra));
  pinoLogger[level](entry, entry.msg);
}

export const logger = {
  debug: (message: string, extra?: Record<string, unknown>) => log("debug", message, extra),
  info: (message: string, extra?: Record<string, unknown>) => log("info", message, extra),
  warn: (message: string, extra?: Record<string, unknown>) => log("warn", message, extra),
  error: (message: string, extra?: Record<string, unknown> & { error?: Error }) => {
    const { error: err, ...rest } = extra ?? {};
    const meta = buildMeta(Object.keys(rest).length > 0 ? rest : undefined);
    if (err) {
      meta.error = { message: err.message, stack: err.stack };
    }
    const entry = formatLogEntry("error", message, meta);
    pinoLogger.error(entry, entry.msg);
  },
};
