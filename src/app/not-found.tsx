import Link from "next/link";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Flex minH="100vh" align="center" justify="center" px={4}>
      <VStack gap={4} textAlign="center">
        <Heading size="4xl" fontWeight="bold" color="orange.500">404</Heading>
        <Heading size="xl" fontWeight={600} color="gray.900">Page Not Found</Heading>
        <Text color="gray.600">The page you&apos;re looking for doesn&apos;t exist.</Text>
        <Button asChild bg="orange.500" color="white" px={6} py={3} borderRadius="lg" _hover={{ bg: "orange.600" }}>
          <Link href="/">Back to Home</Link>
        </Button>
      </VStack>
    </Flex>
  );
}
