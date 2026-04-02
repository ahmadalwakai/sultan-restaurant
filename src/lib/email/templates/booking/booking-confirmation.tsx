import { EmailLayout } from "../shared/EmailLayout";
import { emailBookingDetails } from "../shared/EmailBookingDetails";
import { emailButton } from "../shared/EmailButton";
import type { BookingEmailData } from "@/lib/email/email-types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export function bookingConfirmationEmail(data: BookingEmailData) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Booking Confirmed!</h2><p style="color:#666">Hi ${data.name}, your table has been booked:</p>${emailBookingDetails(data)}${data.specialRequests ? `<p style="color:#666;font-size:14px"><strong>Special Requests:</strong> ${data.specialRequests}</p>` : ""}${emailButton("View Booking", `${baseUrl}/book`)}<p style="color:#999;font-size:12px">Please arrive on time. Tables are held for 15 minutes.</p></td></tr>` });
}
