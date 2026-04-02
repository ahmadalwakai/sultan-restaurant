"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Simple breadcrumb derived from the URL path */
export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(1); // remove "admin" prefix

  if (segments.length <= 1) return null;

  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "1rem", fontSize: "0.8125rem", color: "#9CA3AF" }}>
      <Link href="/admin/dashboard" style={{ color: "#9CA3AF", textDecoration: "none" }}>Admin</Link>
      {segments.map((seg, i) => {
        const href = "/admin/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
        return (
          <span key={href} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <span style={{ color: "#D1D5DB" }}>/</span>
            {isLast ? (
              <span style={{ color: "#374151", fontWeight: 500 }}>{label}</span>
            ) : (
              <Link href={href} style={{ color: "#9CA3AF", textDecoration: "none" }}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
