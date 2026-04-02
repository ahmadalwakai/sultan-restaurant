"use client";

import { useState } from "react";

interface AdminDeleteConfirmProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  trigger: (open: () => void) => React.ReactNode;
}

export function AdminDeleteConfirm({
  title = "Delete Item",
  message = "Are you sure? This action cannot be undone.",
  onConfirm,
  trigger,
}: AdminDeleteConfirmProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {trigger(() => setIsOpen(true))}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{message}</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { onConfirm(); setIsOpen(false); }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
