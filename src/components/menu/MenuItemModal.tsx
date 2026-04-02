"use client";

import { Dialog } from "@chakra-ui/react";
import type { MenuItemPublic } from "@/types/menu";
import MenuItemDetail from "./MenuItemDetail";

interface MenuItemModalProps {
  item: MenuItemPublic | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuItemModal({ item, isOpen, onClose }: MenuItemModalProps) {
  if (!item) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(d) => !d.open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="4xl" p={6}>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <MenuItemDetail item={item} />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
