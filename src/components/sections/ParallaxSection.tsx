"use client";

import type { ReactNode } from "react";
import Image from "next/image";

interface ParallaxSectionProps {
  image: string;
  children: ReactNode;
  overlay?: boolean;
}

export function ParallaxSection({ image, children, overlay = true }: ParallaxSectionProps) {
  return (
    <section className="relative flex min-h-[400px] items-center overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        {children}
      </div>
    </section>
  );
}
