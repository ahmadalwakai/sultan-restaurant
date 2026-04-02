import { adminTableStyles } from "@/lib/admin-ui";

/** Visual debug showing table style tokens */
export function AdminTableDebug() {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", fontSize: "0.75rem" }}>
      <h3>Admin Table Styles</h3>
      <pre>{JSON.stringify(adminTableStyles, null, 2)}</pre>
    </div>
  );
}
