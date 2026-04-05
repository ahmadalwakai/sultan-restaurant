"use client";

import { HiBell } from "react-icons/hi2";

interface NotificationBellProps {
  unreadCount: number;
  onClick: () => void;
  isActive: boolean;
}

export function NotificationBell({ unreadCount, onClick, isActive }: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      style={{
        position: "relative",
        background: isActive ? "rgba(184, 134, 11, 0.2)" : "transparent",
        border: "none",
        borderRadius: "8px",
        padding: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "rgba(184, 134, 11, 0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      <HiBell
        style={{
          width: "24px",
          height: "24px",
          color: isActive ? "#B8860B" : "#4B5563",
          transition: "color 0.2s ease",
        }}
      />
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            minWidth: "18px",
            height: "18px",
            padding: "0 5px",
            borderRadius: "9px",
            background: "#C62828",
            color: "white",
            fontSize: "11px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: unreadCount > 0 ? "bellPulse 2s ease-in-out infinite" : "none",
          }}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
      <style>{`
        @keyframes bellPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(198, 40, 40, 0.4);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 8px rgba(198, 40, 40, 0);
          }
        }
      `}</style>
    </button>
  );
}
