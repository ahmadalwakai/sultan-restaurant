"use client";

import { Heading, VStack, Button, Text, HStack, Box } from "@chakra-ui/react";
import { Drawer } from "@chakra-ui/react";

interface MobilePaymentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMethod: (method: "stripe" | "cash") => void;
}

export default function MobilePaymentSheet({ isOpen, onClose, onSelectMethod }: MobilePaymentSheetProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(d) => !d.open && onClose()} placement="bottom">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content borderTopRadius="2xl">
          <Drawer.Header borderBottomWidth="1px">
            <Heading size="md">Payment Method</Heading>
            <Drawer.CloseTrigger />
          </Drawer.Header>
          <Drawer.Body py={4}>
            <VStack gap={3}>
              <Button
                w="full"
                h="auto"
                py={4}
                variant="outline"
                onClick={() => onSelectMethod("stripe")}
              >
                <HStack w="full" justify="start" gap={3}>
                  <Text fontSize="2xl">💳</Text>
                  <Box textAlign="left">
                    <Text fontWeight="semibold">Card Payment</Text>
                    <Text fontSize="sm" color="gray.500">Pay securely with Stripe</Text>
                  </Box>
                </HStack>
              </Button>
              <Button
                w="full"
                h="auto"
                py={4}
                variant="outline"
                onClick={() => onSelectMethod("cash")}
              >
                <HStack w="full" justify="start" gap={3}>
                  <Text fontSize="2xl">💵</Text>
                  <Box textAlign="left">
                    <Text fontWeight="semibold">Cash on Pickup</Text>
                    <Text fontSize="sm" color="gray.500">Pay when you collect</Text>
                  </Box>
                </HStack>
              </Button>
            </VStack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
