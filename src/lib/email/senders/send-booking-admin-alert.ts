import { sendEmail } from "../send-email";
import { buildBookingAdminAlertEmail } from "../builders/booking-email";
import type { BookingEmailData } from "../email-types";

export async function sendBookingAdminAlert(data: BookingEmailData) {
  return sendEmail(buildBookingAdminAlertEmail(data));
}
