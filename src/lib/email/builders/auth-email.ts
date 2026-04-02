import { EMAIL_CONFIG } from "../email-config";
import { EMAIL_TEMPLATES } from "../email-constants";
import { welcomeEmail } from "../templates/auth/welcome";
import { adminLoginAlertEmail } from "../templates/auth/admin-login-alert";
import type { EmailPayload } from "../email-types";

export function buildWelcomeEmail(name: string, email: string): EmailPayload {
  return { to: email, subject: `Welcome to ${EMAIL_CONFIG.restaurantName}!`, html: welcomeEmail(name), template: EMAIL_TEMPLATES.WELCOME };
}

export function buildAdminLoginAlertEmail(email: string, ip?: string): EmailPayload {
  return { to: EMAIL_CONFIG.adminEmail, subject: "Admin Login Alert", html: adminLoginAlertEmail(email, ip), template: EMAIL_TEMPLATES.ADMIN_LOGIN_ALERT };
}
