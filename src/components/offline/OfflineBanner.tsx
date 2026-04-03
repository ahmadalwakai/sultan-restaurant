'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Box, Flex, Text, chakra } from '@chakra-ui/react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsVisible(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      p={4}
      transition="transform 0.3s"
      transform={isVisible ? 'translateY(0)' : 'translateY(-100%)'}
    >
      <Flex
        maxW="md"
        mx="auto"
        borderRadius="lg"
        shadow="lg"
        p={4}
        align="center"
        justify="space-between"
        bg={isOnline ? 'green.600' : 'red.600'}
        color="white"
      >
        <Flex align="center" gap={3}>
          <Text fontSize="xl">
            {isOnline ? String.fromCodePoint(0x1F4F6) : String.fromCodePoint(0x1F4F5)}
          </Text>
          <Box>
            <Text fontWeight="medium">
              {isOnline ? 'Back Online' : "You're Offline"}
            </Text>
            <Text fontSize="sm" opacity={0.9}>
              {isOnline
                ? 'Connection restored'
                : 'Some features may be limited'
              }
            </Text>
          </Box>
        </Flex>

        <chakra.button
          onClick={() => setIsVisible(false)}
          type="button"
          p={1}
          borderRadius="md"
          _hover={{ bg: 'whiteAlpha.200' }}
          transition="background 0.2s"
          aria-label="Dismiss"
        >
          <X size={20} />
        </chakra.button>
      </Flex>
    </Box>
  );
}
