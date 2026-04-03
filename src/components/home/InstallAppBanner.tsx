"use client";

import { useEffect, useState } from "react";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";

export function InstallAppBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem("sultan-install-dismissed");
    if (dismissed) return;

    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  function handleInstall() {
    if (!deferredPrompt) return;
    (deferredPrompt as unknown as { prompt: () => void }).prompt();
    setShowBanner(false);
  }

  function handleDismiss() {
    setShowBanner(false);
    localStorage.setItem("sultan-install-dismissed", "true");
  }

  if (!showBanner) return null;

  return (
    <Box as="section" bg="linear-gradient(to right, var(--chakra-colors-orange-400), var(--chakra-colors-orange-500))" py={6}>
      <Flex direction={{ base: "column", sm: "row" }} maxW="7xl" mx="auto" align="center" justify="space-between" gap={4} px={4}>
        <Flex align="center" gap={4} color="white">
          <Flex h={12} w={12} align="center" justify="center" borderRadius="xl" bg="whiteAlpha.200" fontSize="2xl">
            📱
          </Flex>
          <Box>
            <Heading size="md" fontWeight="bold">Add Sultan to your Home Screen</Heading>
            <Text fontSize="sm" color="whiteAlpha.800">
              Quick access to menu, orders & exclusive offers
            </Text>
          </Box>
        </Flex>
        <Flex gap={3}>
          <Button
            onClick={handleInstall}
            borderRadius="lg"
            bg="white"
            px={6}
            fontWeight={600}
            color="orange.500"
            _hover={{ bg: "orange.50" }}
          >
            Install App
          </Button>
          <Button
            onClick={handleDismiss}
            variant="outline"
            borderRadius="lg"
            borderWidth="2px"
            borderColor="whiteAlpha.400"
            px={4}
            fontSize="sm"
            fontWeight="medium"
            color="white"
            _hover={{ borderColor: "white" }}
          >
            Not Now
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
