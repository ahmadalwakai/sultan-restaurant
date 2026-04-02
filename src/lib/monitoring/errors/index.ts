// ─── Error Tracking Module Index ─────────────────────────

export { reportError, type ErrorReport } from "./error-reporter";
export { handleBoundaryError } from "./error-boundary-handler";
export { handleApiError } from "./api-error-handler";
export { registerUnhandledRejectionHandler } from "./unhandled-rejection";
export { generateErrorFingerprint } from "./error-fingerprint";
export { classifyErrorSeverity, type ErrorSeverity } from "./error-severity";
export { buildErrorContext, type ErrorContext } from "./error-context";
