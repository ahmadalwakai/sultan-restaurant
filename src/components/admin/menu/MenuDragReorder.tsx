"use client";

import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

interface MenuDragReorderProps {
  items: Array<{ id: string; name: string; sortOrder: number }>;
  onReorder: (items: Array<{ id: string; sortOrder: number }>) => void;
}

export function MenuDragReorder({ items, onReorder }: MenuDragReorderProps) {
  function moveUp(index: number) {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    onReorder(newItems.map((item, i) => ({ id: item.id, sortOrder: i })));
  }

  function moveDown(index: number) {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    onReorder(newItems.map((item, i) => ({ id: item.id, sortOrder: i })));
  }

  return (
    <VStack gap={1}>
      {items.map((item, i) => (
        <Flex key={item.id} align="center" gap={3} p={3} bg="white" borderWidth="1px" rounded="lg" w="full">
          <Flex direction="column" gap={1}>
            <Button variant="ghost" size="xs" onClick={() => moveUp(i)} disabled={i === 0} color="gray.400" _hover={{ color: "gray.600" }}>&#9650;</Button>
            <Button variant="ghost" size="xs" onClick={() => moveDown(i)} disabled={i === items.length - 1} color="gray.400" _hover={{ color: "gray.600" }}>&#9660;</Button>
          </Flex>
          <Text fontSize="sm" fontWeight="medium">{item.name}</Text>
        </Flex>
      ))}
    </VStack>
  );
}
