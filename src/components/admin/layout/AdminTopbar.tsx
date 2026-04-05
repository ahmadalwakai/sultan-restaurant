"use client";

import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { adminLayout } from "@/lib/admin-ui";
import { brandColors, brandTypography } from "@/theme/branding";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import { NotificationBell, NotificationList, NotificationPopup } from "@/components/admin/notifications";

interface AdminTopbarProps {
  onToggleSidebar?: () => void;
  adminName?: string;
}

export function AdminTopbar({ onToggleSidebar, adminName }: AdminTopbarProps) {
  const [showList, setShowList] = useState(false);
  const {
    notifications,
    unreadCount,
    latestNotification,
    showPopup,
    dismissPopup,
    markAsRead,
    markAllAsRead,
  } = useAdminNotifications();

  const toggleList = () => setShowList((prev) => !prev);
  const closeList = () => setShowList(false);

  return (
    <>
      <header
        style={{
          height: adminLayout.topbar.height,
          background: adminLayout.topbar.bg,
          borderBottom: `1px solid ${adminLayout.topbar.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="admin-hamburger"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6B7280",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HiMenu size={22} />
          </button>
          <span
            style={{
              fontWeight: brandTypography.weights.bold,
              color: brandColors.gold[700],
              fontSize: "0.9375rem",
            }}
          >
            Sultan Admin
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Notification Bell with Dropdown */}
          <div style={{ position: "relative" }} data-notification-bell>
            <NotificationBell
              unreadCount={unreadCount}
              onClick={toggleList}
              isActive={showList}
            />
            <NotificationList
              notifications={notifications}
              isOpen={showList}
              onClose={closeList}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
            />
          </div>

          {adminName && (
            <span style={{ fontSize: "0.875rem", color: "#6B7280" }}>{adminName}</span>
          )}
        </div>

        <style>{`
          @media (min-width: 1024px) {
            .admin-hamburger { display: none !important; }
          }
        `}</style>
      </header>

      {/* Popup Modal for new notifications */}
      {showPopup && latestNotification && (
        <NotificationPopup
          notification={latestNotification}
          onDismiss={dismissPopup}
        />
      )}
    </>
  );
}
