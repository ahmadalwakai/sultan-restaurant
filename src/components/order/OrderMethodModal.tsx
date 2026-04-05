"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuShoppingBag, LuTruck, LuExternalLink, LuArrowLeft, LuCircleAlert } from "react-icons/lu";
import Link from "next/link";
import { DELIVERY_PARTNERS } from "@/content/delivery-partners";
import { useCartStore } from "@/lib/cart";
import { useOrderAvailability } from "@/hooks/api";

interface OrderMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderMethodModal({ isOpen, onClose }: OrderMethodModalProps) {
  const [step, setStep] = useState<"choose" | "delivery">("choose");
  const items = useCartStore((s) => s.items);
  const hasItems = items.length > 0;
  const { data: availability, isLoading } = useOrderAvailability();

  const pickupEnabled = availability?.pickupEnabled ?? true;
  const deliveryEnabled = availability?.deliveryEnabled ?? true;
  const pickupMessage = availability?.pickupPauseMessage || "Pickup is temporarily unavailable";
  const deliveryMessage = availability?.deliveryPauseMessage || "Delivery is temporarily unavailable";
  const bothPaused = !pickupEnabled && !deliveryEnabled;

  const handleClose = () => {
    setStep("choose");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "16px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "#1A0F0A",
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            maxWidth: "480px",
            width: "100%",
            overflow: "hidden",
            pointerEvents: "auto",
            border: "1px solid rgba(200, 169, 81, 0.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #0D0906 0%, #1A0F0A 100%)",
              padding: "24px",
              position: "relative",
              borderBottom: "1px solid rgba(200, 169, 81, 0.1)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {step === "choose" ? "How would you like to order?" : "Choose Delivery Partner"}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              >
                {step === "choose" ? "Pick your preferred option" : "We deliver through these partners"}
              </p>
            </div>
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LuX size={20} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "24px" }}>
            {/* Loading State */}
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "32px", color: "rgba(255,255,255,0.5)" }}>
                Loading...
              </div>
            ) : bothPaused ? (
              /* Both Services Paused */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: "center",
                  padding: "32px 16px",
                  background: "rgba(220, 38, 38, 0.1)",
                  borderRadius: "16px",
                  border: "2px solid rgba(220, 38, 38, 0.3)",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    background: "rgba(220, 38, 38, 0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    color: "#EF4444",
                  }}
                >
                  <LuCircleAlert size={28} />
                </div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "18px",
                    fontWeight: 700,
                    margin: "0 0 12px",
                  }}
                >
                  Ordering Temporarily Paused
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  We are very busy at the moment. Please try again shortly.
                </p>
              </motion.div>
            ) : (
            <AnimatePresence mode="wait">
              {step === "choose" ? (
                <motion.div
                  key="choose"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                >
                  {/* Pickup Option */}
                  {pickupEnabled ? (
                  <Link href={hasItems ? "/pickup" : "/menu"} onClick={handleClose} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        borderRadius: "16px",
                        border: "2px solid transparent",
                        padding: "24px 16px",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        height: "100%",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#C8A951";
                        e.currentTarget.style.background = "rgba(200, 169, 81, 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      }}
                    >
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          background: "#C8A951",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 12px",
                          color: "#0D0906",
                        }}
                      >
                        <LuShoppingBag size={24} />
                      </div>
                      <h3
                        style={{
                          color: "#FFFFFF",
                          fontSize: "16px",
                          fontWeight: 700,
                          margin: "0 0 8px",
                        }}
                      >
                        Pickup
                      </h3>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "12px",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        Order online & collect from our restaurant in ~30 min
                      </p>
                    </div>
                  </Link>
                  ) : (
                  /* Pickup Disabled */
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "16px",
                      border: "2px solid rgba(220, 38, 38, 0.3)",
                      padding: "24px 16px",
                      textAlign: "center",
                      cursor: "not-allowed",
                      opacity: 0.6,
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        background: "rgba(220, 38, 38, 0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                        color: "#EF4444",
                      }}
                    >
                      <LuShoppingBag size={24} />
                    </div>
                    <h3
                      style={{
                        color: "#EF4444",
                        fontSize: "16px",
                        fontWeight: 700,
                        margin: "0 0 8px",
                      }}
                    >
                      Pickup Paused
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "11px",
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {pickupMessage}
                    </p>
                  </div>
                  )}

                  {/* Delivery Option */}
                  {deliveryEnabled ? (
                  <div
                    onClick={() => setStep("delivery")}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "16px",
                      border: "2px solid transparent",
                      padding: "24px 16px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      height: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#C8A951";
                      e.currentTarget.style.background = "rgba(200, 169, 81, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        background: "#C8A951",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                        color: "#0D0906",
                      }}
                    >
                      <LuTruck size={24} />
                    </div>
                    <h3
                      style={{
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontWeight: 700,
                        margin: "0 0 8px",
                      }}
                    >
                      Delivery
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12px",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      Get it delivered to your door via our partners
                    </p>
                  </div>
                  ) : (
                  /* Delivery Disabled */
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "16px",
                      border: "2px solid rgba(220, 38, 38, 0.3)",
                      padding: "24px 16px",
                      textAlign: "center",
                      cursor: "not-allowed",
                      opacity: 0.6,
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        background: "rgba(220, 38, 38, 0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                        color: "#EF4444",
                      }}
                    >
                      <LuTruck size={24} />
                    </div>
                    <h3
                      style={{
                        color: "#EF4444",
                        fontSize: "16px",
                        fontWeight: 700,
                        margin: "0 0 8px",
                      }}
                    >
                      Delivery Paused
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "11px",
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {deliveryMessage}
                    </p>
                  </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  {DELIVERY_PARTNERS.map((partner) => (
                    <a
                      key={partner.name}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        textDecoration: "none",
                        background: "rgba(255,255,255,0.02)",
                        borderRadius: "12px",
                        border: "2px solid transparent",
                        padding: "16px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = partner.color;
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "10px",
                              background: partner.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#FFFFFF",
                              fontWeight: 700,
                              fontSize: "16px",
                              flexShrink: 0,
                              overflow: "hidden",
                              letterSpacing: "-1px",
                            }}
                          >
                            {partner.name === "Uber Eats" ? "UE" : partner.name === "Just Eat" ? "JE" : "D"}
                          </div>
                          <div>
                            <h4
                              style={{
                                color: "#FFFFFF",
                                fontSize: "14px",
                                fontWeight: 700,
                                margin: 0,
                              }}
                            >
                              {partner.name}
                            </h4>
                            {"promoCode" in partner && partner.promoCode && (
                              <p
                                style={{
                                  color: "#4CAF50",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  margin: "2px 0 0",
                                }}
                              >
                                Code: {partner.promoCode}
                              </p>
                            )}
                            {"promoText" in partner && partner.promoText && (
                              <p
                                style={{
                                  color: "rgba(255,255,255,0.5)",
                                  fontSize: "11px",
                                  margin: "2px 0 0",
                                }}
                              >
                                {partner.promoText}
                              </p>
                            )}
                          </div>
                        </div>
                        <LuExternalLink size={16} color="#C8A951" />
                      </div>
                    </a>
                  ))}

                  <button
                    onClick={() => setStep("choose")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "13px",
                      cursor: "pointer",
                      padding: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      marginTop: "8px",
                    }}
                  >
                    <LuArrowLeft size={14} />
                    Back to options
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
