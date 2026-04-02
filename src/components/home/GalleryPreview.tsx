"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ctaCopy } from "@/lib/homepage";
import { brandSpacing, brandRadii, brandColors, brandTypography } from "@/theme/branding";

const previewImages = [
  "https://images.unsplash.com/photo-1540914124281-342587941389?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=600&fit=crop&q=80",
];

export function GalleryPreview() {
  return (
    <section className="gallery-section">
      <div
        style={{
          maxWidth: brandSpacing.maxWidth.full,
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
        }}
        className="gallery-inner"
      >
        <SectionHeader
          title={ctaCopy.gallery.title}
          subtitle={ctaCopy.gallery.subtitle}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
          className="gallery-grid"
        >
          {previewImages.map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "1",
                overflow: "hidden",
                borderRadius: brandRadii.card,
              }}
              className="gallery-img-wrap"
            >
              <Image
                src={img}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover"
                style={{ transition: "transform 0.5s ease" }}
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized
              />
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link
            href="/page/gallery"
            style={{
              color: brandColors.gold[600],
              fontWeight: brandTypography.weights.semibold,
              fontSize: brandTypography.sizes.body,
              fontFamily: brandTypography.fonts.body,
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            className="gallery-cta"
          >
            {ctaCopy.gallery.cta} &rarr;
          </Link>
        </div>
      </div>
      <style>{`
        .gallery-section { padding-block: ${brandSpacing.section.mobile}; }
        .gallery-img-wrap:hover img { transform: scale(1.08); }
        .gallery-cta:hover { text-decoration: underline !important; }
        @media (min-width: 768px) {
          .gallery-section { padding-block: ${brandSpacing.section.tablet}; }
          .gallery-inner { padding-inline: ${brandSpacing.container.tablet} !important; }
          .gallery-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 1.25rem !important; }
        }
        @media (min-width: 1024px) {
          .gallery-section { padding-block: ${brandSpacing.section.desktop}; }
          .gallery-inner { padding-inline: ${brandSpacing.container.desktop} !important; }
        }
      `}</style>
    </section>
  );
}
