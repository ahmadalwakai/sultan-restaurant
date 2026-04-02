// ─── Log Levels ──────────────────────────────────────────

import type { LogLevel } from "./log-constants";
import { LOG_LEVEL_PRIORITY } from "./log-constants";

const DEFAULT_LEVEL: LogLevel = process.env.NODE_ENV === "production" ? "info" : "debug";

let currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) ?? DEFAULT_LEVEL;

export function getLogLevel(): LogLevel {
  return currentLevel;
}

export function setLogLevel(level: LogLevel): void {
  currentLevel = level;
}

export function shouldLog(level: LogLevel): boolean {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLevel];
}
