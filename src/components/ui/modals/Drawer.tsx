"use client";

import { Drawer as ChakraDrawer, Portal, CloseButton } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  placement?: "start" | "end";
}

export default function Drawer({ isOpen, onClose, title, children, placement = "end" }: DrawerProps) {
  return (
    <ChakraDrawer.Root open={isOpen} onOpenChange={(d) => !d.open && onClose()} placement={placement}>
      <Portal>
        <ChakraDrawer.Backdrop />
        <ChakraDrawer.Positioner>
          <ChakraDrawer.Content>
            {title && (
              <ChakraDrawer.Header>
                <ChakraDrawer.Title>{title}</ChakraDrawer.Title>
              </ChakraDrawer.Header>
            )}
            <ChakraDrawer.Body>{children}</ChakraDrawer.Body>
            <ChakraDrawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </ChakraDrawer.CloseTrigger>
          </ChakraDrawer.Content>
        </ChakraDrawer.Positioner>
      </Portal>
    </ChakraDrawer.Root>
  );
}
