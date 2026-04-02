"use client";

import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (!isLoading && !isAuthenticated) redirect("/signin");
  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-heading text-2xl font-bold">Profile</h1>
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-gray-900">{user?.name ?? "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{user?.email ?? "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
