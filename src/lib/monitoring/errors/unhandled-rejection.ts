// ─── Unhandled Rejection Handler ─────────────────────────

import { reportError } from "./error-reporter";

let isRegistered = false;

export function registerUnhandledRejectionHandler(): void {
  if (isRegistered || typeof process === "undefined") return;
  isRegistered = true;

  process.on("unhandledRejection", (reason) => {
    reportError(reason, { path: "unhandledRejection" });
  });

  process.on("uncaughtException", (error) => {
    reportError(error, { path: "uncaughtException" });
  });
}
