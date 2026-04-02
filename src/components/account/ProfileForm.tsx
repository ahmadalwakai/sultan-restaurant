"use client";

import { Box, Button, VStack, Input, Field } from "@chakra-ui/react";
import { useState } from "react";

interface ProfileFormProps {
  initialData: { name: string; email: string; phone?: string };
  onSave: (data: { name: string; phone: string }) => Promise<void>;
}

export default function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [name, setName] = useState(initialData.name);
  const [phone, setPhone] = useState(initialData.phone || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({ name, phone });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} bg="white" p={6} borderRadius="xl" shadow="sm">
      <VStack gap={4} align="stretch">
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input value={initialData.email} disabled />
        </Field.Root>
        <Field.Root>
          <Field.Label>Phone</Field.Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
        </Field.Root>
        <Button type="submit" colorPalette="brand" loading={loading} alignSelf="end">
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
}
