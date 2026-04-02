"use client";

import Link from "next/link";
import { brandColors, brandRadii } from "@/theme/branding";
import { adminCardStyles, adminLayout } from "@/lib/admin-ui";

interface AdminActionCardProps {
  icon: string;
  title: string;
  description?: string;
  href: string;
}

/** Quick-action card linking to an admin page */
export function AdminActionCard({ icon, title, description, href }: AdminActionCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{ ...adminCardStyles.surface, padding: "1rem", cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s" }} className="admin-action-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: brandRadii.lg,
              background: brandColors.gold[50],
              fontSize: "1.125rem",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
          <div>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{title}</p>
            {description && <p style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.125rem" }}>{description}</p>}
          </div>
        </div>

        <style>{`
          .admin-action-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    </Link>
  );
}
