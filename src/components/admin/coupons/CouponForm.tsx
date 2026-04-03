"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, SimpleGrid, VStack, Text, Input, Button } from "@chakra-ui/react";
import { NativeSelect } from "@chakra-ui/react";

interface CouponFormProps {
  initialData?: { id?: string; code: string; discountType: string; discountValue: number; minOrder?: number; maxUses?: number | null; expiresAt?: string | null };
}

export function CouponForm({ initialData }: CouponFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState({
    code: initialData?.code ?? "",
    discountType: initialData?.discountType ?? "PERCENTAGE",
    discountValue: initialData?.discountValue ?? 10,
    minOrder: initialData?.minOrder ?? 0,
    maxUses: initialData?.maxUses ?? "",
    expiresAt: initialData?.expiresAt?.slice(0, 10) ?? "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEdit ? `/api/admin/coupons/${initialData!.id}` : "/api/admin/coupons";
    const method = isEdit ? "PUT" : "POST";
    const body = { ...form, maxUses: form.maxUses === "" ? null : Number(form.maxUses) };
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    router.push("/admin/coupons");
    router.refresh();
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="xl">
      <VStack gap={4} align="stretch">
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Code</Text>
          <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} fontFamily="mono" required />
        </Box>
        <SimpleGrid columns={2} gap={4}>
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={1}>Type</Text>
            <NativeSelect.Root>
              <NativeSelect.Field value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })}>
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed</option>
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={1}>Value</Text>
            <Input type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })} required />
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={2} gap={4}>
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={1}>Min Order (£)</Text>
            <Input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })} />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={1}>Max Uses</Text>
            <Input type="number" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} placeholder="Unlimited" />
          </Box>
        </SimpleGrid>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Expires At</Text>
          <Input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
        </Box>
        <Button type="submit" disabled={saving} bg="amber.600" color="white" borderRadius="lg" _hover={{ bg: "amber.700" }} _disabled={{ opacity: 0.5 }}>
          {saving ? "Saving..." : isEdit ? "Update Coupon" : "Create Coupon"}
        </Button>
      </VStack>
    </Box>
  );
}
