"use client";

import { brandSpacing } from "@/theme/branding";
import { zIndex } from "@/lib/design";
import { HeroBackground, HeroContent, HeroActions, HeroStats } from "./hero";

export function HeroSection() {
  return (
    <section
      aria-label="Hero section"
      style={{ position: "relative", height: "100vh", overflow: "hidden" }}
    >
      <HeroBackground />

      <div
        className="hero-container"
        style={{
          position: "relative",
          zIndex: zIndex.content,
          maxWidth: brandSpacing.maxWidth.wide,
          margin: "0 auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <HeroContent />
        <HeroActions />
        <HeroStats />
      </div>

      <style>{`
        .hero-container {
          padding: 0 ${brandSpacing.container.mobile} ${brandSpacing.heroBottom.mobile};
        }
        .hero-headline { font-size: 2.75rem; }
        .hero-sub { font-size: 0.9375rem; }
        .hero-ctas { flex-direction: column; }
        .hero-ctas a, .hero-ctas button { width: 100%; }
        @media (min-width: 768px) {
          .hero-container {
            padding: 0 ${brandSpacing.container.desktop} ${brandSpacing.heroBottom.desktop};
          }
          .hero-headline { font-size: 4.5rem; }
          .hero-sub { font-size: 1.25rem; }
          .hero-ctas { flex-direction: row; }
          .hero-ctas a, .hero-ctas button { width: auto; }
        }
      `}</style>
    </section>
  );
}
