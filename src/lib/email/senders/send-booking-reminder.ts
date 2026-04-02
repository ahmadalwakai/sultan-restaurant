import { sendEmail } from "../send-email";
import { buildBookingReminderEmail } from "../builders/booking-email";
import type { BookingEmailData } from "../email-types";

export async function sendBookingReminder(data: BookingEmailData) {
  return sendEmail(buildBookingReminderEmail(data));
}
