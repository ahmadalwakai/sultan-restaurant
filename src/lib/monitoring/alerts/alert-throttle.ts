// ─── Alert Throttle ──────────────────────────────────────

const lastSent = new Map<string, number>();

export function shouldThrottle(ruleId: string, cooldownMinutes: number): boolean {
  const now = Date.now();
  const last = lastSent.get(ruleId);
  if (last && now - last < cooldownMinutes * 60 * 1000) {
    return true;
  }
  return false;
}

export function markSent(ruleId: string): void {
  lastSent.set(ruleId, Date.now());
}

export function resetThrottle(ruleId: string): void {
  lastSent.delete(ruleId);
}
