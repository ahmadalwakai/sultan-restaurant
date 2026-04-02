"use client";

import type { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "default" | "highlight";
}

export function InfoCard({ icon, title, description, variant = "default" }: InfoCardProps) {
  const isHighlight = variant === "highlight";
  return (
    <div className={`rounded-xl p-6 ${isHighlight ? "bg-amber-50 border border-amber-200" : "bg-white border border-gray-100 shadow-sm"}`}>
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-lg ${isHighlight ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"}`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
