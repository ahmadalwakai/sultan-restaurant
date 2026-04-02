// ─── Trigger: DB Connection Lost ─────────────────────────

import { triggerAlert } from "../alert-manager";

export async function alertDbConnectionLost(params: {
  error: string;
  latencyMs?: number;
}) {
  return triggerAlert({
    rule: "db-connection-lost",
    level: "critical",
    title: "Database Connection Lost",
    message: `Database connection failed: ${params.error}`,
    metadata: { latencyMs: params.latencyMs },
  });
}
