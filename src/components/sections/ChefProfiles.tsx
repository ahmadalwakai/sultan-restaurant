"use client";

import { motion } from "framer-motion";
import { LuChefHat, LuAward, LuMapPin, LuQuote } from "react-icons/lu";

const chefs = [
  {
    name: "Ahmad Ali",
    role: "Head Chef",
    origin: "Damascus, Syria",
    experience: "25+ years",
    specialty: "Charcoal Grills & Kebabs",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop&q=80",
    quote: "Every dish tells a story of my homeland. I cook with love, just as my grandmother taught me.",
  },
  {
    name: "Fadi Hassan",
    role: "Pastry Chef",
    origin: "Baghdad, Iraq",
    experience: "18 years",
    specialty: "Traditional Desserts",
    image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&h=500&fit=crop&q=80",
    quote: "Sweet endings to every meal - baklava made with patience and passion.",
  },
  {
    name: "Raj Patel",
    role: "Tandoor Master",
    origin: "Punjab, India",
    experience: "20 years",
    specialty: "Indian Classics & Biryanis",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&h=500&fit=crop&q=80",
    quote: "The tandoor is my orchestra, and spices are my notes. Together, we create magic.",
  },
];

/**
 * Chef profiles section - Meet the team
 */
export function ChefProfiles() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "linear-gradient(180deg, #1A0F0A 0%, #2D1810 100%)",
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
            Our Culinary Team
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
            Meet Our Master Chefs
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
            Three generations of culinary excellence from Damascus, Baghdad, and Punjab
          </p>
        </div>

        {/* Chef cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {chefs.map((chef, index) => (
            <motion.div
              key={chef.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(200, 169, 81, 0.1)",
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: "4/5", position: "relative", overflow: "hidden" }}>
                <img
                  src={chef.image}
                  alt={chef.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop&q=80";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(26, 15, 10, 0.9) 0%, transparent 50%)",
                  }}
                />
                
                {/* Name overlay */}
                <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                  <h3 style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: 700 }}>{chef.name}</h3>
                  <p style={{ color: "#C8A951", fontSize: "14px", fontWeight: 600 }}>{chef.role}</p>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
                    <LuMapPin size={16} color="#C8A951" />
                    {chef.origin}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
                    <LuAward size={16} color="#C8A951" />
                    {chef.experience} experience
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
                    <LuChefHat size={16} color="#C8A951" />
                    {chef.specialty}
                  </span>
                </div>

                {/* Quote */}
                <div
                  style={{
                    position: "relative",
                    padding: "16px",
                    background: "rgba(200, 169, 81, 0.05)",
                    borderRadius: "12px",
                    borderLeft: "3px solid #C8A951",
                  }}
                >
                  <LuQuote
                    size={20}
                    color="#C8A951"
                    style={{ position: "absolute", top: "-10px", left: "10px", opacity: 0.5 }}
                  />
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", fontStyle: "italic", lineHeight: 1.6 }}>
                    "{chef.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
