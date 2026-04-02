interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: "1rem", sub: "0.5rem", gap: 6 },
  md: { icon: 36, text: "1.25rem", sub: "0.6rem", gap: 8 },
  lg: { icon: 48, text: "1.75rem", sub: "0.75rem", gap: 10 },
};

export function Logo({ size = "md", variant = "full", className }: LogoProps) {
  const s = sizes[size];

  const icon = (
    <svg
      width={s.icon}
      height={s.icon}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Dome / arch */}
      <path
        d="M8 44 C8 24, 20 8, 32 8 C44 8, 56 24, 56 44"
        stroke="#B8860B"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Crescent accent */}
      <path
        d="M38 16 C34 20, 34 28, 38 32 C32 28, 32 20, 38 16Z"
        fill="#B8860B"
      />
      {/* Star */}
      <circle cx="26" cy="22" r="2" fill="#B8860B" />
      {/* Base line */}
      <line x1="4" y1="44" x2="60" y2="44" stroke="#B8860B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Decorative pillars */}
      <line x1="16" y1="44" x2="16" y2="50" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="44" x2="48" y2="50" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" />
      {/* Base platform */}
      <line x1="12" y1="50" x2="52" y2="50" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  if (variant === "icon") {
    return <span className={className}>{icon}</span>;
  }

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        textDecoration: "none",
      }}
    >
      {icon}
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            fontSize: s.text,
            fontWeight: 800,
            color: "#B8860B",
            letterSpacing: "0.04em",
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          SULTAN
        </span>
        <span
          style={{
            fontSize: s.sub,
            fontWeight: 500,
            color: "#92702B",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          Restaurant
        </span>
      </span>
    </span>
  );
}
