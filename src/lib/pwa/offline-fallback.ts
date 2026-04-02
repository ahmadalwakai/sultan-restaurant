// Offline fallback content and utilities

export const OFFLINE_CONTENT = {
  page: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sultan Restaurant - Offline</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          background: #1a202c;
          color: #e2e8f0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .container {
          max-width: 400px;
          padding: 20px;
        }
        .icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        h1 {
          color: #d69e2e;
          margin-bottom: 1rem;
        }
        p {
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .retry-btn {
          background: #d69e2e;
          color: #1a202c;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .retry-btn:hover {
          background: #b7791f;
        }
        .status {
          margin-top: 2rem;
          font-size: 14px;
          color: #718096;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">🍽️</div>
        <h1>You're Offline</h1>
        <p>We're sorry, but it looks like you're not connected to the internet. Don't worry though - you can still browse our menu and place orders when you get back online!</p>
        <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
        <div class="status" id="status">Checking connection...</div>
      </div>

      <script>
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
      </script>
    </body>
    </html>
  `,

  menu: {
    title: "Our Menu (Offline)",
    description: "Browse our menu while offline. Prices and availability may change.",
    categories: [
      {
        name: "Appetizers",
        items: [
          { name: "Hummus", description: "Creamy chickpea dip with olive oil", price: "£4.50" },
          { name: "Falafel", description: "Crispy chickpea patties", price: "£5.50" },
          { name: "Baba Ganoush", description: "Smoky aubergine dip", price: "£4.75" }
        ]
      },
      {
        name: "Main Courses",
        items: [
          { name: "Lamb Kebab", description: "Grilled lamb skewers with rice", price: "£12.50" },
          { name: "Chicken Shawarma", description: "Marinated chicken wrap", price: "£9.50" },
          { name: "Falafel Wrap", description: "Vegetarian chickpea wrap", price: "£7.50" }
        ]
      }
    ]
  },

  error: {
    title: "Connection Error",
    message: "Unable to load content. Please check your internet connection.",
    action: "Retry"
  }
};

// Generate offline menu HTML
export function generateOfflineMenuHTML(): string {
  const { menu } = OFFLINE_CONTENT;

  return `
    <div class="offline-menu">
      <header class="menu-header">
        <h1>${menu.title}</h1>
        <p>${menu.description}</p>
      </header>

      <div class="menu-categories">
        ${menu.categories.map(category => `
          <section class="category">
            <h2>${category.name}</h2>
            <div class="menu-items">
              ${category.items.map(item => `
                <div class="menu-item">
                  <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                  </div>
                  <div class="item-price">${item.price}</div>
                </div>
              `).join('')}
            </div>
          </section>
        `).join('')}
      </div>

      <div class="offline-notice">
        <p>📱 This menu is cached for offline viewing. Visit us online for the latest updates and to place orders.</p>
      </div>
    </div>
  `;
}

// Check if user is online
export function isOnline(): boolean {
  return navigator.onLine;
}

// Listen for online/offline events
export function onOnlineStatusChange(callback: (online: boolean) => void): () => void {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

// Queue actions for when back online
export class OfflineQueue {
  private queue: Array<{ id: string; action: () => Promise<any>; timestamp: number }> = [];
  private isProcessing = false;

  add(action: () => Promise<any>): string {
    const id = `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.queue.push({
      id,
      action,
      timestamp: Date.now()
    });

    // Try to process immediately if online
    if (isOnline()) {
      this.processQueue();
    }

    return id;
  }

  async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    while (this.queue.length > 0 && isOnline()) {
      const item = this.queue.shift();
      if (item) {
        try {
          await item.action();
          console.log(`[OfflineQueue] Processed action: ${item.id}`);
        } catch (error) {
          console.error(`[OfflineQueue] Failed action ${item.id}:`, error);
          // Re-queue failed actions
          this.queue.unshift(item);
          break;
        }
      }
    }

    this.isProcessing = false;
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  clearQueue(): void {
    this.queue = [];
  }
}

// Global offline queue instance
export const offlineQueue = new OfflineQueue();

// Auto-process queue when coming back online
onOnlineStatusChange((online) => {
  if (online) {
    console.log('[Offline] Back online, processing queued actions...');
    offlineQueue.processQueue();
  } else {
    console.log('[Offline] Gone offline, queuing actions...');
  }
});