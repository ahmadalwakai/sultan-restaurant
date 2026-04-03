"use client";

import { motion } from "framer-motion";
import { LuCrown, LuGift, LuPercent, LuStar, LuArrowRight, LuCheck } from "react-icons/lu";

const tiers = [
  { name: "Bronze", points: "0-499", color: "#CD7F32", perks: ["5% off all orders", "Birthday treat"] },
  { name: "Silver", points: "500-999", color: "#C0C0C0", perks: ["10% off all orders", "Free delivery", "Priority booking"] },
  { name: "Gold", points: "1000+", color: "#C8A951", perks: ["15% off all orders", "Free delivery", "VIP table reservations", "Exclusive menu access"] },
];

const benefits = [
  { icon: LuGift, title: "Earn Points", desc: "£1 = 1 point on every order" },
  { icon: LuPercent, title: "Exclusive Discounts", desc: "Up to 15% off as you level up" },
  { icon: LuStar, title: "Special Treats", desc: "Birthday rewards & surprises" },
  { icon: LuCrown, title: "VIP Access", desc: "Early access to new dishes" },
];

/**
 * Loyalty rewards preview section
 */
export function LoyaltyPreview() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #1A0F0A 0%, #2D1810 50%, #1A0F0A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200, 169, 81, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C8A951 0%, #A8893A 100%)",
              marginBottom: "20px",
              boxShadow: "0 0 40px rgba(200, 169, 81, 0.4)",
            }}
          >
            <LuCrown size={36} color="#000" />
          </motion.div>

          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Sultan Rewards Club
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "18px",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Earn points with every order and unlock exclusive rewards
          </p>
        </div>

        {/* Benefits row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            marginBottom: "60px",
          }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{
                textAlign: "center",
                padding: "24px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "16px",
                border: "1px solid rgba(200, 169, 81, 0.1)",
              }}
            >
              <benefit.icon size={32} color="#C8A951" style={{ marginBottom: "12px" }} />
              <h4 style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
                {benefit.title}
              </h4>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tier cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              style={{
                padding: "32px",
                borderRadius: "24px",
                background: `linear-gradient(135deg, ${tier.color}10 0%, rgba(255,255,255,0.02) 100%)`,
                border: `2px solid ${tier.color}40`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Tier badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: tier.color,
                    boxShadow: `0 0 12px ${tier.color}`,
                  }}
                />
                <span style={{ color: tier.color, fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                  {tier.name}
                </span>
              </div>

              <h3 style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: 700, marginBottom: "4px" }}>
                {tier.points}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "20px" }}>
                points
              </p>

              {/* Perks list */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {tier.perks.map((perk) => (
                  <li
                    key={perk}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  >
                    <LuCheck size={16} color={tier.color} />
                    {perk}
                  </li>
                ))}
              </ul>

              {/* Glow effect for Gold */}
              {tier.name === "Gold" && (
                <div
                  style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${tier.color}30 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center" }}
        >
          <button
            style={{
              background: "linear-gradient(135deg, #C8A951 0%, #A8893A 100%)",
              color: "#000",
              border: "none",
              padding: "16px 36px",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 8px 30px rgba(200, 169, 81, 0.3)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(200, 169, 81, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(200, 169, 81, 0.3)";
            }}
          >
            Join Sultan Rewards
            <LuArrowRight size={20} />
          </button>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: "12px" }}>
            Free to join • Start earning today
          </p>
        </motion.div>
      </div>
    </section>
  );
}
