"use client";

import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

interface CategoryDragReorderProps {
  categories: Array<{ id: string; name: string; sortOrder: number }>;
  onReorder: (items: Array<{ id: string; sortOrder: number }>) => void;
}

export function CategoryDragReorder({ categories, onReorder }: CategoryDragReorderProps) {
  function moveUp(i: number) {
    if (i === 0) return;
    const next = [...categories];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onReorder(next.map((c, idx) => ({ id: c.id, sortOrder: idx })));
  }
  function moveDown(i: number) {
    if (i === categories.length - 1) return;
    const next = [...categories];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    onReorder(next.map((c, idx) => ({ id: c.id, sortOrder: idx })));
  }

  return (
    <VStack gap={1} align="stretch">
      {categories.map((c, i) => (
        <Flex key={c.id} align="center" gap={3} p={3} bg="white" borderWidth="1px" borderRadius="lg">
          <Flex direction="column" gap={1}>
            <Button variant="ghost" size="xs" onClick={() => moveUp(i)} disabled={i === 0} color="gray.400" _hover={{ color: "gray.600" }} _disabled={{ opacity: 0.3 }}>{String.fromCharCode(9650)}</Button>
            <Button variant="ghost" size="xs" onClick={() => moveDown(i)} disabled={i === categories.length - 1} color="gray.400" _hover={{ color: "gray.600" }} _disabled={{ opacity: 0.3 }}>{String.fromCharCode(9660)}</Button>
          </Flex>
          <Text fontSize="sm" fontWeight="medium">{c.name}</Text>
        </Flex>
      ))}
    </VStack>
  );
}
