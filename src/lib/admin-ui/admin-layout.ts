import { brandColors } from "@/theme/branding";

/** Admin layout color & style tokens */
export const adminLayout = {
  /** Sidebar */
  sidebar: {
    bg: "#111827",
    text: "#9CA3AF",
    textActive: "#FFFFFF",
    activeBg: brandColors.gold[600],
    hoverBg: "#1F2937",
    width: "16rem",
    logoArea: "4rem",
  },
  /** Topbar */
  topbar: {
    bg: "#FFFFFF",
    border: "#E5E7EB",
    height: "4rem",
  },
  /** Page content area */
  content: {
    bg: "#F9FAFB",
  },
  /** Primary action button */
  primaryBtn: {
    background: brandColors.gold[600],
    color: "#FFFFFF",
    hoverBg: brandColors.gold[700],
  },
  /** Danger action button */
  dangerBtn: {
    background: brandColors.accent[500],
    color: "#FFFFFF",
    hoverBg: brandColors.accent[600],
  },
  /** Ghost / secondary button */
  ghostBtn: {
    background: "transparent",
    color: "#374151",
    border: "1px solid #D1D5DB",
    hoverBg: "#F3F4F6",
  },
} as const;
