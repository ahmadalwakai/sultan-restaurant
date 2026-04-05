"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { ComboPublic } from "@/types/combo";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface ComboCardProps {
  combo: ComboPublic;
}

export function ComboCard({ combo }: ComboCardProps) {
  return (
    <Box overflow="hidden" borderRadius="2xl" bg="white" shadow="md" transition="all 0.2s" _hover={{ shadow: "xl", transform: "translateY(-4px)" }} role="group">
      <Box position="relative" minH="180px" css={{ aspectRatio: "16/10" }}>
        {combo.image ? (
          <Image src={combo.image} alt={combo.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <Flex h="full" w="full" align="center" justify="center" bg="linear-gradient(to bottom right, var(--chakra-colors-orange-100), var(--chakra-colors-orange-200))" fontSize="5xl">🍱</Flex>
        )}
        {combo.savings > 0 && (
          <Box position="absolute" left={3} top={3} borderRadius="full" bg="red.500" px={3} py={1} fontSize="xs" fontWeight="bold" color="white">
            Save {formatCurrency(combo.savings)}
          </Box>
        )}
        <Box position="absolute" right={3} top={3} borderRadius="full" bg="whiteAlpha.900" px={3} py={1} fontSize="xs" fontWeight="medium" color="gray.700">
          Serves {combo.servesCount}
        </Box>
      </Box>
      <Box p={5}>
        <Heading as="h3" fontSize="lg" fontWeight="bold" color="gray.900">{combo.name}</Heading>
        {combo.description && <Text mt={1} fontSize="sm" color="gray.500" lineClamp={2}>{combo.description}</Text>}
        <Text mt={2} fontSize="xs" color="gray.400">
          {combo.items.map((item) => `${item.quantity}× ${item.menuItemName}`).join(" • ")}
        </Text>
        <Flex mt={4} align="center" justify="space-between">
          <Flex align="baseline" gap={2}>
            <Text as="span" fontSize="xl" fontWeight="bold" color="orange.600">{formatCurrency(combo.price)}</Text>
            {combo.originalPrice > combo.price && (
              <Text as="span" fontSize="sm" color="gray.400" textDecoration="line-through">{formatCurrency(combo.originalPrice)}</Text>
            )}
          </Flex>
          <Link href="/menu">
            <Box borderRadius="lg" bg="orange.500" px={4} py={2} fontSize="sm" fontWeight={600} color="white" transition="background 0.2s" _hover={{ bg: "orange.600" }}>
              Order
            </Box>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
