import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <span className="text-6xl">❌</span>
        <h1 className="mt-4 font-heading text-2xl font-bold text-gray-900">
          Payment Cancelled
        </h1>
        <p className="mt-2 text-gray-600">
          Your payment was cancelled. Your cart items have been preserved.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/pickup"
            className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
          >
            Try Again
          </Link>
          <Link
            href="/menu"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-600 hover:bg-gray-50"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
