"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ctaCopy, sectionTones } from "@/lib/homepage";
import { brandSpacing } from "@/theme/branding";

const partners = [
  { name: "Uber Eats", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_Eats_2020_logo.svg/320px-Uber_Eats_2020_logo.svg.png" },
  { name: "Deliveroo", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Deliveroo_logo.svg/320px-Deliveroo_logo.svg.png" },
  { name: "Just Eat", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Just_Eat_logo.svg/320px-Just_Eat_logo.svg.png" },
];

export function DeliveryPartnersSection() {
  return (
    <section style={{ background: sectionTones.subtle }} className="partners-section">
      <div
        style={{
          maxWidth: brandSpacing.maxWidth.wide,
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
          textAlign: "center",
        }}
        className="partners-inner"
      >
        <SectionHeader
          title={ctaCopy.delivery.title}
          subtitle={ctaCopy.delivery.subtitle}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
            marginTop: "1.5rem",
          }}
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              style={{
                display: "flex",
                height: 80,
                width: 160,
                alignItems: "center",
                justifyContent: "center",
                filter: "grayscale(100%)",
                opacity: 0.5,
                transition: "all 0.3s ease",
              }}
              className="partner-logo"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={80}
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .partners-section { padding-block: 2.5rem; }
        .partner-logo:hover { filter: grayscale(0%) !important; opacity: 1 !important; }
        @media (min-width: 768px) {
          .partners-section { padding-block: 3.5rem; }
          .partners-inner { padding-inline: ${brandSpacing.container.tablet} !important; }
        }
        @media (min-width: 1024px) {
          .partners-section { padding-block: 4rem; }
          .partners-inner { padding-inline: ${brandSpacing.container.desktop} !important; }
        }
      `}</style>
    </section>
  );
}
