"use client";

import { Drawer, Portal, CloseButton, VStack, Text } from "@chakra-ui/react";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

interface MobileDrawerNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileDrawerNav({ isOpen, onClose, links }: MobileDrawerNavProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(d) => !d.open && onClose()} placement="start">
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack align="stretch" gap={1}>
                {links.map((link) => (
                  <Link key={link.href} href={link.href} onClick={onClose}>
                    <Text py={3} px={4} borderRadius="md" _hover={{ bg: "gray.50" }} fontWeight="medium">
                      {link.label}
                    </Text>
                  </Link>
                ))}
              </VStack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
