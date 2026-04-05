"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HiCheck, HiXMark } from "react-icons/hi2";
import type { AdminNotification, NotificationType } from "@/types/notification";

interface NotificationListProps {
  notifications: AdminNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const TYPE_COLORS: Record<NotificationType, string> = {
  TABLE_BOOKING: "#2196F3",
  WEDDING_BOOKING: "#E91E63",
  ORDER: "#4CAF50",
  SHISHA_BOOKING: "#9C27B0",
};

const TYPE_ROUTES: Record<NotificationType, string> = {
  TABLE_BOOKING: "/admin/bookings",
  WEDDING_BOOKING: "/admin/bookings",
  ORDER: "/admin/orders",
  SHISHA_BOOKING: "/admin/shisha",
};

const TYPE_LABELS: Record<NotificationType, string> = {
  TABLE_BOOKING: "Table",
  WEDDING_BOOKING: "Wedding",
  ORDER: "Order",
  SHISHA_BOOKING: "Shisha",
};

export function NotificationList({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        // Check if click is on the bell button (parent handles this)
        const target = e.target as HTMLElement;
        if (target.closest("[data-notification-bell]")) {
          return;
        }
        onClose();
      }
    };

    // Delay to prevent immediate close
    const timeout = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleItemClick = useCallback(
    (notification: AdminNotification) => {
      onMarkAsRead(notification.id);
      onClose();
      router.push(`${TYPE_ROUTES[notification.type]}/${notification.id}`);
    },
    [onMarkAsRead, onClose, router]
  );

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      ref={listRef}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        width: "360px",
        maxHeight: "480px",
        background: "#1a1a1a",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
        border: "1px solid #333",
        overflow: "hidden",
        zIndex: 9000,
        animation: "listSlideIn 0.2s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          borderBottom: "1px solid #333",
          background: "#141414",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "600",
            color: "#e5e5e5",
          }}
        >
          Notifications
          {unreadCount > 0 && (
            <span
              style={{
                marginLeft: "8px",
                padding: "2px 8px",
                borderRadius: "12px",
                background: "#C62828",
                color: "white",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {unreadCount}
            </span>
          )}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              title="Mark all as read"
              style={{
                background: "transparent",
                border: "none",
                padding: "4px 8px",
                borderRadius: "6px",
                color: "#B8860B",
                fontSize: "12px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(184, 134, 11, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <HiCheck style={{ width: "14px", height: "14px" }} />
              Mark all
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close notifications"
            style={{
              background: "transparent",
              border: "none",
              padding: "4px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <HiXMark style={{ width: "20px", height: "20px", color: "#999" }} />
          </button>
        </div>
      </div>

      {/* List */}
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#666",
            }}
          >
            <p style={{ margin: 0, fontSize: "14px" }}>No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleItemClick(notification)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "14px 16px",
                background: notification.read ? "transparent" : "rgba(184, 134, 11, 0.05)",
                border: "none",
                borderBottom: "1px solid #2a2a2a",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = notification.read
                  ? "transparent"
                  : "rgba(184, 134, 11, 0.05)";
              }}
            >
              {/* Type indicator dot */}
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: TYPE_COLORS[notification.type],
                  flexShrink: 0,
                  marginTop: "5px",
                }}
              />

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: TYPE_COLORS[notification.type],
                      textTransform: "uppercase",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {TYPE_LABELS[notification.type]}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#666",
                    }}
                  >
                    {formatTimeAgo(notification.createdAt)}
                  </span>
                  {!notification.read && (
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#B8860B",
                        marginLeft: "auto",
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: notification.read ? "400" : "600",
                    color: notification.read ? "#999" : "#e5e5e5",
                    marginBottom: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {notification.customerName}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {notification.message}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <style>{`
        @keyframes listSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
