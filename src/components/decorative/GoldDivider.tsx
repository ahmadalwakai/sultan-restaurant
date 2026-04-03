import { Box, HStack } from "@chakra-ui/react";

export function GoldDivider() {
  return (
    <HStack gap={3} justify="center" py={2}>
      <Box w="40px" h="1px" bg="brand.primary" opacity={0.4} />
      <Box w="6px" h="6px" borderRadius="full" bg="brand.primary" opacity={0.6} />
      <Box w="40px" h="1px" bg="brand.primary" opacity={0.4} />
    </HStack>
  );
}