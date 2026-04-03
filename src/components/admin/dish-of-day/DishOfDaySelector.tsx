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

interface DishOfDaySelectorProps {
  selectedId: string;
  onChange: (menuItemId: string) => void;
}

export function DishOfDaySelector({ selectedId, onChange }: DishOfDaySelectorProps) {
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
  const selected = menuItems.find((m) => m.id === selectedId);

  return (
    <VStack gap={3} align="stretch">
      <Text as="label" display="block" fontSize="sm" fontWeight="medium" color="gray.700">Select Menu Item</Text>

      {selected && (
        <Flex align="center" gap={3} borderRadius="lg" borderWidth="1px" borderColor="amber.200" bg="amber.50" p={3}>
          <Box position="relative" h="10" w="10" flexShrink={0} overflow="hidden" borderRadius="lg">
            {selected.image ? (
              <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="40px" />
            ) : (
              <Flex h="full" w="full" align="center" justify="center" bg="amber.100" fontSize="lg">{String.fromCodePoint(0x1F35B)}</Flex>
            )}
          </Box>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium" color="gray.900">{selected.name}</Text>
            <Text fontSize="xs" color="amber.600">{String.fromCharCode(163)}{selected.price.toFixed(2)}</Text>
          </Box>
          <Button type="button" variant="ghost" size="sm" color="gray.400" onClick={() => onChange("")}>Change</Button>
        </Flex>
      )}

      {!selected && (
        <>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items..."
            size="sm"
          />
          <Box maxH="64" overflowY="auto" borderRadius="lg" borderWidth="1px" bg="white">
            {filtered.slice(0, 20).map((item) => (
              <chakra.button
                key={item.id}
                type="button"
                onClick={() => { onChange(item.id); setSearch(""); }}
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
        </>
      )}
    </VStack>
  );
}
