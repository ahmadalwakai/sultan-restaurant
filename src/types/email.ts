export type EmailTemplate =
  | "welcome"
  | "admin-login-alert"
  | "booking-confirmation"
  | "booking-cancelled"
  | "booking-reminder"
  | "booking-admin-alert"
  | "order-confirmation"
  | "order-preparing"
  | "order-ready"
  | "order-cancelled"
  | "order-refunded"
  | "order-payment-received"
  | "order-admin-alert"
  | "contact-acknowledgement"
  | "contact-admin-alert";

export type SendEmailInput = {
  to: string;
  subject: string;
  template: EmailTemplate;
  data: Record<string, unknown>;
};

export type EmailLogEntry = {
  id: string;
  to: string;
  subject: string;
  template: string;
  status: "SENT" | "FAILED" | "BOUNCED";
  resendId: string | null;
  error: string | null;
  sentAt: string;
};
