"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Button, Flex, Input, Text, VStack, chakra } from "@chakra-ui/react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image?: string | null;
}

interface ComboItemsPickerProps {
  selectedItems: { menuItemId: string; quantity: number }[];
  onChange: (items: { menuItemId: string; quantity: number }[]) => void;
}

export function ComboItemsPicker({ selectedItems, onChange }: ComboItemsPickerProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data.data || []));
  }, []);

  const filtered = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  function addItem(item: MenuItem) {
    const existing = selectedItems.find((s) => s.menuItemId === item.id);
    if (existing) {
      onChange(selectedItems.map((s) => s.menuItemId === item.id ? { ...s, quantity: s.quantity + 1 } : s));
    } else {
      onChange([...selectedItems, { menuItemId: item.id, quantity: 1 }]);
    }
  }

  function removeItem(menuItemId: string) {
    onChange(selectedItems.filter((s) => s.menuItemId !== menuItemId));
  }

  return (
    <VStack gap={4} align="stretch">
      <Box>
        <Text as="label" display="block" mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Search Menu Items</Text>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          size="sm"
        />
      </Box>

      {search && (
        <Box maxH="48" overflowY="auto" borderRadius="lg" borderWidth="1px" bg="white">
          {filtered.slice(0, 10).map((item) => (
            <chakra.button
              key={item.id}
              type="button"
              onClick={() => { addItem(item); setSearch(""); }}
              w="full"
              display="flex"
              alignItems="center"
              gap={3}
              px={3}
              py={2}
              textAlign="left"
              _hover={{ bg: "gray.50" }}
            >
              <Box position="relative" h="8" w="8" flexShrink={0} overflow="hidden" borderRadius="md">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="32px" />
                ) : (
                  <Flex h="full" w="full" align="center" justify="center" bg="amber.50" fontSize="sm">{String.fromCodePoint(0x1F35B)}</Flex>
                )}
              </Box>
              <Text flex="1" fontSize="sm">{item.name}</Text>
              <Text fontSize="sm" color="amber.600">{String.fromCharCode(163)}{item.price.toFixed(2)}</Text>
            </chakra.button>
          ))}
        </Box>
      )}

      <VStack gap={2}>
        {selectedItems.map((selected) => {
          const item = menuItems.find((m) => m.id === selected.menuItemId);
          return (
            <Flex key={selected.menuItemId} align="center" gap={2} borderRadius="lg" borderWidth="1px" bg="gray.50" p={2}>
              <Text flex="1" fontSize="sm">{item?.name || selected.menuItemId}</Text>
              <Text fontSize="xs" color="gray.400">{String.fromCharCode(215)}{selected.quantity}</Text>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                color="red.500"
                onClick={() => removeItem(selected.menuItemId)}
              >
                X
              </Button>
            </Flex>
          );
        })}
      </VStack>
    </VStack>
  );
}
