"use client";

import { Tabs } from "@chakra-ui/react";

interface Tab {
  value: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
}

export default function TabBar({ tabs, value, onChange }: TabBarProps) {
  return (
    <Tabs.Root value={value} onValueChange={(d) => onChange(d.value)}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
