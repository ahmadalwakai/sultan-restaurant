// ─── Error Boundary Handler (Server-side) ────────────────

import { reportError } from "./error-reporter";
import type { ErrorContext } from "./error-context";

export function handleBoundaryError(
  error: Error,
  errorInfo?: { componentStack?: string },
): void {
  const context: ErrorContext = {
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
  };

  reportError(error, context);

  if (errorInfo?.componentStack) {
    // Component stack is logged separately for boundary errors
    reportError(
      new Error(`Component Stack: ${errorInfo.componentStack}`),
      context,
    );
  }
}
