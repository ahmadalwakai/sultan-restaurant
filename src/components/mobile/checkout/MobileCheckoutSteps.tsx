"use client";

import { HStack, Box, Text, VStack } from "@chakra-ui/react";

interface MobileCheckoutStepsProps {
  steps: string[];
  currentStep: number;
}

export default function MobileCheckoutSteps({ steps, currentStep }: MobileCheckoutStepsProps) {
  return (
    <HStack gap={0} w="full">
      {steps.map((step, i) => (
        <VStack key={step} flex={1} gap={1}>
          <Box
            w={8}
            h={8}
            borderRadius="full"
            bg={i <= currentStep ? "brand.500" : "gray.200"}
            color={i <= currentStep ? "white" : "gray.500"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="sm"
            fontWeight="bold"
          >
            {i < currentStep ? "✓" : i + 1}
          </Box>
          <Text fontSize="xs" color={i <= currentStep ? "brand.600" : "gray.400"} textAlign="center">
            {step}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
}
