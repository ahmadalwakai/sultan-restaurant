import { EMAIL_CONFIG } from "../email-config";
import { EMAIL_TEMPLATES } from "../email-constants";
import { bookingConfirmationEmail } from "../templates/booking/booking-confirmation";
import { bookingCancelledEmail } from "../templates/booking/booking-cancelled";
import { bookingReminderEmail } from "../templates/booking/booking-reminder";
import { bookingAdminAlertEmail } from "../templates/booking/booking-admin-alert";
import type { EmailPayload, BookingEmailData } from "../email-types";

export function buildBookingConfirmationEmail(data: BookingEmailData): EmailPayload {
  return { to: data.email, subject: "Booking Confirmed!", html: bookingConfirmationEmail(data), template: EMAIL_TEMPLATES.BOOKING_CONFIRMATION };
}

export function buildBookingCancelledEmail(data: BookingEmailData): EmailPayload {
  return { to: data.email, subject: "Booking Cancelled", html: bookingCancelledEmail(data), template: EMAIL_TEMPLATES.BOOKING_CANCELLED };
}

export function buildBookingReminderEmail(data: BookingEmailData): EmailPayload {
  return { to: data.email, subject: "Booking Reminder", html: bookingReminderEmail(data), template: EMAIL_TEMPLATES.BOOKING_REMINDER };
}

export function buildBookingAdminAlertEmail(data: BookingEmailData): EmailPayload {
  return { to: EMAIL_CONFIG.adminEmail, subject: "New Booking Received", html: bookingAdminAlertEmail(data), template: EMAIL_TEMPLATES.BOOKING_ADMIN_ALERT };
}
