"use client";

import { useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

interface SocialLinks { facebook: string; instagram: string; twitter: string; tiktok: string; youtube: string }

export function SocialLinksForm({ initial, onSave }: { initial: SocialLinks; onSave: (data: SocialLinks) => Promise<void> }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const fields: Array<{ key: keyof SocialLinks; label: string; placeholder: string }> = [
    { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
    { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
    { key: "twitter", label: "Twitter / X", placeholder: "https://x.com/..." },
    { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@..." },
    { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/..." },
  ];

  return (
    <VStack as="form" onSubmit={handleSubmit} gap={4} maxW="xl" align="stretch">
      {fields.map((f) => (
        <Box key={f.key}>
          <Text mb={1} fontSize="sm" fontWeight="medium">{f.label}</Text>
          <Input value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} size="md" />
        </Box>
      ))}
      <Button type="submit" disabled={saving} borderRadius="lg" bg="amber.600" color="white" py={2} px={6} _hover={{ bg: "amber.700" }} _disabled={{ opacity: 0.5 }}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </VStack>
  );
}
