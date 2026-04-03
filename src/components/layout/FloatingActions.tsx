"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CONTACT } from "@/lib/constants/site";

export function FloatingActions() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        {/* Cart */}
        {cartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Cart (${cartCount} items)`}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#1A1A1A",
              color: "white",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
              position: "relative",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                background: "#B8860B",
                color: "white",
                fontSize: 10,
                fontWeight: 700,
                borderRadius: "50%",
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </span>
          </button>
        )}

        {/* Phone */}
        <a
          href={`tel:${CONTACT.phone}`}
          aria-label="Call Sultan Restaurant"
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "#1A1A1A",
            color: "#D4A853",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            textDecoration: "none",
            transition: "box-shadow 0.2s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
