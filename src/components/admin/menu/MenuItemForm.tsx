"use client";

import { useState, useEffect } from "react";
import { Box, Button, Flex, Input, NativeSelect, Text, Textarea, VStack } from "@chakra-ui/react";

interface MenuItemFormProps {
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
}

export function AdminMenuItemForm({ initialData, onSubmit }: MenuItemFormProps) {
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    fetch("/api/admin/categories").then((r) => r.json()).then((d) => setCategories(d.data ?? []));
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      name: fd.get("name"),
      description: fd.get("description"),
      price: Number(fd.get("price")),
      categoryId: fd.get("categoryId"),
      isVegetarian: fd.get("isVegetarian") === "on",
      isVegan: fd.get("isVegan") === "on",
      isGlutenFree: fd.get("isGlutenFree") === "on",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
    <VStack gap={4} align="stretch">
      <Box><Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>Name</Text><Input name="name" defaultValue={(initialData?.name as string) ?? ""} required /></Box>
      <Box><Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>Description</Text><Textarea name="description" defaultValue={(initialData?.description as string) ?? ""} rows={3} /></Box>
      <Box><Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>Price (pence)</Text><Input name="price" type="number" defaultValue={(initialData?.price as number) ?? ""} required /></Box>
      <Box>
        <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>Category</Text>
        <NativeSelect.Root>
          <NativeSelect.Field name="categoryId" defaultValue={(initialData?.categoryId as string) ?? ""}>
            <option value="">Select category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </NativeSelect.Field>
        </NativeSelect.Root>
      </Box>
      <Flex gap={4}>
        <Text as="label" display="flex" alignItems="center" gap={2} fontSize="sm"><input type="checkbox" name="isVegetarian" defaultChecked={!!initialData?.isVegetarian} /> Vegetarian</Text>
        <Text as="label" display="flex" alignItems="center" gap={2} fontSize="sm"><input type="checkbox" name="isVegan" defaultChecked={!!initialData?.isVegan} /> Vegan</Text>
        <Text as="label" display="flex" alignItems="center" gap={2} fontSize="sm"><input type="checkbox" name="isGlutenFree" defaultChecked={!!initialData?.isGlutenFree} /> Gluten Free</Text>
      </Flex>
      <Button type="submit" bg="amber.600" color="white" _hover={{ bg: "amber.700" }} alignSelf="flex-start">Save</Button>
    </VStack>
    </form>
  );
}
