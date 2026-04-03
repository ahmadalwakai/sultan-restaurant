"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { DishOfDayPublic } from "@/types/dish-of-day";
import { Box, Flex, Heading, Text, Card } from "@chakra-ui/react";

interface DishOfDayPreviewProps {
  dishOfDay: DishOfDayPublic;
}

export function DishOfDayPreview({ dishOfDay }: DishOfDayPreviewProps) {
  const savings = dishOfDay.menuItemPrice - (dishOfDay.discountPrice ?? dishOfDay.menuItemPrice);

  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl" overflow="hidden">
      {dishOfDay.menuItemImage && (
        <Box position="relative" h="40">
          <Image src={dishOfDay.menuItemImage} alt={dishOfDay.menuItemName} fill className="object-cover" />
          <Box position="absolute" right={3} top={3} borderRadius="full" bg="red.500" px={3} py={1} fontSize="sm" fontWeight="bold" color="white">
            Save {formatCurrency(savings)}
          </Box>
        </Box>
      )}
      <Card.Body p={4}>
        <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="wide" color="brand.primary">Dish of the Day</Text>
        <Heading size="md" mt={1} color="fg.default">{dishOfDay.menuItemName}</Heading>
        {dishOfDay.reason && <Text mt={1} fontSize="sm" fontStyle="italic" color="fg.muted">{dishOfDay.reason}</Text>}
        <Flex mt={3} align="center" gap={2}>
          <Text fontSize="lg" fontWeight="bold" color="brand.primary">{formatCurrency(dishOfDay.discountPrice ?? dishOfDay.menuItemPrice)}</Text>
          <Text fontSize="sm" color="fg.muted" textDecoration="line-through">{formatCurrency(dishOfDay.menuItemPrice)}</Text>
        </Flex>
        <Text mt={2} fontSize="xs" color="fg.muted">
          {new Date(dishOfDay.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
        </Text>
      </Card.Body>
    </Card.Root>
  );
}
