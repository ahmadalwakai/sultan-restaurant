"use client";

import { Box, VStack, Heading, Button, Text } from "@chakra-ui/react";
import { Drawer } from "@chakra-ui/react";

interface MobileBookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MobileBookingSheet({ isOpen, onClose, children }: MobileBookingSheetProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(d) => !d.open && onClose()} placement="bottom">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content borderTopRadius="2xl" maxH="90vh">
          <Drawer.Header borderBottomWidth="1px">
            <Heading size="md" fontFamily="var(--font-heading)">Book a Table</Heading>
            <Drawer.CloseTrigger />
          </Drawer.Header>
          <Drawer.Body overflowY="auto" py={4}>
            {children}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
