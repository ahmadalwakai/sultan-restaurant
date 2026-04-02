/** Simple subtitle / description line */
interface AdminSectionSubtitleProps {
  children: string;
}

export function AdminSectionSubtitle({ children }: AdminSectionSubtitleProps) {
  return (
    <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1rem" }}>
      {children}
    </p>
  );
}
