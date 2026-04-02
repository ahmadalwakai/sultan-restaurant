import { EmailLayout } from "../shared/EmailLayout";
import { emailBookingDetails } from "../shared/EmailBookingDetails";
import type { BookingEmailData } from "@/lib/email/email-types";

export function bookingReminderEmail(data: BookingEmailData) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Booking Reminder</h2><p style="color:#666">Hi ${data.name}, this is a reminder of your upcoming booking:</p>${emailBookingDetails(data)}<p style="color:#666;font-size:14px">We look forward to seeing you!</p></td></tr>` });
}
