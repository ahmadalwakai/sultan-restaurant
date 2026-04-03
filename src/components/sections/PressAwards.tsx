"use client";

import { motion } from "framer-motion";
import { LuAward, LuNewspaper, LuStar, LuTrophy, LuQuote } from "react-icons/lu";

const awards = [
  {
    icon: LuTrophy,
    title: "Best Middle Eastern 2024",
    source: "UK Restaurant Awards",
    color: "#C8A951",
  },
  {
    icon: LuAward,
    title: "Excellence in Cuisine",
    source: "Food Critics Guild",
    color: "#C8A951",
  },
  {
    icon: LuStar,
    title: "5-Star Hygiene Rating",
    source: "Food Standards Agency",
    color: "#4CAF50",
  },
];

const pressQuotes = [
  {
    quote: "The best shawarma outside of Damascus. An absolute must-visit.",
    source: "The Guardian",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/The_Guardian.svg",
  },
  {
    quote: "Sultan brings authentic Middle Eastern flavors to the heart of the UK.",
    source: "Time Out London",
    logo: null,
  },
  {
    quote: "A culinary journey that transports you straight to the spice markets of Istanbul.",
    source: "Evening Standard",
    logo: null,
  },
];

const featuredIn = [
  "BBC Good Food",
  "The Telegraph",
  "Olive Magazine",
  "Delicious",
  "Great British Menu",
];

/**
 * Press & Awards section
 */
export function PressAwards() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "#0D0906",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span
            style={{
              color: "#C8A951",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            Recognition
          </span>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              marginTop: "12px",
            }}
          >
            Awards & Press
          </h2>
        </div>

        {/* Awards row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "32px",
            marginBottom: "60px",
          }}
        >
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.05 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "32px 40px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: "24px",
                border: `1px solid ${award.color}30`,
                minWidth: "220px",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${award.color}20 0%, transparent 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  border: `2px solid ${award.color}50`,
                }}
              >
                <award.icon size={28} color={award.color} />
              </motion.div>
              <h4 style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>
                {award.title}
              </h4>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                {award.source}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Press quotes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "60px",
          }}
        >
          {pressQuotes.map((item, index) => (
            <motion.div
              key={item.source}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: "32px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "20px",
                border: "1px solid rgba(200, 169, 81, 0.1)",
                position: "relative",
              }}
            >
              <LuQuote
                size={32}
                color="#C8A951"
                style={{ opacity: 0.3, marginBottom: "16px" }}
              />
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "17px",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "20px",
                }}
              >
                "{item.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LuNewspaper size={20} color="#C8A951" />
                </div>
                <span style={{ color: "#C8A951", fontSize: "14px", fontWeight: 600 }}>
                  {item.source}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured In strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            padding: "32px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "20px",
            }}
          >
            As Featured In
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            {featuredIn.map((name) => (
              <span
                key={name}
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "16px",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C8A951")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
