"use client";

import type { ReactNode } from "react";

interface QuickActionCardProps {
  icon: ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  href?: string;
}

export function QuickActionCard({ icon, label, description, onClick, href }: QuickActionCardProps) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-amber-200 hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-xl text-amber-600">
        {icon}
      </div>
      <div className="text-left">
        <p className="font-semibold text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </Tag>
  );
}
