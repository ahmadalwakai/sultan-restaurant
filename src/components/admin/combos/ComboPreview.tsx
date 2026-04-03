"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { ComboPublic } from "@/types/combo";

interface ComboPreviewProps {
  combo: ComboPublic;
}

export function ComboPreview({ combo }: ComboPreviewProps) {
  return (
    <Box overflow="hidden" borderRadius="xl" borderWidth="1px" bg="white" shadow="sm">
      {combo.image && (
        <Box position="relative" h="40">
          <Image src={combo.image} alt={combo.name} fill className="object-cover" />
        </Box>
      )}
      <Box p={4}>
        <Heading size="md" color="gray.900">{combo.name}</Heading>
        {combo.description && <Text mt={1} fontSize="sm" color="gray.500">{combo.description}</Text>}
        <Flex mt={3} align="center" gap={2}>
          <Text fontSize="lg" fontWeight="bold" color="amber.600">{formatCurrency(combo.price)}</Text>
          <Text fontSize="sm" color="gray.400" textDecoration="line-through">{formatCurrency(combo.originalPrice)}</Text>
          <Box as="span" borderRadius="full" bg="green.100" px={2} py={0.5} fontSize="xs" fontWeight="bold" color="green.700">
            Save {formatCurrency(combo.savings)}
          </Box>
        </Flex>
        <VStack mt={3} align="stretch" gap={1}>
          <Text fontSize="xs" fontWeight="medium" color="gray.500">Includes:</Text>
          {combo.items.map((item) => (
            <Text key={item.menuItemId} fontSize="sm" color="gray.600">
              {item.quantity}{String.fromCharCode(215)} {item.menuItemName}
            </Text>
          ))}
        </VStack>
        <Text mt={2} fontSize="xs" color="gray.400">Serves {combo.servesCount}</Text>
      </Box>
    </Box>
  );
}
