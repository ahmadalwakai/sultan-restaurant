"use client";

import { useState } from "react";
import { Box, Button, Input, NativeSelect, SimpleGrid, Text, Textarea, VStack } from "@chakra-ui/react";

interface GeneralSettings { restaurantName: string; tagline: string; description: string; currency: string; timezone: string }

export function GeneralSettingsForm({ initial, onSave }: { initial: GeneralSettings; onSave: (data: GeneralSettings) => Promise<void> }) {
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
        <Text mb={1} fontSize="sm" fontWeight="medium">Restaurant Name</Text>
        <Input value={form.restaurantName} onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} size="md" required />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">Tagline</Text>
        <Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} size="md" />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">Description</Text>
        <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} size="md" />
      </Box>
      <SimpleGrid gap={4} columns={2}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">Currency</Text>
          <NativeSelect.Root size="md">
            <NativeSelect.Field value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
              <option value="GBP">GBP (£)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">Timezone</Text>
          <Input value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} size="md" />
        </Box>
      </SimpleGrid>
      <Button type="submit" disabled={saving} borderRadius="lg" bg="amber.600" color="white" py={2} px={6} _hover={{ bg: "amber.700" }} _disabled={{ opacity: 0.5 }}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </VStack>
  );
}
