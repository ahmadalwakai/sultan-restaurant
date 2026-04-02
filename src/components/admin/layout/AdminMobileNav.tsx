"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV } from "@/lib/constants/navigation";
import { adminLayout } from "@/lib/admin-ui";
import { brandRadii } from "@/theme/branding";
import {
  HiOutlineViewGrid, HiOutlineShoppingCart, HiOutlineBookOpen,
  HiOutlineTag, HiOutlineStar, HiOutlinePhotograph,
  HiOutlineMail, HiOutlineCog, HiOutlineUsers, HiOutlineChatAlt,
  HiOutlineGift, HiOutlineTicket, HiOutlineGlobe, HiOutlineCollection,
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/** Bottom-sheet style mobile nav */
export function AdminMobileNav({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxHeight: "70vh",
          overflowY: "auto",
          background: adminLayout.sidebar.bg,
          borderRadius: "1rem 1rem 0 0",
          padding: "1rem 0.5rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.25rem",
          }}
        >
          {ADMIN_NAV.map((item) => {
            const Icon = iconMap[item.icon] || HiOutlineViewGrid;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.75rem 0.5rem",
                  borderRadius: brandRadii.lg,
                  background: isActive ? adminLayout.sidebar.activeBg : "transparent",
                  color: isActive ? "#FFFFFF" : adminLayout.sidebar.text,
                  fontSize: "0.6875rem",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
