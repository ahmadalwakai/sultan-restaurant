"use client";

import { HStack, Box, Text, Circle } from "@chakra-ui/react";

const steps = ["Details", "Payment", "Confirm"];

interface CheckoutStepperProps {
  currentStep: number;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <HStack justify="center" gap={0} mb={8}>
      {steps.map((step, i) => (
        <HStack key={step} gap={2}>
          <Circle size="8" bg={i <= currentStep ? "brand.500" : "gray.200"} color={i <= currentStep ? "white" : "gray.500"} fontSize="sm" fontWeight="bold">
            {i + 1}
          </Circle>
          <Text fontSize="sm" fontWeight={i === currentStep ? "semibold" : "normal"} color={i <= currentStep ? "brand.600" : "gray.500"}>
            {step}
          </Text>
          {i < steps.length - 1 && <Box w={8} h="1px" bg={i < currentStep ? "brand.500" : "gray.200"} />}
        </HStack>
      ))}
    </HStack>
  );
}
