"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HiXMark, HiUser, HiPhone, HiCalendar, HiClock, HiUserGroup, HiCurrencyDollar } from "react-icons/hi2";
import type { AdminNotification, NotificationType } from "@/types/notification";

interface NotificationPopupProps {
  notification: AdminNotification;
  onDismiss: () => void;
}

const TYPE_CONFIG: Record<NotificationType, { color: string; label: string; route: string }> = {
  TABLE_BOOKING: {
    color: "#2196F3", // Blue
    label: "Table Booking",
    route: "/admin/bookings",
  },
  WEDDING_BOOKING: {
    color: "#E91E63", // Pink
    label: "Wedding Booking",
    route: "/admin/bookings",
  },
  ORDER: {
    color: "#4CAF50", // Green
    label: "Order",
    route: "/admin/orders",
  },
  SHISHA_BOOKING: {
    color: "#9C27B0", // Purple
    label: "Shisha Booking",
    route: "/admin/shisha",
  },
};

export function NotificationPopup({ notification, onDismiss }: NotificationPopupProps) {
  const router = useRouter();
  const config = TYPE_CONFIG[notification.type];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);

  const handleViewDetails = useCallback(() => {
    onDismiss();
    router.push(`${config.route}/${notification.id}`);
  }, [onDismiss, router, config.route, notification.id]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onDismiss}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 9998,
          animation: "fadeIn 0.3s ease",
        }}
      />
      
      {/* Popup */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="notification-title"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(420px, 90vw)",
          background: "#1a1a1a",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          animation: "popupSlideIn 0.3s ease",
        }}
      >
        {/* Colored type strip */}
        <div
          style={{
            height: "6px",
            background: config.color,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid #333",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                background: `${config.color}20`,
                color: config.color,
                fontSize: "12px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {config.label}
            </span>
          </div>
          <button
            onClick={onDismiss}
            aria-label="Dismiss notification"
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
            <HiXMark style={{ width: "24px", height: "24px", color: "#999" }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>
          <h2
            id="notification-title"
            style={{
              margin: "0 0 8px 0",
              fontSize: "20px",
              fontWeight: "700",
              color: "#B8860B",
            }}
          >
            {notification.title}
          </h2>
          <p
            style={{
              margin: "0 0 20px 0",
              fontSize: "14px",
              color: "#999",
            }}
          >
            {notification.message}
          </p>

          {/* Details grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {/* Customer Name */}
            <DetailRow icon={HiUser} label="Customer" value={notification.customerName} />

            {/* Phone */}
            {notification.customerPhone && (
              <DetailRow icon={HiPhone} label="Phone" value={notification.customerPhone} />
            )}

            {/* Date */}
            <DetailRow icon={HiCalendar} label="Date" value={notification.date} />

            {/* Time */}
            <DetailRow icon={HiClock} label="Time" value={notification.time} />

            {/* Guests */}
            {notification.guests !== undefined && (
              <DetailRow icon={HiUserGroup} label="Guests" value={String(notification.guests)} />
            )}

            {/* Order Total */}
            {notification.total !== undefined && (
              <DetailRow icon={HiCurrencyDollar} label="Total" value={`£${notification.total.toFixed(2)}`} />
            )}

            {/* Order Number */}
            {notification.orderNumber && (
              <DetailRow icon={HiCalendar} label="Order #" value={notification.orderNumber} />
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            padding: "16px 20px",
            borderTop: "1px solid #333",
            background: "#141414",
          }}
        >
          <button
            onClick={onDismiss}
            style={{
              flex: 1,
              padding: "12px 20px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "transparent",
              color: "#e5e5e5",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "#666";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#444";
            }}
          >
            Dismiss
          </button>
          <button
            onClick={handleViewDetails}
            style={{
              flex: 1,
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#B8860B",
              color: "#000",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#996515";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#B8860B";
            }}
          >
            View Details
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
}

interface DetailRowProps {
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  label: string;
  value: string;
}

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        background: "#242424",
        borderRadius: "8px",
      }}
    >
      <Icon style={{ width: "18px", height: "18px", color: "#B8860B", flexShrink: 0 }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "11px", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </div>
        <div style={{ fontSize: "14px", color: "#e5e5e5", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </div>
      </div>
    </div>
  );
}
