"use client";

import { ReactNode } from "react";

interface Tab { key: string; label: string }

interface SettingsTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  children: ReactNode;
}

export function SettingsTabs({ tabs, activeTab, onTabChange, children }: SettingsTabsProps) {
  return (
    <div className="flex gap-6">
      <nav className="w-48 shrink-0 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.key ? "bg-amber-50 text-amber-700 font-medium" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
