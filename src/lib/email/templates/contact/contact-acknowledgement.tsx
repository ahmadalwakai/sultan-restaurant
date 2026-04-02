import { EmailLayout } from "../shared/EmailLayout";

export function contactAcknowledgementEmail(name: string) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Message Received</h2><p style="color:#666">Hi ${name}, thank you for contacting Sultan Restaurant. We've received your message and will get back to you as soon as possible.</p><p style="color:#666">Typical response time is within 24 hours.</p></td></tr>` });
}
