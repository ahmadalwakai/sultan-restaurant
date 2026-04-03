"use client";

import { ReactNode } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";

interface Tab { key: string; label: string }

interface SettingsTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  children: ReactNode;
}

export function SettingsTabs({ tabs, activeTab, onTabChange, children }: SettingsTabsProps) {
  return (
    <Box display="flex" gap={6}>
      <VStack w="48" gap={1} flexShrink={0}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            w="full"
            textAlign="left"
            px={3}
            py={2}
            borderRadius="lg"
            fontSize="sm"
            transition="colors"
            bg={activeTab === tab.key ? "amber.50" : undefined}
            color={activeTab === tab.key ? "amber.700" : "gray.600"}
            fontWeight={activeTab === tab.key ? "medium" : undefined}
            _hover={{ bg: activeTab === tab.key ? "amber.50" : "gray.50" }}
            variant="ghost"
          >
            {tab.label}
          </Button>
        ))}
      </VStack>
      <Box flex={1} minW={0}>{children}</Box>
    </Box>
  );
}
