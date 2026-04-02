import { EmailLayout } from "../shared/EmailLayout";
import type { BookingEmailData } from "@/lib/email/email-types";

export function bookingCancelledEmail(data: BookingEmailData) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Booking Cancelled</h2><p style="color:#666">Hi ${data.name}, your booking for ${data.date} at ${data.time} has been cancelled.</p><p style="color:#666">If you'd like to rebook, please visit our website or contact us.</p></td></tr>` });
}
