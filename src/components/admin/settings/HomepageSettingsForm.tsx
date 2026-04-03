"use client";

import { useState } from "react";
import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";

interface HomepageSettings { heroTitle: string; heroSubtitle: string; heroImageUrl: string; showOffers: boolean; showReviews: boolean; showMenu: boolean; showBooking: boolean }

export function HomepageSettingsForm({ initial, onSave }: { initial: HomepageSettings; onSave: (data: HomepageSettings) => Promise<void> }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const toggles: Array<{ key: keyof HomepageSettings; label: string }> = [
    { key: "showOffers", label: "Show Offers Section" },
    { key: "showReviews", label: "Show Reviews Section" },
    { key: "showMenu", label: "Show Menu Preview" },
    { key: "showBooking", label: "Show Booking Section" },
  ];

  return (
    <VStack as="form" onSubmit={handleSubmit} gap={4} maxW="xl" align="stretch">
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">Hero Title</Text>
        <Input value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} size="md" />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">Hero Subtitle</Text>
        <Input value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} size="md" />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">Hero Image URL</Text>
        <Input value={form.heroImageUrl} onChange={(e) => setForm({ ...form, heroImageUrl: e.target.value })} size="md" />
      </Box>
      <Box pt={2}>
        <Text mb={2} fontSize="sm" fontWeight="medium">Sections</Text>
        <VStack gap={2} align="start">
          {toggles.map((t) => (
            <HStack as="label" gap={2} fontSize="sm" key={t.key}>
              <input type="checkbox" checked={form[t.key] as boolean} onChange={(e) => setForm({ ...form, [t.key]: e.target.checked })} />
              <Text>{t.label}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
      <Button type="submit" disabled={saving} borderRadius="lg" bg="amber.600" color="white" py={2} px={6} _hover={{ bg: "amber.700" }} _disabled={{ opacity: 0.5 }}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </VStack>
  );
}
