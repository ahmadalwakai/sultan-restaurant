"use client";

import { useState } from "react";
import { VStack, Input, Textarea, Button, Text, Box } from "@chakra-ui/react";

interface GlobalSeo { siteName: string; defaultTitle: string; titleTemplate: string; defaultDescription: string; defaultOgImage: string }

export function SeoGlobalSettings({ initial, onSave }: { initial: GlobalSeo; onSave: (data: GlobalSeo) => Promise<void> }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="xl">
      <VStack align="stretch" gap={4}>
        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Site Name
          </Text>
          <Input
            value={form.siteName}
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
            borderRadius="lg"
            px={3}
            py={2}
          />
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Default Title
          </Text>
          <Input
            value={form.defaultTitle}
            onChange={(e) => setForm({ ...form, defaultTitle: e.target.value })}
            borderRadius="lg"
            px={3}
            py={2}
          />
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Title Template
          </Text>
          <Input
            value={form.titleTemplate}
            onChange={(e) => setForm({ ...form, titleTemplate: e.target.value })}
            placeholder="%s | Sultan"
            borderRadius="lg"
            px={3}
            py={2}
          />
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Default Description
          </Text>
          <Textarea
            value={form.defaultDescription}
            onChange={(e) => setForm({ ...form, defaultDescription: e.target.value })}
            borderRadius="lg"
            px={3}
            py={2}
            rows={3}
          />
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Default OG Image
          </Text>
          <Input
            value={form.defaultOgImage}
            onChange={(e) => setForm({ ...form, defaultOgImage: e.target.value })}
            borderRadius="lg"
            px={3}
            py={2}
          />
        </Box>

        <Button
          type="submit"
          disabled={saving}
          bg="amber.600"
          color="white"
          borderRadius="lg"
          px={6}
          py={2}
          _hover={{ bg: "amber.700" }}
          _disabled={{ opacity: 0.5 }}
        >
          {saving ? "Saving..." : "Save Global SEO"}
        </Button>
      </VStack>
    </Box>
  );
}
