"use client";

import { useState } from "react";
import { buttonStyles } from "@/lib/ui";
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";

interface SecondaryCtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function SecondaryCtaButton({ children, style, ...props }: SecondaryCtaButtonProps) {
  const [hover, setHover] = useState(false);

  const merged: CSSProperties = {
    ...buttonStyles.secondary,
    ...(hover ? buttonStyles.secondaryHover : {}),
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
