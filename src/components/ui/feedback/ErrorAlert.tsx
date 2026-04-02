"use client";

import { Box, Text, Flex, CloseButton } from "@chakra-ui/react";

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export default function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <Box bg="red.50" border="1px solid" borderColor="red.200" borderRadius="lg" p={4}>
      <Flex justify="space-between" align="start">
        <Text color="red.700" fontSize="sm">{message}</Text>
        {onClose && <CloseButton size="sm" onClick={onClose} />}
      </Flex>
    </Box>
  );
}
