"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "16px",
          }}
        >
          {/* Cart */}
          {cartCount > 0 && (
            <div style={{ position: "relative" }}>
              <button
                aria-label={`Cart (${cartCount} items)`}
                onClick={() => setIsCartOpen(true)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#1A1A1A",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  color: "#FFFFFF",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </button>
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: "#C8A951",
                  color: "#000000",
                  fontSize: "10px",
                  fontWeight: 700,
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            </div>
          )}

          {/* Phone - spinning animation every 4 seconds */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3.4,
            }}
          >
            <Link href={`tel:${CONTACT.phone}`}>
              <button
                aria-label="Call Sultan Restaurant"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  background: "#1A1A1A",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
