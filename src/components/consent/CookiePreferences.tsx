"use client";

import { Box, VStack, Text, Heading, Checkbox, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function CookiePreferences() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const save = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ essential: true, analytics, marketing }));
  };

  return (
    <Box bg="white" p={6} borderRadius="xl" maxW="lg" mx="auto">
      <Heading as="h3" fontSize="lg" mb={4}>Cookie Preferences</Heading>
      <VStack gap={3} align="stretch">
        <Checkbox.Root checked disabled>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label><Text>Essential Cookies (Required)</Text></Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root checked={analytics} onCheckedChange={(d) => setAnalytics(!!d.checked)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label><Text>Analytics Cookies</Text></Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root checked={marketing} onCheckedChange={(d) => setMarketing(!!d.checked)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label><Text>Marketing Cookies</Text></Checkbox.Label>
        </Checkbox.Root>
        <Button colorPalette="brand" onClick={save}>Save Preferences</Button>
      </VStack>
    </Box>
  );
}
