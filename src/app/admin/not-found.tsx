import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="text-gray-600">This admin page doesn&apos;t exist.</p>
        <Link href="/admin/dashboard" className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
