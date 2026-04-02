import { describe, it, expect } from "vitest";

type OrderItem = { name: string; quantity: number; price: number };

type OrderEmailData = {
  customerName: string;
  email: string;
  orderId: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  orderType: "DELIVERY" | "PICKUP";
  paymentMethod: "CARD" | "CASH";
};

const buildOrderConfirmation = (data: OrderEmailData) => ({
  to: data.email,
  subject: `Order Confirmed - #${data.orderNumber}`,
  html: `<h1>Order Confirmed</h1><p>Order #${data.orderNumber}</p><p>Total: £${data.total.toFixed(2)}</p>`,
});

const buildOrderCancelled = (data: OrderEmailData) => ({
  to: data.email,
  subject: `Order Cancelled - #${data.orderNumber}`,
  html: `<p>Your order #${data.orderNumber} has been cancelled.</p>`,
});

const buildOrderPreparing = (data: OrderEmailData) => ({
  to: data.email,
  subject: `Order Being Prepared - #${data.orderNumber}`,
  html: `<p>Your order #${data.orderNumber} is now being prepared!</p>`,
});

const buildOrderReady = (data: OrderEmailData) => ({
  to: data.email,
  subject: `Order Ready - #${data.orderNumber}`,
  html: `<p>Your order #${data.orderNumber} is ready for ${data.orderType === "PICKUP" ? "pickup" : "delivery"}!</p>`,
});

const buildOrderAdminAlert = (data: OrderEmailData) => ({
  to: "admin@sultanrestaurant.co.uk",
  subject: `New Order #${data.orderNumber} - £${data.total.toFixed(2)}`,
  html: `<p>New ${data.orderType} order from ${data.customerName}</p>`,
});

describe("Order Email Builder", () => {
  const orderData: OrderEmailData = {
    customerName: "Jane Doe",
    email: "jane@example.com",
    orderId: "order-1",
    orderNumber: "SLT-001",
    items: [
      { name: "Chicken Tikka", quantity: 2, price: 12.95 },
      { name: "Naan", quantity: 1, price: 2.95 },
    ],
    total: 28.85,
    orderType: "DELIVERY",
    paymentMethod: "CARD",
  };

  describe("Confirmation", () => {
    it("should send to customer email", () => {
      const email = buildOrderConfirmation(orderData);
      expect(email.to).toBe("jane@example.com");
    });

    it("should include order number in subject", () => {
      const email = buildOrderConfirmation(orderData);
      expect(email.subject).toContain("SLT-001");
    });

    it("should include total", () => {
      const email = buildOrderConfirmation(orderData);
      expect(email.html).toContain("28.85");
    });
  });

  describe("Cancelled", () => {
    it("should include order number", () => {
      const email = buildOrderCancelled(orderData);
      expect(email.html).toContain("SLT-001");
    });
  });

  describe("Preparing", () => {
    it("should notify being prepared", () => {
      const email = buildOrderPreparing(orderData);
      expect(email.subject).toContain("Being Prepared");
    });
  });

  describe("Ready", () => {
    it("should mention delivery for delivery orders", () => {
      const email = buildOrderReady(orderData);
      expect(email.html).toContain("delivery");
    });

    it("should mention pickup for pickup orders", () => {
      const email = buildOrderReady({ ...orderData, orderType: "PICKUP" });
      expect(email.html).toContain("pickup");
    });
  });

  describe("Admin Alert", () => {
    it("should send to admin", () => {
      const email = buildOrderAdminAlert(orderData);
      expect(email.to).toBe("admin@sultanrestaurant.co.uk");
    });

    it("should include total in subject", () => {
      const email = buildOrderAdminAlert(orderData);
      expect(email.subject).toContain("28.85");
    });
  });
});
