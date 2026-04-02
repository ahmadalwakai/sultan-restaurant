"use client";

import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";

type Props = {
  onToggleSidebar?: () => void;
  adminName?: string;
};

export function AdminHeader({ onToggleSidebar = () => {}, adminName }: Props) {
  return (
    <Box as="header" bg="white" borderBottomWidth="1px" h="16" px={4}>
      <Flex h="full" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap={3}>
          <IconButton
            display={{ base: "flex", lg: "none" }}
            aria-label="Toggle sidebar"
            variant="ghost"
            onClick={onToggleSidebar}
          >
            <HiMenu size={20} />
          </IconButton>
          <Text fontWeight="bold" color="brand.700">Sultan Admin</Text>
        </Flex>
        {adminName && (
          <Text fontSize="sm" color="gray.600">{adminName}</Text>
        )}
      </Flex>
    </Box>
  );
}
