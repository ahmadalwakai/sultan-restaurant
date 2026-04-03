'use client';

// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Offline - Sultan Restaurant',
//   description: 'You are currently offline. Browse our cached menu and place orders when back online.',
//   robots: 'noindex, nofollow',
// };

import { Box, Text, Heading, Button, VStack } from "@chakra-ui/react";

export default function OfflinePage() {
  return (
    <Box minH="screen" bg="gray.900" color="gray.100" display="flex" flexDir="column" alignItems="center" justifyContent="center" p={4}>
      <Box maxW="md" w="full" textAlign="center">
        {/* Icon */}
        <Text fontSize="6xl" mb={6}>🍽️</Text>

        {/* Title */}
        <Heading size="3xl" fontWeight="bold" color="amber.400" mb={4}>
          You're Offline
        </Heading>

        {/* Message */}
        <Text color="gray.300" mb={8} lineHeight="relaxed">
          We're sorry, but it looks like you're not connected to the internet.
          Don't worry though - you can still browse our menu and place orders when you get back online!
        </Text>

        {/* Retry Button */}
        <Button
          onClick={() => window.location.reload()}
          bg="amber.500"
          _hover={{ bg: "amber.600" }}
          color="gray.900"
          fontWeight="semibold"
          py={3}
          px={6}
          rounded="lg"
          mb={6}
        >
          Try Again
        </Button>

        {/* Status */}
        <Text fontSize="sm" color="gray.500" id="status">
          Checking connection...
        </Text>
      </Box>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Check online status
            function updateStatus() {
              const status = document.getElementById('status');
              if (navigator.onLine) {
                status.textContent = 'You appear to be back online!';
                status.style.color = '#48bb78';
              } else {
                status.textContent = 'Still offline - check your connection';
                status.style.color = '#718096';
              }
            }

            window.addEventListener('online', updateStatus);
            window.addEventListener('offline', updateStatus);
            updateStatus();

            // Auto-retry when back online
            window.addEventListener('online', () => {
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
          `,
        }}
      />
    </Box>
  );
}