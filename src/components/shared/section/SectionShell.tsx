import { brandSpacing } from "@/theme/branding";
import { sectionSpacing } from "@/lib/ui";
import type { ReactNode, CSSProperties } from "react";

interface SectionShellProps {
  children: ReactNode;
  bg?: string;
  py?: string;
  maxW?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

/** Standard homepage section wrapper with consistent padding and max-width. */
export function SectionShell({
  children,
  bg = "transparent",
  py,
  maxW = sectionSpacing.maxW.full,
  className,
  id,
  style,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        background: bg,
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: maxW,
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
          paddingBlock: py ?? brandSpacing.section.mobile,
        }}
      >
        {children}
      </div>
      <style>{`
        @media (min-width: 768px) {
          section${id ? `#${id}` : ""} > div {
            padding-inline: ${brandSpacing.container.tablet} !important;
            padding-block: ${py ?? brandSpacing.section.tablet} !important;
          }
        }
        @media (min-width: 1024px) {
          section${id ? `#${id}` : ""} > div {
            padding-inline: ${brandSpacing.container.desktop} !important;
            padding-block: ${py ?? brandSpacing.section.desktop} !important;
          }
        }
      `}</style>
    </section>
  );
}
