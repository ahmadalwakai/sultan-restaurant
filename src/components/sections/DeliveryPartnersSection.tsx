"use client";

import Image from "next/image";
import { SectionTitle } from "@/components/shared/SectionTitle";

const partners = [
  { name: "Uber Eats", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_Eats_2020_logo.svg/320px-Uber_Eats_2020_logo.svg.png" },
  { name: "Deliveroo", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Deliveroo_logo.svg/320px-Deliveroo_logo.svg.png" },
  { name: "Just Eat", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Just_Eat_logo.svg/320px-Just_Eat_logo.svg.png" },
];

export function DeliveryPartnersSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <SectionTitle
          title="Order Through Our Partners"
          subtitle="Available on all major delivery platforms"
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-20 w-40 items-center justify-center grayscale transition-all hover:grayscale-0"
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
    </section>
  );
}
