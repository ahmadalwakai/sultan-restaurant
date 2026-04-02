import { EMAIL_CONFIG } from "../email-config";
import { EMAIL_TEMPLATES } from "../email-constants";
import { orderConfirmationEmail } from "../templates/order/order-confirmation";
import { orderPreparingEmail } from "../templates/order/order-preparing";
import { orderReadyEmail } from "../templates/order/order-ready";
import { orderCancelledEmail } from "../templates/order/order-cancelled";
import { orderRefundedEmail } from "../templates/order/order-refunded";
import { orderPaymentReceivedEmail } from "../templates/order/order-payment-received";
import { orderAdminAlertEmail } from "../templates/order/order-admin-alert";
import type { EmailPayload, OrderEmailData } from "../email-types";

export function buildOrderConfirmationEmail(data: OrderEmailData): EmailPayload {
  return { to: data.customerEmail, subject: `Order #${data.orderNumber} Confirmed`, html: orderConfirmationEmail(data), template: EMAIL_TEMPLATES.ORDER_CONFIRMATION };
}

export function buildOrderPreparingEmail(data: Pick<OrderEmailData, "customerName" | "customerEmail" | "orderNumber">): EmailPayload {
  return { to: data.customerEmail, subject: `Order #${data.orderNumber} is Being Prepared`, html: orderPreparingEmail(data), template: EMAIL_TEMPLATES.ORDER_PREPARING };
}

export function buildOrderReadyEmail(data: Pick<OrderEmailData, "customerName" | "customerEmail" | "orderNumber">): EmailPayload {
  return { to: data.customerEmail, subject: `Order #${data.orderNumber} is Ready!`, html: orderReadyEmail(data), template: EMAIL_TEMPLATES.ORDER_READY };
}

export function buildOrderCancelledEmail(data: Pick<OrderEmailData, "customerName" | "customerEmail" | "orderNumber">): EmailPayload {
  return { to: data.customerEmail, subject: `Order #${data.orderNumber} Cancelled`, html: orderCancelledEmail(data), template: EMAIL_TEMPLATES.ORDER_CANCELLED };
}

export function buildOrderRefundedEmail(data: Pick<OrderEmailData, "customerName" | "customerEmail" | "orderNumber" | "total">): EmailPayload {
  return { to: data.customerEmail, subject: `Refund for Order #${data.orderNumber}`, html: orderRefundedEmail(data), template: EMAIL_TEMPLATES.ORDER_REFUNDED };
}

export function buildOrderPaymentReceivedEmail(data: Pick<OrderEmailData, "customerName" | "customerEmail" | "orderNumber" | "total">): EmailPayload {
  return { to: data.customerEmail, subject: `Payment Received for Order #${data.orderNumber}`, html: orderPaymentReceivedEmail(data), template: EMAIL_TEMPLATES.ORDER_PAYMENT_RECEIVED };
}

export function buildOrderAdminAlertEmail(data: OrderEmailData): EmailPayload {
  return { to: EMAIL_CONFIG.adminEmail, subject: `New Order #${data.orderNumber}`, html: orderAdminAlertEmail(data), template: EMAIL_TEMPLATES.ORDER_ADMIN_ALERT };
}
