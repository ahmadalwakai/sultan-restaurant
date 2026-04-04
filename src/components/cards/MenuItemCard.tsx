"use client";

import Image from "next/image";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useCartStore } from "@/lib/cart";
import { Card, Box, Flex, HStack, Heading, Text, Button } from "@chakra-ui/react";
import type { MenuItemPublic } from "@/types/menu";

interface MenuItemCardProps {
  item: MenuItemPublic;
}

const badgeColors: Record<string, string> = {
  V: "green.500",
  VG: "green.600",
  GF: "blue.500",
};

export function MenuItemCard({ item }: MenuItemCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image ?? null,
      itemType: "RESTAURANT",
    });
  };

  const dietaryBadges = [
    item.isVegetarian && { label: "V" },
    item.isVegan && { label: "VG" },
    item.isGlutenFree && { label: "GF" },
  ].filter(Boolean) as { label: string }[];

  const [imgError, setImgError] = useState(false);

  return (
    <Card.Root overflow="hidden" bg="bg.surface" shadow="sm" borderRadius="xl" transition="all 0.2s" _hover={{ shadow: "lg" }}>
      <Card.Header p={0}>
        <Box position="relative" css={{ aspectRatio: "4/3" }} overflow="hidden">
          {item.image && !imgError ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              unoptimized
              style={{ objectFit: "cover", transition: "transform 0.5s" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <Flex h="full" w="full" align="center" justify="center" bgGradient="to-br" gradientFrom="amber.50" gradientTo="orange.50">
              <Text fontSize="5xl">🍛</Text>
            </Flex>
          )}
          {item.isPopular && (
            <Box position="absolute" top={3} left={3} borderRadius="full" bg="amber.500" px={2.5} py={0.5} fontSize="xs" fontWeight="bold" color="white">
              Popular
            </Box>
          )}
          {dietaryBadges.length > 0 && (
            <HStack position="absolute" top={3} right={3} gap={1}>
              {dietaryBadges.map((badge) => (
                <Box
                  key={badge.label}
                  borderRadius="full"
                  bg={badgeColors[badge.label]}
                  px={1.5}
                  py={0.5}
                  fontSize="10px"
                  fontWeight="bold"
                  color="white"
                >
                  {badge.label}
                </Box>
              ))}
            </HStack>
          )}
        </Box>
      </Card.Header>

      <Card.Body p={4} display="flex" flexDirection="column" flex={1}>
        <Heading as="h3" fontFamily="heading" fontSize="lg" fontWeight="bold" color="gray.900">
          {item.name}
        </Heading>
        {item.description && (
          <Text mt={1} fontSize="sm" color="gray.500" lineClamp={2}>
            {item.description}
          </Text>
        )}
        {item.spiceLevel > 0 && (
          <HStack mt={2} gap={0.5}>
            {Array.from({ length: item.spiceLevel }).map((_, i) => (
              <Text key={i} fontSize="xs">🌶️</Text>
            ))}
          </HStack>
        )}
        <Flex mt="auto" align="center" justify="space-between" pt={3}>
          <Text fontSize="lg" fontWeight="bold" color="amber.600">
            {formatCurrency(item.price)}
          </Text>
          <Button
            onClick={handleAdd}
            disabled={!item.isAvailable}
            borderRadius="lg"
            bg="amber.500"
            px={4}
            py={2}
            fontSize="sm"
            fontWeight="semibold"
            color="white"
            _hover={{ bg: "amber.600" }}
            _disabled={{ cursor: "not-allowed", opacity: 0.5 }}
          >
            {item.isAvailable ? "Add to Cart" : "Unavailable"}
          </Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
