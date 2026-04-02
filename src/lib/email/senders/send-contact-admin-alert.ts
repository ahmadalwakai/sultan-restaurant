import { sendEmail } from "../send-email";
import { buildContactAdminAlertEmail } from "../builders/contact-email";
import type { ContactEmailData } from "../email-types";

export async function sendContactAdminAlert(data: ContactEmailData) {
  return sendEmail(buildContactAdminAlertEmail(data));
}
