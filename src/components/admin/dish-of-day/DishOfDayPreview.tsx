"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { DishOfDayPublic } from "@/types/dish-of-day";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface DishOfDayPreviewProps {
  dishOfDay: DishOfDayPublic;
}

export function DishOfDayPreview({ dishOfDay }: DishOfDayPreviewProps) {
  const savings = dishOfDay.menuItemPrice - (dishOfDay.discountPrice ?? dishOfDay.menuItemPrice);

  return (
    <Box overflow="hidden" rounded="xl" borderWidth="1px" bg="white" shadow="sm">
      {dishOfDay.menuItemImage && (
        <Box position="relative" h="40">
          <Image src={dishOfDay.menuItemImage} alt={dishOfDay.menuItemName} fill className="object-cover" />
          <Box position="absolute" right={3} top={3} rounded="full" bg="red.500" px={3} py={1} fontSize="sm" fontWeight="bold" color="white">
            Save {formatCurrency(savings)}
          </Box>
        </Box>
      )}
      <Box p={4}>
        <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="wide" color="amber.600">Dish of the Day</Text>
        <Heading size="md" mt={1} color="gray.900">{dishOfDay.menuItemName}</Heading>
        {dishOfDay.reason && <Text mt={1} fontSize="sm" fontStyle="italic" color="gray.500">{dishOfDay.reason}</Text>}
        <Flex mt={3} align="center" gap={2}>
          <Text fontSize="lg" fontWeight="bold" color="amber.600">{formatCurrency(dishOfDay.discountPrice ?? dishOfDay.menuItemPrice)}</Text>
          <Text fontSize="sm" color="gray.400" textDecoration="line-through">{formatCurrency(dishOfDay.menuItemPrice)}</Text>
        </Flex>
        <Text mt={2} fontSize="xs" color="gray.400">
          {new Date(dishOfDay.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
        </Text>
      </Box>
    </Box>
  );
}
