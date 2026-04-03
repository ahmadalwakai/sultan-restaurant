import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export const metadata = { title: "Cookie Policy | Sultan Restaurant" };

export default function CookiesPage() {
  return (
    <Box minH="screen" bg="gray.50" py={16}>
      <Container maxW="3xl" px={4}>
        <Heading fontFamily="heading" size="xl" fontWeight="bold">Cookie Policy</Heading>
        <VStack mt={8} gap={6} color="gray.600" textAlign="left" align="stretch">
          <Text>We use cookies to improve your experience on our site.</Text>
          <Box>
            <Heading fontFamily="heading" size="lg" fontWeight="bold" color="gray.900">Essential Cookies</Heading>
            <Text mt={2}>
              These cookies are necessary for the website to function and cannot be
              disabled. They include session cookies and authentication tokens.
            </Text>
          </Box>
          <Box>
            <Heading fontFamily="heading" size="lg" fontWeight="bold" color="gray.900">Analytics Cookies</Heading>
            <Text mt={2}>
              We use analytics cookies to understand how visitors interact with our
              website. This helps us improve our services.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
