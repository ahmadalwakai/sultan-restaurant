"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <span className="text-5xl">⚠️</span>
        <h1 className="mt-4 font-heading text-2xl font-bold text-gray-900">
          Authentication Error
        </h1>
        <p className="mt-2 text-gray-600">
          {error === "OAuthAccountNotLinked"
            ? "This email is already associated with another account."
            : "An error occurred during sign in. Please try again."}
        </p>
        <Link
          href="/signin"
          className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
