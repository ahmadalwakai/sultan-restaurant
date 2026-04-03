"use client";

import { SectionShell } from "@/components/shared/SectionShell";

const partners = [
  { name: "Uber Eats", color: "#06C167" },
  { name: "Deliveroo", color: "#00CCBC" },
  { name: "Just Eat", color: "#F36D00" },
];

export function DeliveryPartnersSection() {
  return (
    <SectionShell spacing="compact" size="narrow" className="border-t border-gray-100">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-gray-400">
        Also available on
      </p>
      <div className="mt-5 flex items-center justify-center gap-8 sm:gap-12">
        {partners.map((partner) => (
          <span
            key={partner.name}
            className="text-base font-bold sm:text-lg"
            style={{ color: partner.color }}
          >
            {partner.name}
          </span>
        ))}
      </div>
    </SectionShell>
  );
}
