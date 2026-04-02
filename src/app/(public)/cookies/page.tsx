export const metadata = { title: "Cookie Policy | Sultan Restaurant" };

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="font-heading text-3xl font-bold">Cookie Policy</h1>
        <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
          <p>We use cookies to improve your experience on our site.</p>
          <h2 className="font-heading text-xl font-bold text-gray-900">Essential Cookies</h2>
          <p>
            These cookies are necessary for the website to function and cannot be
            disabled. They include session cookies and authentication tokens.
          </p>
          <h2 className="font-heading text-xl font-bold text-gray-900">Analytics Cookies</h2>
          <p>
            We use analytics cookies to understand how visitors interact with our
            website. This helps us improve our services.
          </p>
        </div>
      </div>
    </div>
  );
}
