import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/validations";

describe("contactSchema", () => {
  const validContact = {
    name: "Tom Hardy",
    email: "tom@example.com",
    phone: "07700900010",
    subject: "Catering enquiry",
    message: "I would like to enquire about catering for 50 people.",
  };

  it("should pass with valid data", () => {
    const result = contactSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  it("should reject missing email", () => {
    const { email, ...without } = validContact;
    const result = contactSchema.safeParse(without);
    expect(result.success).toBe(false);
  });

  it("should reject empty message", () => {
    const result = contactSchema.safeParse({ ...validContact, message: "" });
    expect(result.success).toBe(false);
  });

  it("should allow optional phone", () => {
    const { phone, ...without } = validContact;
    const result = contactSchema.safeParse(without);
    expect(result.success).toBe(true);
  });
});
