"use client";

import { useAuth } from "@/hooks";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function AccountPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (!isLoading && !isAuthenticated) redirect("/signin");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  const links = [
    { href: "/account/orders", label: "My Orders", icon: "📦" },
    { href: "/account/bookings", label: "My Bookings", icon: "📅" },
    { href: "/account/profile", label: "Profile Settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-heading text-3xl font-bold text-gray-900">
          Welcome, {user?.name ?? "User"}
        </h1>
        <p className="mt-1 text-gray-500">{user?.email}</p>
        <div className="mt-8 grid gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-md transition-all hover:shadow-lg"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-lg font-medium text-gray-900">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
