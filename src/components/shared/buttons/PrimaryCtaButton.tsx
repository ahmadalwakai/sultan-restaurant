"use client";

import { useState } from "react";
import { buttonStyles } from "@/lib/ui";
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";

interface PrimaryCtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryCtaButton({ children, style, ...props }: PrimaryCtaButtonProps) {
  const [hover, setHover] = useState(false);

  const merged: CSSProperties = {
    ...buttonStyles.primary,
    ...(hover ? buttonStyles.primaryHover : {}),
    ...style,
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={merged}
      {...props}
    >
      {children}
    </button>
  );
}
