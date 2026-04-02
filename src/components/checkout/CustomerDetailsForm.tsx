"use client";

import { VStack, Input, Field, Heading } from "@chakra-ui/react";

interface CustomerDetailsFormProps {
  name: string;
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
}

export default function CustomerDetailsForm({ name, email, phone, onChange }: CustomerDetailsFormProps) {
  return (
    <VStack gap={4} align="stretch">
      <Heading as="h3" fontSize="lg">Your Details</Heading>
      <Field.Root>
        <Field.Label>Full Name</Field.Label>
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
    </VStack>
  );
}
