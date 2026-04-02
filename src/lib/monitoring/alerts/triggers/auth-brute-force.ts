// ─── Trigger: Auth Brute Force ───────────────────────────

import { triggerAlert } from "../alert-manager";

export async function alertAuthBruteForce(params: {
  ip: string;
  attempts: number;
  windowMinutes: number;
}) {
  return triggerAlert({
    rule: "auth-brute-force",
    level: "critical",
    title: "Brute Force Login Attempt",
    message: `${params.attempts} failed login attempts from ${params.ip} in ${params.windowMinutes} minutes`,
    metadata: {
      ip: params.ip,
      attempts: params.attempts,
      windowMinutes: params.windowMinutes,
    },
  });
}
