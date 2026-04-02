"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export default function StatCard({ label, value, icon, change, changeType = "neutral" }: StatCardProps) {
  const changeColor = changeType === "positive" ? "green.500" : changeType === "negative" ? "red.500" : "gray.500";

  return (
    <Box bg="white" p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor="gray.100">
      <Flex justify="space-between" align="start">
        <Box>
          <Text fontSize="sm" color="gray.500">{label}</Text>
          <Text fontSize="2xl" fontWeight="bold" mt={1}>{value}</Text>
          {change && <Text fontSize="sm" color={changeColor} mt={1}>{change}</Text>}
        </Box>
        {icon && <Box color="brand.500" fontSize="2xl">{icon}</Box>}
      </Flex>
    </Box>
  );
}
