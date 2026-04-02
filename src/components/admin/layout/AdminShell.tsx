"use client";

import { useState, type ReactNode } from "react";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminSidebar as Sidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminTopbar as Topbar } from "@/components/admin/layout/AdminTopbar";
import { adminLayout } from "@/lib/admin-ui";

interface AdminShellProps {
  children: ReactNode;
}

/** Root layout shell: sidebar + topbar + scrollable content area.
 *  Wraps with AdminAuthGuard so individual pages don't need to. */
export function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminAuthGuard>
      <div style={{ display: "flex", height: "100vh", background: adminLayout.content.bg }}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Overlay on mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 39,
            }}
            className="admin-overlay"
          />
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main style={{ flex: 1, overflowY: "auto" }}>
            {children}
          </main>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .admin-overlay { display: none !important; }
        }
      `}</style>
    </AdminAuthGuard>
  );
}
