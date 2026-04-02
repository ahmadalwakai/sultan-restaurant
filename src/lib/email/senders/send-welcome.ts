import { sendEmail } from "../send-email";
import { buildWelcomeEmail } from "../builders/auth-email";

export async function sendWelcomeEmail(name: string, email: string) {
  return sendEmail(buildWelcomeEmail(name, email));
}
