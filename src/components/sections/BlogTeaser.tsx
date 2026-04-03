"use client";

import { motion } from "framer-motion";
import { LuClock, LuArrowRight, LuBookOpen, LuChefHat, LuMapPin } from "react-icons/lu";

const blogPosts = [
  {
    id: 1,
    category: "Recipes",
    categoryIcon: LuChefHat,
    title: "How to Make Perfect Hummus at Home",
    excerpt: "Our head chef Ahmad shares his secret family recipe for silky-smooth hummus.",
    image: "https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?w=600&h=400&fit=crop&q=80",
    readTime: "5 min read",
    date: "Dec 15, 2024",
  },
  {
    id: 2,
    category: "Culture",
    categoryIcon: LuMapPin,
    title: "A Journey Through Damascus Street Food",
    excerpt: "Exploring the vibrant food markets that inspired our menu.",
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600&h=400&fit=crop&q=80",
    readTime: "8 min read",
    date: "Dec 10, 2024",
  },
  {
    id: 3,
    category: "Tips",
    categoryIcon: LuBookOpen,
    title: "The Art of Spice Blending",
    excerpt: "Master the essential spice combinations of Middle Eastern cuisine.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop&q=80",
    readTime: "6 min read",
    date: "Dec 5, 2024",
  },
];

/**
 * Blog teaser section with recipe/story cards
 */
export function BlogTeaser() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "linear-gradient(180deg, #1A0F0A 0%, #0D0906 100%)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <span
              style={{
                color: "#C8A951",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "3px",
              }}
            >
              From Our Kitchen
            </span>
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                marginTop: "8px",
              }}
            >
              Stories & Recipes
            </h2>
          </div>
          
          <a
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#C8A951",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              padding: "10px 20px",
              border: "1px solid #C8A951",
              borderRadius: "100px",
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
            View All Posts
            <LuArrowRight size={16} />
          </a>
        </div>

        {/* Blog cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px",
          }}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(200, 169, 81, 0.1)",
                cursor: "pointer",
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: "16/10", position: "relative", overflow: "hidden" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(26, 15, 10, 0.8) 0%, transparent 50%)",
                  }}
                />
                
                {/* Category badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(200, 169, 81, 0.9)",
                    color: "#000",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "6px 12px",
                    borderRadius: "100px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  <post.categoryIcon size={12} />
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: "12px",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                    {post.date}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#C8A951",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    <LuClock size={14} />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: "60px",
            padding: "40px",
            background: "linear-gradient(135deg, rgba(200, 169, 81, 0.1) 0%, rgba(200, 169, 81, 0.02) 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(200, 169, 81, 0.2)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>
            Get recipes & stories in your inbox
          </h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", marginBottom: "24px" }}>
            Join 5,000+ food lovers who receive our weekly newsletter
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              maxWidth: "450px",
              margin: "0 auto",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: "1 1 250px",
                padding: "14px 20px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#FFF",
                fontSize: "15px",
                outline: "none",
              }}
            />
            <button
              style={{
                background: "#C8A951",
                color: "#000",
                border: "none",
                padding: "14px 28px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
