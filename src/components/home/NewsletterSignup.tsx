"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-gray-900 py-16">
      <div className="mx-auto max-w-xl px-4 text-center text-white">
        <h2 className="font-heading text-2xl font-bold">Stay Updated</h2>
        <p className="mt-2 text-gray-400">
          Subscribe for exclusive offers and updates
        </p>
        {submitted ? (
          <p className="mt-6 text-amber-400 font-medium">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none ring-1 ring-white/20 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
