import type { EmailPayload } from "../email-types";

const snapshots: Map<string, EmailPayload> = new Map();

export function captureEmailSnapshot(payload: EmailPayload) {
  const key = `${payload.template}-${Date.now()}`;
  snapshots.set(key, payload);
  return key;
}

export function getEmailSnapshot(key: string): EmailPayload | undefined {
  return snapshots.get(key);
}

export function getAllEmailSnapshots(): EmailPayload[] {
  return Array.from(snapshots.values());
}

export function clearEmailSnapshots() {
  snapshots.clear();
}
