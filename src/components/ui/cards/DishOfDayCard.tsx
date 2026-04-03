"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { DishOfDayPublic } from "@/types/dish-of-day";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface DishOfDayCardProps {
  dish: DishOfDayPublic;
}

export function DishOfDayCard({ dish }: DishOfDayCardProps) {
  const hasDiscount = dish.discountPrice !== null && dish.discountPrice < dish.menuItemPrice;

  return (
    <Box overflow="hidden" borderRadius="2xl" bg="linear-gradient(to bottom right, var(--chakra-colors-orange-400), var(--chakra-colors-orange-500))" shadow="lg" role="group">
      <Flex direction={{ base: "column", sm: "row" }}>
        <Box position="relative" css={{ aspectRatio: "1" }} sm={{ w: "50%" }}>
          {dish.menuItemImage ? (
            <Image src={dish.menuItemImage} alt={dish.menuItemName} fill className="object-cover" />
          ) : (
            <Flex h="full" w="full" align="center" justify="center" fontSize="6xl">🍲</Flex>
          )}
          <Box position="absolute" left={3} top={3} borderRadius="full" bg="red.500" px={3} py={1} fontSize="xs" fontWeight="bold" color="white">
            ⭐ Dish of the Day
          </Box>
        </Box>
        <Flex direction="column" justify="center" p={6} color="white" sm={{ w: "50%" }}>
          <Heading as="h3" fontSize="2xl" fontWeight="bold">{dish.menuItemName}</Heading>
          {dish.menuItemDescription && (
            <Text mt={2} fontSize="sm" color="whiteAlpha.800" lineClamp={3}>{dish.menuItemDescription}</Text>
          )}
          {dish.reason && <Text mt={2} fontSize="sm" fontStyle="italic" color="whiteAlpha.700">&ldquo;{dish.reason}&rdquo;</Text>}
          <Flex mt={4} align="baseline" gap={2}>
            {hasDiscount ? (
              <>
                <Text as="span" fontSize="2xl" fontWeight="bold">{formatCurrency(dish.discountPrice!)}</Text>
                <Text as="span" fontSize="base" color="whiteAlpha.600" textDecoration="line-through">{formatCurrency(dish.menuItemPrice)}</Text>
              </>
            ) : (
              <Text as="span" fontSize="2xl" fontWeight="bold">{formatCurrency(dish.menuItemPrice)}</Text>
            )}
          </Flex>
          <Link href={`/menu/${dish.menuItemSlug}`}>
          <Box
            display="inline-block"
            mt={4}
            borderRadius="lg"
            bg="white"
            px={6}
            py={2.5}
            textAlign="center"
            fontWeight={600}
            color="orange.600"
            transition="background 0.2s"
            _hover={{ bg: "orange.50" }}
          >
            Order Now
          </Box>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
