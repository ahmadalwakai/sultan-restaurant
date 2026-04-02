import { adminSpacing } from "@/lib/admin-ui";

/** Visual debug overlay showing spacing tokens */
export function AdminSpacingDebug() {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", fontSize: "0.75rem" }}>
      <h3>Admin Spacing Tokens</h3>
      <pre>{JSON.stringify(adminSpacing, null, 2)}</pre>
    </div>
  );
}
