import { EmailLayout } from "../shared/EmailLayout";
import { emailBookingDetails } from "../shared/EmailBookingDetails";
import type { BookingEmailData } from "@/lib/email/email-types";

export function bookingAdminAlertEmail(data: BookingEmailData) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">New Booking Received</h2><p style="color:#666">A new booking has been made:</p>${emailBookingDetails(data)}<p style="color:#666;font-size:14px">Contact: ${data.email}</p></td></tr>` });
}
