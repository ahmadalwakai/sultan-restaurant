"use client";

import { VStack, Heading, Text, HStack, Button, Box } from "@chakra-ui/react";
import { Drawer } from "@chakra-ui/react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useCartStore } from "@/lib/cart";
import type { MenuItemPublic } from "@/types/menu";

interface MobileMenuItemSheetProps {
  item: MenuItemPublic | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuItemSheet({ item, isOpen, onClose }: MobileMenuItemSheetProps) {
  const addItem = useCartStore((s) => s.addItem);

  if (!item) return null;

  const handleAdd = () => {
    addItem({ menuItemId: item.id, name: item.name, price: item.price, image: item.image ?? null });
    onClose();
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(d) => !d.open && onClose()} placement="bottom">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content borderTopRadius="2xl" maxH="85vh">
          <Drawer.CloseTrigger />
          <Drawer.Body p={0}>
            <Box position="relative" h="200px">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="100vw" />
              ) : (
                <Box bg="brand.50" h="full" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="5xl">🍛</Text>
                </Box>
              )}
            </Box>
            <VStack p={4} align="start" gap={3}>
              <Heading size="md">{item.name}</Heading>
              {item.description && <Text color="gray.600">{item.description}</Text>}
              <Text fontSize="xl" fontWeight="bold" color="brand.600">{formatCurrency(item.price)}</Text>
            </VStack>
          </Drawer.Body>
          <Drawer.Footer borderTopWidth="1px">
            <Button colorPalette="brand" w="full" onClick={handleAdd} disabled={!item.isAvailable}>
              {item.isAvailable ? "Add to Cart" : "Currently Unavailable"}
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
