"use client";

import type { ReactNode } from "react";

interface AdminFilterBarProps {
  children: ReactNode;
}

export function AdminFilterBar({ children }: AdminFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
      {children}
    </div>
  );
}
