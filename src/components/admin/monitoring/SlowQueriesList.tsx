"use client";

// ─── Slow Queries List ───────────────────────────────────

interface SlowQuery {
  id: string;
  path: string;
  method?: string;
  durationMs: number;
  type: string;
  createdAt: string;
}

interface SlowQueriesListProps {
  queries: SlowQuery[];
  isLoading?: boolean;
}

export function SlowQueriesList({ queries, isLoading }: SlowQueriesListProps) {
  if (isLoading) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="h-5 w-32 bg-gray-100 rounded animate-pulse mb-4" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-50 rounded animate-pulse mb-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Slow Requests</h3>
      {queries.length === 0 ? (
        <p className="text-sm text-gray-500">No slow requests recorded</p>
      ) : (
        <div className="space-y-2">
          {queries.map((q) => (
            <div key={q.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <span className="text-xs font-mono bg-gray-200 px-1.5 py-0.5 rounded">
                {q.method ?? "GET"}
              </span>
              <span className="text-sm text-gray-700 flex-1 truncate">{q.path}</span>
              <span className="text-sm font-medium text-orange-600">{q.durationMs}ms</span>
              <span className="text-xs text-gray-400">
                {new Date(q.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
