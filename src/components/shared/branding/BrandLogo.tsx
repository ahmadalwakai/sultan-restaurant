import { Logo } from "@/components/shared/Logo";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
  className?: string;
}

/** Branded logo wrapper — delegates to Logo with consistent sizing */
export function BrandLogo({ size = "md", variant = "full", className }: BrandLogoProps) {
  return <Logo size={size} variant={variant} className={className} />;
}
