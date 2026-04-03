"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuClock, LuMapPin, LuTruck, LuChevronDown } from "react-icons/lu";

const DELIVERY_ZONES = [
  { area: "G40 (Gallowgate area)", time: "20-30 min", fee: "£1.99" },
  { area: "G31, G32 (Dennistoun, Tollcross)", time: "25-35 min", fee: "£2.49" },
  { area: "G1, G2 (City Centre)", time: "30-40 min", fee: "£2.99" },
  { area: "G4, G21 (Springburn)", time: "30-40 min", fee: "£2.99" },
  { area: "G33 (Stepps, Easterhouse)", time: "35-45 min", fee: "£3.49" },
  { area: "G69 (Baillieston)", time: "35-45 min", fee: "£3.49" },
];

/**
 * Estimated delivery time widget
 */
export function DeliveryTimeEstimate() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isKitchenOpen, setIsKitchenOpen] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours}:${minutes.toString().padStart(2, "0")}`);
      
      // Kitchen open 12:00 - 21:00
      setIsKitchenOpen(hours >= 12 && hours < 21);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          background: isKitchenOpen ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
          border: `1px solid ${isKitchenOpen ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
          borderRadius: "12px",
          cursor: "pointer",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: isKitchenOpen ? "#22C55E" : "#EF4444",
            animation: isKitchenOpen ? "pulse 2s infinite" : "none",
          }}
        />
        <span style={{ fontSize: "13px", fontWeight: 600 }}>
          {isKitchenOpen ? "Delivering Now" : "Kitchen Closed"}
        </span>
        <LuChevronDown
          size={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s",
          }}
        />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "8px",
            background: "#1A0F0A",
            border: "1px solid rgba(200, 169, 81, 0.2)",
            borderRadius: "16px",
            padding: "16px",
            minWidth: "300px",
            zIndex: 100,
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          }}
        >
          <h4 style={{ color: "#C8A951", fontSize: "14px", fontWeight: 700, marginBottom: "12px" }}>
            Estimated Delivery Times
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {DELIVERY_ZONES.map((zone) => (
              <div
                key={zone.area}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <p style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 500 }}>{zone.area}</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{zone.fee} delivery</p>
                </div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#22C55E",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  <LuClock size={14} />
                  {zone.time}
                </span>
              </div>
            ))}
          </div>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", marginTop: "12px", textAlign: "center" }}>
            Times may vary during peak hours
          </p>
        </motion.div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

/**
 * Simple delivery banner
 */
export function DeliveryBanner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "12px 24px",
        background: "linear-gradient(90deg, rgba(200, 169, 81, 0.1), rgba(200, 169, 81, 0.05), rgba(200, 169, 81, 0.1))",
        borderBottom: "1px solid rgba(200, 169, 81, 0.1)",
        flexWrap: "wrap",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#FFFFFF", fontSize: "13px" }}>
        <LuTruck size={16} color="#C8A951" />
        Free delivery over £25
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#FFFFFF", fontSize: "13px" }}>
        <LuClock size={16} color="#C8A951" />
        20-40 min delivery
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#FFFFFF", fontSize: "13px" }}>
        <LuMapPin size={16} color="#C8A951" />
        10 mile radius
      </span>
    </div>
  );
}
