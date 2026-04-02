"use client";

interface AdminEmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function AdminEmptyState({ title, description, actionLabel, onAction }: AdminEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">📭</div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
