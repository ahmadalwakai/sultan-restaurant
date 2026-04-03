"use client";

import { useState } from "react";
import { Box, Button, Input, Text, Textarea, VStack } from "@chakra-ui/react";

interface ContactSettings { phone: string; email: string; address: string; mapUrl: string }

export function ContactSettingsForm({ initial, onSave }: { initial: ContactSettings; onSave: (data: ContactSettings) => Promise<void> }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} gap={4} maxW="xl" align="stretch">
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">Phone</Text>
        <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} size="md" required />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">Email</Text>
        <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} size="md" required />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">Address</Text>
        <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} size="md" />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">Google Maps URL</Text>
        <Input type="url" value={form.mapUrl} onChange={(e) => setForm({ ...form, mapUrl: e.target.value })} size="md" />
      </Box>
      <Button type="submit" disabled={saving} borderRadius="lg" bg="amber.600" color="white" py={2} px={6} _hover={{ bg: "amber.700" }} _disabled={{ opacity: 0.5 }}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </VStack>
  );
}
