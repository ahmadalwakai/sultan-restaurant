import { brandColors } from "@/theme/branding";

interface BrandDividerProps {
  width?: number;
  className?: string;
}

/** Decorative gold separator line */
export function BrandDivider({ width = 48, className }: BrandDividerProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height: 3,
        borderRadius: 2,
        background: `linear-gradient(90deg, ${brandColors.gold[400]}, ${brandColors.gold[600]})`,
      }}
    />
  );
}
