"use client";

import { Box, Button, Input, Text, Textarea, VStack } from "@chakra-ui/react";

interface CategoryFormProps {
  initialData?: { name?: string; description?: string; image?: string };
  onSubmit: (data: Record<string, unknown>) => void;
}

export function AdminCategoryForm({ initialData, onSubmit }: CategoryFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({ name: fd.get("name"), description: fd.get("description"), image: fd.get("image") || undefined });
  }

  return (
    <form onSubmit={handleSubmit}>
    <VStack gap={4} align="stretch">
      <Box><Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>Name</Text><Input name="name" defaultValue={initialData?.name ?? ""} required /></Box>
      <Box><Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>Description</Text><Textarea name="description" defaultValue={initialData?.description ?? ""} rows={3} /></Box>
      <Box><Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>Image URL (optional)</Text><Input name="image" defaultValue={initialData?.image ?? ""} /></Box>
      <Button type="submit" bg="amber.600" color="white" _hover={{ bg: "amber.700" }} px={6} py={2} borderRadius="lg" alignSelf="flex-start">Save</Button>
    </VStack>
    </form>
  );
}
