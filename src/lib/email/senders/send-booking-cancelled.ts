import { sendEmail } from "../send-email";
import { buildBookingCancelledEmail } from "../builders/booking-email";
import type { BookingEmailData } from "../email-types";

export async function sendBookingCancelled(data: BookingEmailData) {
  return sendEmail(buildBookingCancelledEmail(data));
}
