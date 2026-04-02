import { sendEmail } from "../send-email";
import { buildAdminLoginAlertEmail } from "../builders/auth-email";

export async function sendAdminLoginAlert(email: string, ip?: string) {
  return sendEmail(buildAdminLoginAlertEmail(email, ip));
}
