'use client';

// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Offline - Sultan Restaurant',
//   description: 'You are currently offline. Browse our cached menu and place orders when back online.',
//   robots: 'noindex, nofollow',
// };

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="text-6xl mb-6">🍽️</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-amber-400 mb-4">
          You're Offline
        </h1>

        {/* Message */}
        <p className="text-gray-300 mb-8 leading-relaxed">
          We're sorry, but it looks like you're not connected to the internet.
          Don't worry though - you can still browse our menu and place orders when you get back online!
        </p>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-6"
        >
          Try Again
        </button>

        {/* Status */}
        <div className="text-sm text-gray-500" id="status">
          Checking connection...
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Check online status
            function updateStatus() {
              const status = document.getElementById('status');
              if (navigator.onLine) {
                status.textContent = 'You appear to be back online!';
                status.style.color = '#48bb78';
              } else {
                status.textContent = 'Still offline - check your connection';
                status.style.color = '#718096';
              }
            }

            window.addEventListener('online', updateStatus);
            window.addEventListener('offline', updateStatus);
            updateStatus();

            // Auto-retry when back online
            window.addEventListener('online', () => {
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
          `,
        }}
      />
    </div>
  );
}