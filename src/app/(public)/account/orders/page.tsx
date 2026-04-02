"use client";

import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function AccountOrdersPage() {
  const { isAuthenticated, isLoading } = useAuth();
  if (!isLoading && !isAuthenticated) redirect("/signin");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        <Link href="/account" className="text-sm text-amber-600 hover:underline">
          &larr; Account
        </Link>
        <h1 className="mt-4 font-heading text-2xl font-bold">My Orders</h1>
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
          <p className="text-center text-gray-500">No orders yet. Start by browsing our menu!</p>
          <div className="mt-4 text-center">
            <Link href="/menu" className="text-amber-600 font-semibold hover:underline">
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
