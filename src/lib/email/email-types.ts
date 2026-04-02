export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
  template: string;
  replyTo?: string;
}

export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  discount: number;
  total: number;
  orderType: string;
  pickupTime?: string;
}

export interface BookingEmailData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
