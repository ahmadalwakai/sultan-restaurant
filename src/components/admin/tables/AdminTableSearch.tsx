"use client";

import { useEffect, useState } from "react";
import { adminFormStyles } from "@/lib/admin-ui";

interface AdminTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/** Debounced search input for table toolbars */
export function AdminTableSearch({ value, onChange, placeholder = "Search..." }: AdminTableSearchProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => onChange(local), 300);
    return () => clearTimeout(timer);
  }, [local, onChange]);

  return (
    <input
      type="text"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
      style={{ ...adminFormStyles.input, maxWidth: "16rem" }}
      className="admin-table-search"
    />
  );
}
