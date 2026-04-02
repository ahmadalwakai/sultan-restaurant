// ─── Error Reporter ──────────────────────────────────────

import { logError } from "../logging";
import { generateErrorFingerprint } from "./error-fingerprint";
import { classifyErrorSeverity, type ErrorSeverity } from "./error-severity";
import type { ErrorContext } from "./error-context";

export interface ErrorReport {
  message: string;
  stack?: string;
  fingerprint: string;
  severity: ErrorSeverity;
  context?: ErrorContext;
  timestamp: string;
}

export function reportError(
  error: unknown,
  context?: ErrorContext,
): ErrorReport {
  const err = error instanceof Error ? error : new Error(String(error));
  const fingerprint = generateErrorFingerprint(err.message, err.stack, context?.path);
  const severity = classifyErrorSeverity(context?.statusCode, err);

  const report: ErrorReport = {
    message: err.message,
    stack: err.stack,
    fingerprint,
    severity,
    context,
    timestamp: new Date().toISOString(),
  };

  logError(`[${severity.toUpperCase()}] ${err.message}`, err, {
    fingerprint,
    severity,
    ...context,
  });

  return report;
}
