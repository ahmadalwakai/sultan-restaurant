"use client";

import { useState } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

interface AdminDeleteConfirmProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  trigger: (open: () => void) => React.ReactNode;
}

export function AdminDeleteConfirm({
  title = "Delete Item",
  message = "Are you sure? This action cannot be undone.",
  onConfirm,
  trigger,
}: AdminDeleteConfirmProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {trigger(() => setIsOpen(true))}
      {isOpen && (
        <Flex position="fixed" inset={0} zIndex={50} align="center" justify="center" bg="blackAlpha.500">
          <Box bg="white" borderRadius="lg" p={6} maxW="sm" w="full" mx={4}>
            <Heading as="h3" fontSize="lg" fontWeight={600} color="gray.900">{title}</Heading>
            <Text mt={2} fontSize="sm" color="gray.500">{message}</Text>
            <Flex mt={4} justify="flex-end" gap={3}>
              <Button onClick={() => setIsOpen(false)} size="sm" variant="outline">
                Cancel
              </Button>
              <Button
                onClick={() => { onConfirm(); setIsOpen(false); }}
                size="sm"
                bg="red.600"
                color="white"
                _hover={{ bg: "red.700" }}
              >
                Delete
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}
