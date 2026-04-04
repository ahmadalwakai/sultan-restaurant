"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCookie, LuX } from "react-icons/lu";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "sultan-cookie-consent";

type ConsentLevel = "all" | "essential" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentLevel>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user already gave consent
    try {
      const stored = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${COOKIE_CONSENT_KEY}=`))
        ?.split("=")[1];

      if (!stored) {
        // Small delay so it doesn't pop up instantly
        const timer = setTimeout(() => setVisible(true), 2000);
        return () => clearTimeout(timer);
      }
      setConsent(stored as ConsentLevel);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleConsent = (level: ConsentLevel) => {
    setConsent(level);
    setVisible(false);

    // Set cookie with 1 year expiry
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${COOKIE_CONSENT_KEY}=${level}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    // If user accepts all, enable analytics
    if (level === "all") {
      console.log("[Cookies] Full consent granted");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9990,
            padding: "16px",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              background: "#1A0F0A",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              padding: "20px 24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", flex: 1 }}>
                <div style={{ flexShrink: 0, marginTop: "2px" }}>
                  <LuCookie size={20} color="#C8A951" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    We use cookies
                  </span>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "13px",
                      lineHeight: 1.5,
                    }}
                  >
                    We use essential cookies for the site to work. We also use analytics cookies to
                    understand how you use our site so we can improve it.{" "}
                    <Link
                      href="/cookies"
                      style={{
                        color: "#C8A951",
                        textDecoration: "none",
                      }}
                    >
                      Learn more
                    </Link>
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => handleConsent("essential")}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "100px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    background: "transparent",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Essential Only
                </button>
                <button
                  onClick={() => handleConsent("all")}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "100px",
                    border: "none",
                    background: "#C8A951",
                    color: "#1A0F0A",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#E8D48A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#C8A951";
                  }}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
