import type { EmailPayload } from "./email-types";
import { sendEmail } from "./send-email";

// Simple in-process email queue
// In production, use a proper queue (Bull, SQS, etc.)
const queue: EmailPayload[] = [];
let processing = false;

export function enqueueEmail(payload: EmailPayload) {
  queue.push(payload);
  if (!processing) processQueue();
}

async function processQueue() {
  processing = true;
  while (queue.length > 0) {
    const payload = queue.shift()!;
    try {
      await sendEmail(payload);
    } catch (err) {
      console.error(`[email-queue] Failed to send email to ${payload.to}:`, err);
    }
  }
  processing = false;
}
