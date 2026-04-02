"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-gray-900">Something went wrong</h1>
        <p className="text-gray-600">{error.message || "An unexpected error occurred."}</p>
        <button onClick={reset} className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
          Try Again
        </button>
      </div>
    </div>
  );
}
