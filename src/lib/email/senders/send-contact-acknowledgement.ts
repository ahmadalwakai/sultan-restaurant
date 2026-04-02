import { sendEmail } from "../send-email";
import { buildContactAcknowledgementEmail } from "../builders/contact-email";
import type { ContactEmailData } from "../email-types";

export async function sendContactAcknowledgement(data: ContactEmailData) {
  return sendEmail(buildContactAcknowledgementEmail(data));
}
