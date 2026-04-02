"use client";

import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Box position="fixed" bottom={0} left={0} right={0} bg="gray.900" color="white" p={4} zIndex="banner">
      <Flex maxW="6xl" mx="auto" justify="space-between" align="center" gap={4} direction={{ base: "column", md: "row" }}>
        <Text fontSize="sm">We use cookies to enhance your experience. By continuing, you agree to our cookie policy.</Text>
        <Flex gap={2} flexShrink={0}>
          <Button size="sm" variant="outline" color="white" borderColor="white" onClick={() => setVisible(false)}>Decline</Button>
          <Button size="sm" colorPalette="brand" onClick={accept}>Accept</Button>
        </Flex>
      </Flex>
    </Box>
  );
}
