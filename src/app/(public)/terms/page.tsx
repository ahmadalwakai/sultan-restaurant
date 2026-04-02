export const metadata = { title: "Terms & Conditions | Sultan Restaurant" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="font-heading text-3xl font-bold">Terms & Conditions</h1>
        <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-GB")}</p>
          <h2 className="font-heading text-xl font-bold text-gray-900">1. General</h2>
          <p>
            By using Sultan Restaurant&apos;s website and services, you agree to these
            terms and conditions. We reserve the right to modify these terms at any time.
          </p>
          <h2 className="font-heading text-xl font-bold text-gray-900">2. Orders</h2>
          <p>
            All orders are subject to availability. Prices are in GBP and include VAT.
            We reserve the right to refuse any order.
          </p>
          <h2 className="font-heading text-xl font-bold text-gray-900">3. Bookings</h2>
          <p>
            Table reservations are subject to availability. We hold reservations for
            15 minutes past the booking time. Please notify us of cancellations in advance.
          </p>
          <h2 className="font-heading text-xl font-bold text-gray-900">4. Privacy</h2>
          <p>
            Your personal data is handled in accordance with our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
