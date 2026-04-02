export const metadata = { title: "Privacy Policy | Sultan Restaurant" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="font-heading text-3xl font-bold">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-GB")}</p>
          <h2 className="font-heading text-xl font-bold text-gray-900">Data We Collect</h2>
          <p>
            We collect personal information you provide when placing orders, making
            bookings, or contacting us. This includes your name, email, phone number,
            and payment details.
          </p>
          <h2 className="font-heading text-xl font-bold text-gray-900">How We Use Your Data</h2>
          <p>
            We use your data to process orders, manage bookings, send order updates,
            and improve our services. We do not sell your data to third parties.
          </p>
          <h2 className="font-heading text-xl font-bold text-gray-900">Cookies</h2>
          <p>
            We use essential cookies to maintain your session and preferences.
            Analytics cookies help us understand how visitors use our site.
          </p>
          <h2 className="font-heading text-xl font-bold text-gray-900">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data.
            Contact us at privacy@sultanrestaurant.co.uk for any data requests.
          </p>
        </div>
      </div>
    </div>
  );
}
