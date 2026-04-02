import { describe, it, expect } from "vitest";

type ContactEmailData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
};

const buildContactAcknowledgement = (data: ContactEmailData) => ({
  to: data.email,
  subject: "Thank you for contacting Sultan Restaurant",
  html: `<h1>Thank You</h1><p>Dear ${data.name}, we received your message and will respond shortly.</p>`,
});

const buildContactAdminAlert = (data: ContactEmailData) => ({
  to: "admin@sultanrestaurant.co.uk",
  subject: `New Contact: ${data.subject}`,
  html: `<h1>New Contact Message</h1><p>From: ${data.name} (${data.email})</p><p>${data.message}</p>`,
});

describe("Contact Email Builder", () => {
  const contactData: ContactEmailData = {
    name: "Alice Brown",
    email: "alice@example.com",
    subject: "Catering enquiry",
    message: "Can you cater for 50 people?",
    phone: "+44 7700 900000",
  };

  describe("Acknowledgement", () => {
    it("should send to customer email", () => {
      const email = buildContactAcknowledgement(contactData);
      expect(email.to).toBe("alice@example.com");
    });

    it("should include customer name in body", () => {
      const email = buildContactAcknowledgement(contactData);
      expect(email.html).toContain("Alice Brown");
    });

    it("should have thank you subject", () => {
      const email = buildContactAcknowledgement(contactData);
      expect(email.subject).toContain("Thank you");
    });
  });

  describe("Admin Alert", () => {
    it("should send to admin", () => {
      const email = buildContactAdminAlert(contactData);
      expect(email.to).toBe("admin@sultanrestaurant.co.uk");
    });

    it("should include subject in email subject", () => {
      const email = buildContactAdminAlert(contactData);
      expect(email.subject).toContain("Catering enquiry");
    });

    it("should include customer details", () => {
      const email = buildContactAdminAlert(contactData);
      expect(email.html).toContain("Alice Brown");
      expect(email.html).toContain("alice@example.com");
    });

    it("should include message body", () => {
      const email = buildContactAdminAlert(contactData);
      expect(email.html).toContain("Can you cater for 50 people?");
    });
  });
});
