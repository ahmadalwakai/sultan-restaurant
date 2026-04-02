import { EMAIL_CONFIG } from "../email-config";
import { EMAIL_TEMPLATES } from "../email-constants";
import { contactAcknowledgementEmail } from "../templates/contact/contact-acknowledgement";
import { contactAdminAlertEmail } from "../templates/contact/contact-admin-alert";
import type { EmailPayload, ContactEmailData } from "../email-types";

export function buildContactAcknowledgementEmail(data: ContactEmailData): EmailPayload {
  return { to: data.email, subject: "We received your message", html: contactAcknowledgementEmail(data.name), template: EMAIL_TEMPLATES.CONTACT_ACKNOWLEDGEMENT };
}

export function buildContactAdminAlertEmail(data: ContactEmailData): EmailPayload {
  return { to: EMAIL_CONFIG.adminEmail, subject: `New Contact: ${data.subject}`, html: contactAdminAlertEmail(data), template: EMAIL_TEMPLATES.CONTACT_ADMIN_ALERT, replyTo: data.email };
}
