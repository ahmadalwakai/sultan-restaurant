"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/validators";
import { useSubmitContact } from "@/hooks/api";
import toast from "react-hot-toast";

export function ContactForm() {
  const submitContact = useSubmitContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate(data, {
      onSuccess: () => {
        toast.success("Message sent! We'll get back to you soon.");
        reset();
      },
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register("name")}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            placeholder="your@email.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Phone (optional)</label>
        <input
          {...register("phone")}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="07xxx xxx xxx"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Subject</label>
        <input
          {...register("subject")}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="What's this about?"
        />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="Your message..."
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitContact.isPending}
        className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
      >
        {submitContact.isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
