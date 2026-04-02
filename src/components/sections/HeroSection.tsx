"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Easing } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" as Easing },
});

const HERO_BG =
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80";

export function HeroSection() {
  return (
    <section
      aria-label="Hero section"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Image
        src={HERO_BG}
        alt="Beautifully plated Middle Eastern cuisine"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
        unoptimized
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        className="hero-content"
      >
        {/* Cuisine badge */}
        <motion.div {...fadeUp(0.2)} style={{ marginBottom: 24 }}>
          <span
            style={{
              display: "inline-flex",
              border: "1px solid rgba(212,168,83,0.4)",
              background: "rgba(212,168,83,0.1)",
              borderRadius: 50,
              padding: "8px 20px",
              color: "#D4A853",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Syrian · Lebanese · Indian · Iraqi
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.4)}
          className="hero-headline"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#FFF8F0",
            marginBottom: 20,
          }}
        >
          A Taste of the
          <br />
          <em style={{ color: "#D4A853", fontStyle: "italic" }}>Middle East</em>
          <br />
          in Glasgow
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.6)}
          className="hero-sub"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            maxWidth: 500,
            marginBottom: 36,
          }}
        >
          Authentic flavours from Syria, Lebanon, India &amp; Iraq. Family
          recipes passed down through generations.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.8)}
          className="hero-ctas"
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <Link href="/pickup" style={{ textDecoration: "none" }}>
            <button
              type="button"
              className="hero-btn-primary"
              style={{
                background: "linear-gradient(135deg, #D4A853, #B8912E)",
                color: "#000",
                padding: "16px 36px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(212,168,83,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Order Pickup
            </button>
          </Link>

          <Link href="/book" style={{ textDecoration: "none" }}>
            <button
              type="button"
              className="hero-btn-outline"
              style={{
                background: "transparent",
                color: "#D4A853",
                border: "2px solid #D4A853",
                padding: "16px 36px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D4A853";
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#D4A853";
              }}
            >
              Book a Table
            </button>
          </Link>
        </motion.div>

        {/* Rating bar */}
        <motion.div
          {...fadeUp(1.0)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 32,
          }}
        >
          <span style={{ color: "#D4A853", fontSize: 16, letterSpacing: 2 }}>
            ★★★★★
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
            }}
          >
            4.8 · 500+ Reviews on Google
          </span>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .hero-content {
          padding: 0 24px 80px;
        }
        .hero-headline {
          font-size: 44px;
        }
        .hero-sub {
          font-size: 15px;
        }
        .hero-ctas {
          flex-direction: column;
        }
        .hero-ctas a {
          width: 100%;
        }
        .hero-ctas button {
          width: 100%;
        }
        @media (min-width: 768px) {
          .hero-content {
            padding: 0 48px 120px;
          }
          .hero-headline {
            font-size: 72px;
          }
          .hero-sub {
            font-size: 20px;
          }
          .hero-ctas {
            flex-direction: row;
          }
          .hero-ctas a {
            width: auto;
          }
          .hero-ctas button {
            width: auto;
          }
        }
      `}</style>
    </section>
  );
}
