import { brandColors } from "@/theme/branding";

interface AdminErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function AdminErrorState({ message = "Something went wrong", onRetry }: AdminErrorStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>⚠️</span>
      <p style={{ fontSize: "0.875rem", color: brandColors.accent[600], marginBottom: "0.5rem" }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "0.375rem 1rem",
            fontSize: "0.875rem",
            color: brandColors.gold[700],
            background: "transparent",
            border: `1px solid ${brandColors.gold[300]}`,
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
