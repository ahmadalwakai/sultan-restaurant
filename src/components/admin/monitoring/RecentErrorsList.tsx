"use client";

// ─── Recent Errors List ──────────────────────────────────

interface ErrorEntry {
  id: string;
  message: string;
  severity: string;
  path?: string;
  createdAt: string;
}

interface RecentErrorsListProps {
  errors: ErrorEntry[];
  isLoading?: boolean;
}

const severityColors: Record<string, string> = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

export function RecentErrorsList({ errors, isLoading }: RecentErrorsListProps) {
  if (isLoading) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="h-5 w-32 bg-gray-100 rounded animate-pulse mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-50 rounded animate-pulse mb-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Errors</h3>
      {errors.length === 0 ? (
        <p className="text-sm text-gray-500">No errors recorded</p>
      ) : (
        <div className="space-y-2">
          {errors.map((error) => (
            <div key={error.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${severityColors[error.severity] ?? "bg-gray-100"}`}>
                {error.severity}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{error.message}</p>
                <p className="text-xs text-gray-400">
                  {error.path && <span>{error.path} &middot; </span>}
                  {new Date(error.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
