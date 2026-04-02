"use client";

import { useState } from "react";
import { ctaCopy } from "@/lib/homepage";
import { brandTypography, brandColors, brandRadii, brandSpacing } from "@/theme/branding";
import { brandGradients } from "@/lib/design";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      style={{
        background: brandColors.charcoal,
        position: "relative",
      }}
      className="newsletter-section"
    >
      {/* Top gold line to separate from footer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: brandGradients.ctaGold,
        }}
      />
      <div
        style={{
          maxWidth: brandSpacing.maxWidth.narrow,
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
          textAlign: "center",
          color: "#FFFFFF",
        }}
        className="newsletter-inner"
      >
        <h2
          style={{
            fontFamily: brandTypography.fonts.heading,
            fontSize: brandTypography.sizes.sectionTitle.mobile,
            fontWeight: brandTypography.weights.bold,
            margin: 0,
          }}
          className="newsletter-title"
        >
          {ctaCopy.newsletter.title}
        </h2>
        <p
          style={{
            marginTop: "0.5rem",
            color: "rgba(255,255,255,0.6)",
            fontFamily: brandTypography.fonts.body,
            fontSize: brandTypography.sizes.body,
          }}
        >
          {ctaCopy.newsletter.subtitle}
        </p>
        {submitted ? (
          <p
            style={{
              marginTop: "1.5rem",
              color: brandColors.gold[400],
              fontWeight: brandTypography.weights.semibold,
              fontFamily: brandTypography.fonts.body,
            }}
          >
            {ctaCopy.newsletter.success}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "1.5rem",
              display: "flex",
              gap: "0.5rem",
              maxWidth: 480,
              marginInline: "auto",
            }}
            className="newsletter-form"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                flex: 1,
                borderRadius: brandRadii.button,
                background: "rgba(255,255,255,0.08)",
                padding: "0.75rem 1.25rem",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.15)",
                outline: "none",
                fontSize: brandTypography.sizes.body,
                fontFamily: brandTypography.fonts.body,
                transition: "border-color 0.2s ease",
              }}
              className="newsletter-input"
            />
            <button
              type="submit"
              style={{
                borderRadius: brandRadii.button,
                background: brandGradients.ctaGold,
                padding: "0.75rem 1.75rem",
                fontWeight: brandTypography.weights.semibold,
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
                fontSize: brandTypography.sizes.small,
                letterSpacing: brandTypography.letterSpacing.wide,
                transition: "transform 0.2s ease",
                whiteSpace: "nowrap",
              }}
              className="newsletter-btn"
            >
              {ctaCopy.newsletter.cta}
            </button>
          </form>
        )}
      </div>
      <style>{`
        .newsletter-section { padding-block: 3rem; }
        .newsletter-input:focus { border-color: ${brandColors.gold[400]} !important; }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.35); }
        .newsletter-btn:hover { transform: translateY(-1px); }
        @media (min-width: 768px) {
          .newsletter-section { padding-block: 4rem; }
          .newsletter-inner { padding-inline: ${brandSpacing.container.tablet} !important; }
          .newsletter-title { font-size: ${brandTypography.sizes.sectionTitle.tablet} !important; }
        }
        @media (max-width: 480px) {
          .newsletter-form { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
