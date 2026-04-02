"use client";

import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-amber-200 hover:shadow-md">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-2xl text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-white">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
    </div>
  );
}
