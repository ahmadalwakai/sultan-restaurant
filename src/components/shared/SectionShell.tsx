import { cn } from "@/lib/utils/cn";

interface SectionShellProps {
  children: React.ReactNode;
  bg?: string;
  size?: "narrow" | "default" | "wide";
  spacing?: "normal" | "compact";
  className?: string;
}

const sizeClasses = {
  narrow: "max-w-[720px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1400px]",
};

const spacingClasses = {
  normal: "py-14 sm:py-20 lg:py-24",
  compact: "py-10 sm:py-12",
};

export function SectionShell({
  children,
  bg,
  size = "default",
  spacing = "normal",
  className,
}: SectionShellProps) {
  return (
    <section className={cn(spacingClasses[spacing], bg, className)}>
      <div className={cn("mx-auto px-5 sm:px-8 lg:px-12", sizeClasses[size])}>
        {children}
      </div>
    </section>
  );
}
