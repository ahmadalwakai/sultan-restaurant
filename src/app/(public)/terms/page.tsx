import { Box, VStack, Text } from "@chakra-ui/react";

export const metadata = { title: "Terms & Conditions | Sultan Restaurant" };

export default function TermsPage() {
  return (
    <Box minH="100vh" bg="gray.50" py={16}>
      <Box mx="auto" maxW="3xl" px={4}>
        <Text fontSize="3xl" fontWeight="bold" fontFamily="heading">
          Terms & Conditions
        </Text>
        <VStack mt={8} gap={6} color="gray.600" lineHeight="relaxed" align="start">
          <Text>Last updated: {new Date().toLocaleDateString("en-GB")}</Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="heading">
            1. General
          </Text>
          <Text>
            By using Sultan Restaurant&apos;s website and services, you agree to these
            terms and conditions. We reserve the right to modify these terms at any time.
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="heading">
            2. Orders
          </Text>
          <Text>
            All orders are subject to availability. Prices are in GBP and include VAT.
            We reserve the right to refuse any order.
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="heading">
            3. Bookings
          </Text>
          <Text>
            Table reservations are subject to availability. We hold reservations for
            15 minutes past the booking time. Please notify us of cancellations in advance.
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="heading">
            4. Privacy
          </Text>
          <Text>
            Your personal data is handled in accordance with our Privacy Policy.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
