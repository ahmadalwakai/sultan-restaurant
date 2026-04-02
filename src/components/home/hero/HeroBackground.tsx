"use client";

import Image from "next/image";
import { heroContent } from "@/lib/content";
import { brandGradients } from "@/lib/design";

/** Full-bleed background image with gradient overlay */
export function HeroBackground() {
  return (
    <>
      <Image
        src={heroContent.backgroundImage}
        alt={heroContent.backgroundAlt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
        unoptimized
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: brandGradients.heroOverlay,
          zIndex: 1,
        }}
      />
    </>
  );
}
