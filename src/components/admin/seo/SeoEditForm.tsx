"use client";

import { useState } from "react";
import { VStack, Input, Textarea, Button, Text, Box } from "@chakra-ui/react";

interface SeoData { pageSlug: string; title: string; description: string; keywords: string; ogImageUrl: string }

export function SeoEditForm({ initial, onSave }: { initial: SeoData; onSave: (data: SeoData) => Promise<void> }) {
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
            Page
          </Text>
          <Input
            value={form.pageSlug}
            disabled
            bg="gray.50"
            color="gray.500"
            borderRadius="lg"
            px={3}
            py={2}
          />
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Title
          </Text>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            borderRadius="lg"
            px={3}
            py={2}
            maxLength={60}
          />
          <Text fontSize="xs" color="gray.400" mt={1}>
            {form.title.length}/60 characters
          </Text>
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Description
          </Text>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            borderRadius="lg"
            px={3}
            py={2}
            rows={3}
            maxLength={160}
          />
          <Text fontSize="xs" color="gray.400" mt={1}>
            {form.description.length}/160 characters
          </Text>
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Keywords (comma-separated)
          </Text>
          <Input
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            borderRadius="lg"
            px={3}
            py={2}
          />
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            OG Image URL
          </Text>
          <Input
            value={form.ogImageUrl}
            onChange={(e) => setForm({ ...form, ogImageUrl: e.target.value })}
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
          {saving ? "Saving..." : "Save SEO"}
        </Button>
      </VStack>
    </Box>
  );
}
