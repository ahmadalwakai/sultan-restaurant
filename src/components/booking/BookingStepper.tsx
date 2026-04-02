"use client";

import { HStack, Box, Text, Circle } from "@chakra-ui/react";

interface BookingStepperProps {
  currentStep: number;
  steps: string[];
}

export default function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <HStack gap={0} w="full" justify="center">
      {steps.map((step, i) => (
        <HStack key={step} gap={2}>
          <Circle
            size="8"
            bg={i <= currentStep ? "brand.500" : "gray.200"}
            color={i <= currentStep ? "white" : "gray.500"}
            fontSize="sm"
            fontWeight="bold"
          >
            {i + 1}
          </Circle>
          <Text
            fontSize="sm"
            fontWeight={i === currentStep ? "semibold" : "normal"}
            color={i <= currentStep ? "brand.600" : "gray.500"}
            display={{ base: "none", md: "block" }}
          >
            {step}
          </Text>
          {i < steps.length - 1 && <Box w="8" h="1px" bg={i < currentStep ? "brand.500" : "gray.200"} />}
        </HStack>
      ))}
    </HStack>
  );
}
