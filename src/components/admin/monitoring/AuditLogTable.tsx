"use client";

// ─── Audit Log Table ─────────────────────────────────────

interface AuditEntry {
  id: string;
  adminEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  createdAt: string;
}

interface AuditLogTableProps {
  logs: AuditEntry[];
  isLoading?: boolean;
}

const actionColors: Record<string, string> = {
  CREATE: "bg-green-100 text-green-800",
  UPDATE: "bg-blue-100 text-blue-800",
  DELETE: "bg-red-100 text-red-800",
  LOGIN: "bg-purple-100 text-purple-800",
  LOGOUT: "bg-gray-100 text-gray-800",
  STATUS_CHANGE: "bg-yellow-100 text-yellow-800",
  SETTINGS_UPDATE: "bg-indigo-100 text-indigo-800",
  REFUND: "bg-orange-100 text-orange-800",
};

export function AuditLogTable({ logs, isLoading }: AuditLogTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="h-5 w-28 bg-gray-100 rounded animate-pulse mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-50 rounded animate-pulse mb-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Audit Log</h3>
      </div>
      {logs.length === 0 ? (
        <p className="p-6 text-sm text-gray-500">No audit entries</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Admin</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Action</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Entity</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">{log.adminEmail}</td>
                  <td className="px-4 py-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${actionColors[log.action] ?? "bg-gray-100"}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {log.entity}{log.entityId ? `/${log.entityId}` : ""}
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
