import type { EmailPayload } from "../email-types";
import { captureEmailSnapshot } from "./email-snapshots";

const sentEmails: EmailPayload[] = [];

export async function mockSendEmail(payload: EmailPayload): Promise<{ id: string }> {
  sentEmails.push(payload);
  captureEmailSnapshot(payload);
  return { id: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
}

export function getSentEmails(): EmailPayload[] {
  return [...sentEmails];
}

export function getLastSentEmail(): EmailPayload | undefined {
  return sentEmails[sentEmails.length - 1];
}

export function clearSentEmails() {
  sentEmails.length = 0;
}
