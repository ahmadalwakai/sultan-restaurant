"use client";

import Link from "next/link";

export default function AdminAuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Error</h1>
        <p className="text-gray-500 mb-4">Something went wrong during sign in.</p>
        <Link href="/admin/signin" className="text-amber-600 hover:underline">
          Try again
        </Link>
      </div>
    </div>
  );
}
