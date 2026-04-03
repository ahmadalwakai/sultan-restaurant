"use client";

import { useState } from "react";

import { SectionShell } from "@/components/shared/SectionShell";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SectionShell bg="bg-stone-100" spacing="compact" size="narrow">
      <div className="text-center">
        <h2 className="font-heading text-xl font-bold text-gray-900 sm:text-2xl">
          Stay Updated
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Subscribe for exclusive offers and updates
        </p>
        {submitted ? (
          <p className="mt-6 text-sm font-medium text-amber-600">
            Thank you for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </SectionShell>
  );
}
