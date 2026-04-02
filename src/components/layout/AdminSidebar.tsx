"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Logo } from "@/components/shared/Logo";
import { ADMIN_NAV } from "@/lib/constants/navigation";
import {
  HiOutlineViewGrid, HiOutlineShoppingCart, HiOutlineBookOpen,
  HiOutlineTag, HiOutlineStar, HiOutlinePhotograph,
  HiOutlineMail, HiOutlineCog, HiOutlineUsers, HiOutlineChatAlt,
  HiOutlineGift, HiOutlineTicket, HiOutlineGlobe, HiOutlineCollection
} from "react-icons/hi";

const iconMap: Record<string, React.ElementType> = {
  dashboard: HiOutlineViewGrid,
  orders: HiOutlineShoppingCart,
  menu: HiOutlineBookOpen,
  categories: HiOutlineCollection,
  bookings: HiOutlineBookOpen,
  offers: HiOutlineGift,
  coupons: HiOutlineTicket,
  reviews: HiOutlineStar,
  gallery: HiOutlinePhotograph,
  messages: HiOutlineChatAlt,
  customers: HiOutlineUsers,
  email: HiOutlineMail,
  seo: HiOutlineGlobe,
  settings: HiOutlineCog,
};

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export function AdminSidebar({ isOpen = true, onClose = () => {} }: Props) {
  const pathname = usePathname();

  return (
    <Box
      as="nav"
      position={{ base: "fixed", lg: "sticky" }}
      top={0}
      left={0}
      w="64"
      h="100vh"
      bg="gray.900"
      color="gray.300"
      overflowY="auto"
      transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)", lg: "translateX(0)" }}
      transition="transform 0.2s"
      zIndex={40}
      pt={4}
    >
      <Box px={4} mb={6}>
        <Logo size="sm" />
      </Box>

      <Flex direction="column" gap={1}>
        {ADMIN_NAV.map((item) => {
          const Icon = iconMap[item.icon] || HiOutlineViewGrid;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <Flex
                px={4}
                py={2}
                alignItems="center"
                gap={3}
                bg={isActive ? "brand.600" : "transparent"}
                color={isActive ? "white" : "gray.300"}
                _hover={{ bg: isActive ? "brand.600" : "gray.800" }}
                borderRadius="md"
                mx={2}
              >
                <Icon size={18} />
                <Text fontSize="sm">{item.label}</Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
