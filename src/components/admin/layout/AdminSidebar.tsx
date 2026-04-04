"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { ADMIN_NAV } from "@/lib/constants/navigation";
import { adminLayout, adminSpacing } from "@/lib/admin-ui";
import { brandRadii } from "@/theme/branding";
import {
  HiOutlineViewGrid, HiOutlineShoppingCart, HiOutlineBookOpen,
  HiOutlineTag, HiOutlineStar, HiOutlinePhotograph,
  HiOutlineMail, HiOutlineCog, HiOutlineUsers, HiOutlineChatAlt,
  HiOutlineGift, HiOutlineTicket, HiOutlineGlobe, HiOutlineCollection,
  HiOutlineCalendar, HiOutlineHeart, HiOutlineSparkles,
} from "react-icons/hi";
import { LuWind } from "react-icons/lu";

const iconMap: Record<string, React.ElementType> = {
  dashboard: HiOutlineViewGrid,
  orders: HiOutlineShoppingCart,
  menu: HiOutlineBookOpen,
  categories: HiOutlineCollection,
  tables: HiOutlineCalendar,
  bookings: HiOutlineBookOpen,
  wedding: HiOutlineHeart,
  shisha: LuWind,
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
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = true, onClose }: Props) {
  const pathname = usePathname();

  return (
    <nav
      style={{
        width: adminLayout.sidebar.width,
        minWidth: adminLayout.sidebar.width,
        height: "100vh",
        background: adminLayout.sidebar.bg,
        color: adminLayout.sidebar.text,
        overflowY: "auto",
        paddingTop: "1rem",
        transition: "transform 0.2s ease",
        zIndex: 40,
      }}
      className={`admin-sidebar ${isOpen ? "admin-sidebar-open" : ""}`}
    >
      <div style={{ padding: "0 1rem", marginBottom: "1.5rem" }}>
        <Logo size="sm" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
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
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.5rem 1rem",
                margin: "0 0.5rem",
                borderRadius: brandRadii.md,
                background: isActive ? adminLayout.sidebar.activeBg : "transparent",
                color: isActive ? adminLayout.sidebar.textActive : adminLayout.sidebar.text,
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              className={isActive ? "" : "admin-nav-item"}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <style>{`
        .admin-nav-item:hover {
          background: ${adminLayout.sidebar.hoverBg} !important;
        }
        /* Desktop: always visible, sticky */
        @media (min-width: 1024px) {
          .admin-sidebar {
            position: sticky !important;
            top: 0;
            transform: translateX(0) !important;
          }
        }
        /* Mobile: fixed, off-canvas */
        @media (max-width: 1023px) {
          .admin-sidebar {
            position: fixed !important;
            top: 0;
            left: 0;
            transform: translateX(-100%);
          }
          .admin-sidebar.admin-sidebar-open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </nav>
  );
}
