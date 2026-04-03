"use client";

import { useState } from "react";
import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface DayHours { day: string; open: string; close: string; isClosed: boolean }

export function OpeningHoursForm({ initial, onSave }: { initial: DayHours[]; onSave: (data: DayHours[]) => Promise<void> }) {
  const [hours, setHours] = useState<DayHours[]>(
    initial.length ? initial : DAYS.map((day) => ({ day, open: "11:00", close: "22:00", isClosed: false }))
  );
  const [saving, setSaving] = useState(false);

  const update = (index: number, field: keyof DayHours, value: string | boolean) => {
    const updated = [...hours];
    updated[index] = { ...updated[index], [field]: value };
    setHours(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(hours);
    setSaving(false);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} gap={3} maxW="xl" align="stretch">
      {hours.map((h, i) => (
        <HStack key={h.day} gap={3} align="center">
          <Text w="24" fontSize="sm" fontWeight="medium">{h.day}</Text>
          <HStack as="label" gap={1} fontSize="sm">
            <input type="checkbox" checked={h.isClosed} onChange={(e) => update(i, "isClosed", e.target.checked)} />
            <Text>Closed</Text>
          </HStack>
          {!h.isClosed && (
            <>
              <Input type="time" value={h.open} onChange={(e) => update(i, "open", e.target.value)} size="sm" w="auto" />
              <Text color="gray.400">to</Text>
              <Input type="time" value={h.close} onChange={(e) => update(i, "close", e.target.value)} size="sm" w="auto" />
            </>
          )}
        </HStack>
      ))}
      <Button type="submit" disabled={saving} borderRadius="lg" bg="amber.600" color="white" py={2} px={6} _hover={{ bg: "amber.700" }} _disabled={{ opacity: 0.5 }}>
        {saving ? "Saving..." : "Save Hours"}
      </Button>
    </VStack>
  );
}
