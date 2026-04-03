import { Box, VStack, Text } from "@chakra-ui/react";

export const metadata = { title: "Privacy Policy | Sultan Restaurant" };

export default function PrivacyPage() {
  return (
    <Box minH="100vh" bg="gray.50" py={16}>
      <Box mx="auto" maxW="3xl" px={4}>
        <Text fontSize="3xl" fontWeight="bold" fontFamily="heading">
          Privacy Policy
        </Text>
        <VStack mt={8} gap={6} color="gray.600" lineHeight="relaxed" align="start">
          <Text>Last updated: {new Date().toLocaleDateString("en-GB")}</Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="heading">
            Data We Collect
          </Text>
          <Text>
            We collect personal information you provide when placing orders, making
            bookings, or contacting us. This includes your name, email, phone number,
            and payment details.
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="heading">
            How We Use Your Data
          </Text>
          <Text>
            We use your data to process orders, manage bookings, send order updates,
            and improve our services. We do not sell your data to third parties.
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="heading">
            Cookies
          </Text>
          <Text>
            We use essential cookies to maintain your session and preferences.
            Analytics cookies help us understand how visitors use our site.
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="heading">
            Your Rights
          </Text>
          <Text>
            You have the right to access, correct, or delete your personal data.
            Contact us at privacy@sultanrestaurant.co.uk for any data requests.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
