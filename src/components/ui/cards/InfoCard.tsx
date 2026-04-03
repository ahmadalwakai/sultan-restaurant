"use client";

import type { ReactNode } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "default" | "highlight";
}

export function InfoCard({ icon, title, description, variant = "default" }: InfoCardProps) {
  const isHighlight = variant === "highlight";
  return (
    <Box
      rounded="xl"
      p={6}
      bg={isHighlight ? "amber.50" : "white"}
      border="1px"
      borderColor={isHighlight ? "amber.200" : "gray.100"}
      shadow={isHighlight ? undefined : "sm"}
    >
      <Box
        mb={3}
        display="flex"
        h={10}
        w={10}
        alignItems="center"
        justifyContent="center"
        rounded="lg"
        fontSize="lg"
        bg={isHighlight ? "amber.500" : "gray.100"}
        color={isHighlight ? "white" : "gray.600"}
      >
        {icon}
      </Box>
      <Text fontWeight="semibold" color="gray.900">
        {title}
      </Text>
      <Text mt={1} fontSize="sm" color="gray.500">
        {description}
      </Text>
    </Box>
  );
}
