"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuShoppingBag, LuClock, LuMapPin } from "react-icons/lu";
import Link from "next/link";

/**
 * Sticky order button for mobile devices
 * Shows at bottom of screen when scrolled past hero
 */
export function StickyMobileOrder() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Show after scrolling past hero
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to top, #1A0F0A 0%, rgba(26, 15, 10, 0.98) 100%)",
            borderTop: "1px solid rgba(200, 169, 81, 0.3)",
            padding: "12px 16px",
            paddingBottom: "max(12px, env(safe-area-inset-bottom))",
            zIndex: 999,
            display: "flex",
            gap: "12px",
          }}
        >
          <Link href="/menu" style={{ flex: 1, textDecoration: "none" }}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #C8A951 0%, #E8D48A 50%, #C8A951 100%)",
                color: "#1A0F0A",
                padding: "14px 24px",
                borderRadius: "12px",
                border: "none",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(200, 169, 81, 0.3)",
              }}
            >
              <LuShoppingBag size={20} />
              Order Now
            </motion.button>
          </Link>
          <Link href="/book" style={{ textDecoration: "none" }}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                color: "#C8A951",
                padding: "14px 20px",
                borderRadius: "12px",
                border: "1px solid #C8A951",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <LuClock size={20} />
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
