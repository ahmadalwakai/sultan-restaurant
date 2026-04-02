"use client";

interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export function ActivityFeed({ activities }: { activities: Activity[] }) {
  if (!activities.length) {
    return (
      <div className="bg-white border rounded-lg p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Activity</h3>
        <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Activity</h3>
      <div className="space-y-3">
        {activities.map((a) => (
          <div key={a.id} className="flex gap-3 text-sm">
            <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0" />
            <div>
              <p className="text-gray-700">{a.message}</p>
              <p className="text-xs text-gray-400">{new Date(a.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
