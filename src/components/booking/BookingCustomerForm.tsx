"use client";

import { VStack, Input, Textarea, Field } from "@chakra-ui/react";

interface BookingCustomerFormProps {
  name: string;
  email: string;
  phone: string;
  notes: string;
  onChange: (field: string, value: string) => void;
}

export default function BookingCustomerForm({ name, email, phone, notes, onChange }: BookingCustomerFormProps) {
  return (
    <VStack gap={4}>
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Input value={name} onChange={(e) => onChange("name", e.target.value)} required />
      </Field.Root>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input value={email} onChange={(e) => onChange("email", e.target.value)} type="email" required />
      </Field.Root>
      <Field.Root>
        <Field.Label>Phone</Field.Label>
        <Input value={phone} onChange={(e) => onChange("phone", e.target.value)} type="tel" required />
      </Field.Root>
      <Field.Root>
        <Field.Label>Special Requests</Field.Label>
        <Textarea value={notes} onChange={(e) => onChange("notes", e.target.value)} rows={3} />
      </Field.Root>
    </VStack>
  );
}
