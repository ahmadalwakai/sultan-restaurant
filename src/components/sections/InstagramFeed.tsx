"use client";

import { motion } from "framer-motion";
import { LuInstagram, LuHeart, LuMessageCircle, LuExternalLink } from "react-icons/lu";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=400&fit=crop&q=80",
    likes: 234,
    comments: 18,
    caption: "Fresh off the grill 🔥 #SultanGrills",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=400&fit=crop&q=80",
    likes: 189,
    comments: 12,
    caption: "Biryani Fridays! 🍚✨",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop&q=80",
    likes: 312,
    comments: 27,
    caption: "Golden baklava perfection 🍯",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop&q=80",
    likes: 445,
    comments: 34,
    caption: "Mixed grill platter feast 🍖",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop&q=80",
    likes: 267,
    comments: 21,
    caption: "Tikka masala love 🧡",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop&q=80",
    likes: 198,
    comments: 15,
    caption: "Cozy evenings at Sultan 🌙",
  },
];

/**
 * Instagram feed integration section
 */
export function InstagramFeed() {
  const instagramHandle = "@sultanrestaurant";
  const instagramUrl = "https://instagram.com/sultanrestaurant";

  return (
    <section
      style={{
        padding: "80px 0",
        background: "linear-gradient(180deg, #1A0F0A 0%, #0D0906 100%)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #E1306C 0%, #833AB4 50%, #F77737 100%)",
              marginBottom: "20px",
            }}
          >
            <LuInstagram size={32} color="#FFF" />
          </motion.div>
          
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Follow Our Journey
          </h2>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#C8A951",
              fontSize: "18px",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {instagramHandle}
            <LuExternalLink size={16} />
          </a>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "8px",
          }}
        >
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              style={{
                position: "relative",
                aspectRatio: "1",
                overflow: "hidden",
                borderRadius: index === 0 ? "12px 0 0 0" : index === 5 ? "0 12px 0 0" : "0",
                cursor: "pointer",
              }}
            >
              <img
                src={post.image}
                alt={post.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
              />
              
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0, 0, 0, 0.7)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#FFF", fontSize: "14px", fontWeight: 600 }}>
                    <LuHeart size={18} fill="#FFF" />
                    {post.likes}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#FFF", fontSize: "14px", fontWeight: 600 }}>
                    <LuMessageCircle size={18} />
                    {post.comments}
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", textAlign: "center", padding: "0 12px" }}>
                  {post.caption}
                </p>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: "32px",
            textAlign: "center",
          }}
        >
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #E1306C 0%, #833AB4 50%, #F77737 100%)",
              color: "#FFF",
              padding: "14px 28px",
              borderRadius: "100px",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(225, 48, 108, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <LuInstagram size={20} />
            Follow Us on Instagram
          </a>
        </motion.div>

        {/* Responsive style for grid */}
        <style jsx global>{`
          @media (max-width: 768px) {
            .instagram-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
          @media (max-width: 480px) {
            .instagram-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
