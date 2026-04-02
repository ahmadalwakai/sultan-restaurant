import { renderBookingConfirmationEmail } from "../templates/booking";
import { renderOrderConfirmationEmail } from "../templates/order";
import { renderWelcomeEmail } from "../templates/auth";
import { renderContactAcknowledgementEmail } from "../templates/contact";

const previewData = {
  booking: {
    name: "John Doe",
    email: "john@example.com",
    date: "2025-03-15",
    time: "19:00",
    guests: 4,
    phone: "+44 7700 900000",
    notes: "Window seat preferred",
  },
  order: {
    orderNumber: "ORD-2025-001",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [
      { name: "Sultan Kebab", quantity: 2, price: 1495 },
      { name: "Hummus", quantity: 1, price: 595 },
    ],
    subtotal: 3585,
    total: 3585,
    discount: 0,
    orderType: "PICKUP" as const,
    pickupTime: "18:30",
  },
};

export function getPreviewTemplates(): string[] {
  return ["welcome", "booking-confirmation", "order-confirmation", "contact-acknowledgement"];
}

export function renderPreview(template: string): string {
  switch (template) {
    case "welcome":
      return renderWelcomeEmail("John Doe");
    case "booking-confirmation":
      return renderBookingConfirmationEmail(previewData.booking);
    case "order-confirmation":
      return renderOrderConfirmationEmail(previewData.order);
    case "contact-acknowledgement":
      return renderContactAcknowledgementEmail("John Doe");
    default:
      return `<html><body><p>Unknown template: ${template}</p></body></html>`;
  }
}
