"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VStack, Input, Textarea, Button, Text, Box, SimpleGrid, NativeSelect } from "@chakra-ui/react";

interface OfferFormProps {
  initialData?: { id?: string; title: string; description: string; discountType: string; discountValue: number; minOrder?: number; expiresAt?: string; imageUrl?: string };
}

export function OfferForm({ initialData }: OfferFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    discountType: initialData?.discountType ?? "PERCENTAGE",
    discountValue: initialData?.discountValue ?? 10,
    minOrder: initialData?.minOrder ?? 0,
    expiresAt: initialData?.expiresAt?.slice(0, 10) ?? "",
    imageUrl: initialData?.imageUrl ?? "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEdit ? `/api/admin/offers/${initialData!.id}` : "/api/admin/offers";
    const method = isEdit ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    router.push("/admin/offers");
    router.refresh();
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="xl">
      <VStack align="stretch" gap={4}>
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
            required
          />
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
          />
        </Box>

        <SimpleGrid columns={2} gap={4}>
          <Box>
            <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
              Discount Type
            </Text>
            <NativeSelect.Root>
              <NativeSelect.Field
                value={form.discountType}
                onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                borderRadius="lg"
                px={3}
                py={2}
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed Amount</option>
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Box>

          <Box>
            <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
              Value
            </Text>
            <Input
              type="number"
              value={form.discountValue}
              onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })}
              borderRadius="lg"
              px={3}
              py={2}
            />
          </Box>
        </SimpleGrid>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Min Order (£)
          </Text>
          <Input
            type="number"
            value={form.minOrder}
            onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })}
            borderRadius="lg"
            px={3}
            py={2}
          />
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={1}>
            Expires At
          </Text>
          <Input
            type="date"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
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
          {saving ? "Saving..." : isEdit ? "Update Offer" : "Create Offer"}
        </Button>
      </VStack>
    </Box>
  );
}
