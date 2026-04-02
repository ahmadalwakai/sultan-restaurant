import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}
