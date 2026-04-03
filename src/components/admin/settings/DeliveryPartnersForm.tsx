"use client";

import { useState } from "react";
import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";

interface Partner { name: string; url: string; logoUrl: string }

export function DeliveryPartnersForm({ initial, onSave }: { initial: Partner[]; onSave: (data: Partner[]) => Promise<void> }) {
  const [partners, setPartners] = useState<Partner[]>(initial.length ? initial : []);
  const [saving, setSaving] = useState(false);

  const update = (index: number, field: keyof Partner, value: string) => {
    const updated = [...partners];
    updated[index] = { ...updated[index], [field]: value };
    setPartners(updated);
  };

  const addPartner = () => setPartners([...partners, { name: "", url: "", logoUrl: "" }]);
  const removePartner = (index: number) => setPartners(partners.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(partners);
    setSaving(false);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} gap={4} maxW="xl" align="stretch">
      {partners.map((p, i) => (
        <Box key={i} borderWidth={1} borderRadius="lg" p={4}>
          <VStack gap={2} align="stretch">
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" fontWeight="medium">Partner {i + 1}</Text>
              <Button type="button" onClick={() => removePartner(i)} size="xs" colorScheme="red" variant="ghost">
                Remove
              </Button>
            </Flex>
            <Input value={p.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Name" size="sm" />
            <Input value={p.url} onChange={(e) => update(i, "url", e.target.value)} placeholder="Website URL" size="sm" />
            <Input value={p.logoUrl} onChange={(e) => update(i, "logoUrl", e.target.value)} placeholder="Logo URL" size="sm" />
          </VStack>
        </Box>
      ))}
      <Button type="button" onClick={addPartner} size="sm" colorScheme="amber" variant="ghost">
        + Add Partner
      </Button>
      <Button type="submit" disabled={saving} borderRadius="lg" bg="amber.600" color="white" py={2} px={6} _hover={{ bg: "amber.700" }} _disabled={{ opacity: 0.5 }}>
        {saving ? "Saving..." : "Save Partners"}
      </Button>
    </VStack>
  );
}
