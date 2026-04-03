import Link from "next/link";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export default function PublicNotFound() {
  return (
    <Flex minH="60vh" align="center" justify="center" px={4}>
      <VStack gap={4} textAlign="center">
        <Heading size="6xl" fontWeight="bold" fontFamily="heading" color="amber.600">404</Heading>
        <Heading size="xl" fontWeight={600} color="gray.900">Page Not Found</Heading>
        <Text color="gray.600">We couldn&apos;t find what you were looking for.</Text>
        <Button asChild bg="amber.600" color="white" px={6} py={3} borderRadius="lg" _hover={{ bg: "amber.700" }}>
          <Link href="/">Return Home</Link>
        </Button>
      </VStack>
    </Flex>
  );
}
