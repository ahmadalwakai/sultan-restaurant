"use client";

import type { ReactNode } from "react";

interface MobileQuickActionCardProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  badge?: number;
}

export function MobileQuickActionCard({ icon, label, onClick, href, badge }: MobileQuickActionCardProps) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      className="relative flex flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-sm active:scale-95"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-xl text-amber-600">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </Tag>
  );
}
