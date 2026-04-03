import { cn } from "@/lib/utils/cn";

interface CardSurfaceProps {
  children: React.ReactNode;
  className?: string;
}

export function CardSurface({ children, className }: CardSurfaceProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-gray-100 bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}
