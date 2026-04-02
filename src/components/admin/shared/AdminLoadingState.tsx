/** Pulsing skeleton loader for admin content areas */
interface AdminLoadingStateProps {
  rows?: number;
  height?: string;
}

export function AdminLoadingState({ rows = 5, height = "3.5rem" }: AdminLoadingStateProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            height,
            background: "#F3F4F6",
            borderRadius: "0.5rem",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
