"use client";

import { useState } from "react";
import { Box, Button, Flex, Input, SimpleGrid, Text, Textarea, VStack } from "@chakra-ui/react";

interface ComboFormData {
  name: string;
  description: string;
  price: string;
  image: string;
  servesCount: string;
  isActive: boolean;
  items: { menuItemId: string; quantity: number }[];
}

interface ComboFormProps {
  initialData?: Partial<ComboFormData>;
  onSubmit: (data: ComboFormData) => Promise<void>;
  submitLabel?: string;
}

export function ComboForm({ initialData, onSubmit, submitLabel = "Save" }: ComboFormProps) {
  const [form, setForm] = useState<ComboFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    image: initialData?.image || "",
    servesCount: initialData?.servesCount || "2",
    isActive: initialData?.isActive ?? true,
    items: initialData?.items || [],
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSubmit(form);
    setSaving(false);
  }

  function addItem() {
    setForm({ ...form, items: [...form.items, { menuItemId: "", quantity: 1 }] });
  }

  function updateItem(index: number, field: string, value: string | number) {
    const newItems = form.items.map((item, i) => i === index ? { ...item, [field]: value } : item);
    setForm({ ...form, items: newItems });
  }

  function removeItem(index: number) {
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  }

  return (
    <form onSubmit={handleSubmit}>
    <VStack gap={6} align="stretch">
      <Box>
        <Text as="label" display="block" mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Name</Text>
        <Input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </Box>
      <Box>
        <Text as="label" display="block" mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Description</Text>
        <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
      </Box>
      <SimpleGrid columns={2} gap={4}>
        <Box>
          <Text as="label" display="block" mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Price</Text>
          <Input type="number" step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </Box>
        <Box>
          <Text as="label" display="block" mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Serves</Text>
          <Input type="number" min="1" value={form.servesCount} onChange={(e) => setForm({ ...form, servesCount: e.target.value })} />
        </Box>
      </SimpleGrid>
      <Box>
        <Text as="label" display="block" mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Image URL</Text>
        <Input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      </Box>
      <Box>
        <Flex mb={2} align="center" justify="space-between">
          <Text as="label" fontSize="sm" fontWeight="medium" color="gray.700">Combo Items</Text>
          <Button type="button" variant="ghost" size="sm" color="amber.600" onClick={addItem}>+ Add Item</Button>
        </Flex>
        <VStack gap={2}>
          {form.items.map((item, i) => (
            <Flex key={i} align="center" gap={2} w="full">
              <Input
                type="text"
                placeholder="Menu Item ID"
                value={item.menuItemId}
                onChange={(e) => updateItem(i, "menuItemId", e.target.value)}
                flex="1"
                size="sm"
              />
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(i, "quantity", parseInt(e.target.value, 10))}
                w="20"
                size="sm"
              />
              <Button type="button" variant="ghost" size="sm" color="red.500" onClick={() => removeItem(i)}>X</Button>
            </Flex>
          ))}
        </VStack>
      </Box>
      <Flex align="center" gap={2}>
        <input
          type="checkbox"
          id="comboActive"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
        />
        <label htmlFor="comboActive"><Text fontSize="sm" color="gray.700">Active</Text></label>
      </Flex>
      <Button
        type="submit"
        disabled={saving}
        bg="amber.500"
        color="white"
        _hover={{ bg: "amber.600" }}
        fontWeight="medium"
        alignSelf="flex-start"
      >
        {saving ? "Saving..." : submitLabel}
      </Button>
    </VStack>
    </form>
  );
}
