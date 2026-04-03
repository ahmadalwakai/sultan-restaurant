"use client";

import { motion } from "framer-motion";
import { LuFlame, LuClock, LuLeaf, LuSparkles } from "react-icons/lu";

const steps = [
  {
    number: "01",
    title: "Fresh Ingredients",
    description: "Locally sourced vegetables, authentic spices imported from Middle East & India",
    icon: LuLeaf,
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&h=340&fit=crop&q=80",
  },
  {
    number: "02",
    title: "Traditional Prep",
    description: "Marinades prepared daily using family recipes passed down through generations",
    icon: LuClock,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=340&fit=crop&q=80",
  },
  {
    number: "03",
    title: "Charcoal Grilled",
    description: "Cooked over authentic charcoal mangal for that unmistakable smoky flavor",
    icon: LuFlame,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=340&fit=crop&q=80",
  },
  {
    number: "04",
    title: "Served Fresh",
    description: "Plated with care and garnished moments before reaching your table",
    icon: LuSparkles,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=340&fit=crop&q=80",
  },
];

/**
 * How It's Made - cooking process showcase
 */
export function HowItsMade() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "#0D0906",
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
            Behind The Scenes
          </span>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              marginTop: "12px",
              lineHeight: 1.2,
            }}
          >
            How It's Made
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "18px",
              marginTop: "16px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            From farm to table - our commitment to authentic, handcrafted cuisine
          </p>
        </div>

        {/* Process steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(200, 169, 81, 0.1)",
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: "16/10", position: "relative", overflow: "hidden" }}>
                <img
                  src={step.image}
                  alt={step.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13, 9, 6, 1) 0%, rgba(13, 9, 6, 0.3) 50%, transparent 100%)",
                  }}
                />
                
                {/* Step number */}
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(200, 169, 81, 0.9)",
                    color: "#000",
                    fontSize: "12px",
                    fontWeight: 800,
                    padding: "6px 12px",
                    borderRadius: "100px",
                  }}
                >
                  STEP {step.number}
                </span>

                {/* Icon */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #C8A951 0%, #A8893A 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(200, 169, 81, 0.3)",
                  }}
                >
                  <step.icon size={28} color="#000" />
                </motion.div>
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                <h3 style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
                  {step.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>

              {/* Connector line (except last) */}
              {index < steps.length - 1 && (
                <div
                  className="connector-line"
                  style={{
                    display: "none", // Shown via CSS on larger screens
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Video CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: "48px",
            textAlign: "center",
          }}
        >
          <button
            style={{
              background: "transparent",
              border: "2px solid #C8A951",
              color: "#C8A951",
              padding: "14px 32px",
              borderRadius: "100px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C8A951";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C8A951";
            }}
          >
            <LuFlame size={18} />
            Watch Our Kitchen in Action
          </button>
        </motion.div>
      </div>
    </section>
  );
}
