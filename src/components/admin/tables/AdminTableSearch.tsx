"use client";

import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";

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
    <Input
      type="text"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
      maxW="16rem"
      size="sm"
      borderColor="gray.300"
      _focus={{ borderColor: "yellow.500", boxShadow: "0 0 0 1px var(--chakra-colors-yellow-500)" }}
    />
  );
}
