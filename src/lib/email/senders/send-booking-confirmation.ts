import { sendEmail } from "../send-email";
import { buildBookingConfirmationEmail } from "../builders/booking-email";
import type { BookingEmailData } from "../email-types";

export async function sendBookingConfirmation(data: BookingEmailData) {
  return sendEmail(buildBookingConfirmationEmail(data));
}
