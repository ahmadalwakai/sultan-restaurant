"use client";

import Link from "next/link";
import { brandRadii } from "@/theme/branding";
import { adminLayout } from "@/lib/admin-ui";

interface AdminNavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

export function AdminNavItem({ href, label, icon, isActive, onClick }: AdminNavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
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
      className={isActive ? "" : "admin-nav-link"}
    >
      {icon}
      <span>{label}</span>

      <style>{`
        .admin-nav-link:hover { background: ${adminLayout.sidebar.hoverBg} !important; }
      `}</style>
    </Link>
  );
}
