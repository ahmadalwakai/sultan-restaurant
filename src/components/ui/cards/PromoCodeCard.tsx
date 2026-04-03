"use client";

import { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

interface PromoCodeCardProps {
  code: string;
  description: string;
  discount: string;
  expiresAt?: string;
}

export function PromoCodeCard({ code, description, discount, expiresAt }: PromoCodeCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Box overflow="hidden" borderRadius="xl" border="1px dashed" borderColor="amber.300" bg="amber.50">
      <Box p={4}>
        <Flex align="center" justify="space-between">
          <Text fontSize="2xl" fontWeight="bold" color="amber.600">{discount}</Text>
          {expiresAt && (
            <Text fontSize="xs" color="gray.400">
              Expires {new Date(expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </Text>
          )}
        </Flex>
        <Text mt={1} fontSize="sm" color="gray.600">{description}</Text>
      </Box>
      <Flex align="center" justify="space-between" borderTop="1px dashed" borderColor="amber.300" bg="bg.surface" px={4} py={3}>
        <Text fontFamily="mono" fontSize="sm" fontWeight="bold" letterSpacing="wider" color="gray.800">{code}</Text>
        <Button
          size="sm"
          borderRadius="lg"
          bg="amber.500"
          color="white"
          fontWeight="medium"
          _hover={{ bg: "amber.600" }}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </Flex>
    </Box>
  );
}
