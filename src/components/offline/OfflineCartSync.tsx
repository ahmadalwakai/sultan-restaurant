'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface QueuedCartAction {
  id: string;
  type: 'add' | 'update' | 'remove';
  itemId: string;
  quantity: number;
  timestamp: Date;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
}

export default function OfflineCartSync() {
  const [isOnline, setIsOnline] = useState(true);
  const [queuedActions, setQueuedActions] = useState<QueuedCartAction[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      syncQueuedActions();
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load queued actions from storage
    loadQueuedActions();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadQueuedActions = () => {
    try {
      const stored = localStorage.getItem('sultan_queued_cart_actions');
      if (stored) {
        const actions = JSON.parse(stored).map((action: any) => ({
          ...action,
          timestamp: new Date(action.timestamp),
        }));
        setQueuedActions(actions);
      }
    } catch (error) {
      console.error('Error loading queued actions:', error);
    }
  };

  const saveQueuedActions = (actions: QueuedCartAction[]) => {
    try {
      localStorage.setItem('sultan_queued_cart_actions', JSON.stringify(actions));
    } catch (error) {
      console.error('Error saving queued actions:', error);
    }
  };

  const addQueuedAction = (action: Omit<QueuedCartAction, 'id' | 'timestamp' | 'status'>) => {
    const newAction: QueuedCartAction = {
      ...action,
      id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      status: 'pending',
    };

    const updatedActions = [...queuedActions, newAction];
    setQueuedActions(updatedActions);
    saveQueuedActions(updatedActions);

    // Try to sync immediately if online
    if (isOnline) {
      syncQueuedActions();
    }
  };

  const syncQueuedActions = async () => {
    if (isSyncing || queuedActions.length === 0) return;

    setIsSyncing(true);

    try {
      const pendingActions = queuedActions.filter(action => action.status === 'pending');

      for (const action of pendingActions) {
        // Update status to syncing
        setQueuedActions(prev =>
          prev.map(a => a.id === action.id ? { ...a, status: 'syncing' } : a)
        );

        try {
          // Simulate API call - replace with actual cart API
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Update status to completed
          setQueuedActions(prev =>
            prev.map(a => a.id === action.id ? { ...a, status: 'completed' } : a)
          );
        } catch (error) {
          // Update status to failed
          setQueuedActions(prev =>
            prev.map(a => a.id === action.id ? { ...a, status: 'failed' } : a)
          );
        }
      }

      // Clean up completed actions after a delay
      setTimeout(() => {
        setQueuedActions(prev => prev.filter(a => a.status !== 'completed'));
        saveQueuedActions(queuedActions.filter(a => a.status !== 'completed'));
      }, 3000);

    } catch (error) {
      console.error('Error syncing cart actions:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const pendingCount = queuedActions.filter(a => a.status === 'pending').length;
  const failedCount = queuedActions.filter(a => a.status === 'failed').length;

  if (queuedActions.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <ShoppingCart size={18} className="text-blue-600" />
            <span className="font-medium text-blue-900">Cart Sync</span>
          </div>

          {!isOnline && (
            <div className="flex items-center space-x-1 text-sm text-blue-700">
              <AlertCircle size={14} />
              <span>Offline - actions queued</span>
            </div>
          )}

          {isOnline && isSyncing && (
            <div className="flex items-center space-x-1 text-sm text-blue-700">
              <RefreshCw size={16} className="animate-spin" />
              <span>Syncing...</span>
            </div>
          )}

          {isOnline && !isSyncing && pendingCount > 0 && (
            <div className="flex items-center space-x-1 text-sm text-green-700">
              <CheckCircle size={14} />
              <span>Sync complete</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 text-sm">
          {pendingCount > 0 && (
            <span className="text-blue-600">
              {pendingCount} pending
            </span>
          )}
          {failedCount > 0 && (
            <span className="text-red-600">
              {failedCount} failed
            </span>
          )}
        </div>
      </div>

      {queuedActions.length > 0 && (
        <div className="mt-3 space-y-2">
          {queuedActions.slice(0, 3).map((action) => (
            <div
              key={action.id}
              className="flex items-center justify-between text-sm bg-white rounded p-2"
            >
              <div className="flex items-center space-x-2">
                <span className="capitalize text-gray-600">{action.type}</span>
                <span className="text-gray-900">Item {action.itemId}</span>
                <span className="text-gray-500">×{action.quantity}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {action.timestamp.toLocaleTimeString()}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  action.status === 'completed' ? 'bg-green-500' :
                  action.status === 'failed' ? 'bg-red-500' :
                  action.status === 'syncing' ? 'bg-blue-500 animate-pulse' :
                  'bg-gray-400'
                }`} />
              </div>
            </div>
          ))}

          {queuedActions.length > 3 && (
            <p className="text-xs text-gray-600 text-center">
              +{queuedActions.length - 3} more actions
            </p>
          )}
        </div>
      )}

      {failedCount > 0 && (
        <div className="mt-3">
          <button
            onClick={syncQueuedActions}
            disabled={isSyncing}
            className="text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-1 rounded transition-colors"
          >
            Retry Failed Actions
          </button>
        </div>
      )}
    </div>
  );
}

// Export hook for adding cart actions
export function useOfflineCartSync() {
  const addAction = (action: Omit<QueuedCartAction, 'id' | 'timestamp' | 'status'>) => {
    // This would be called from cart components
    const event = new CustomEvent('offline-cart-action', { detail: action });
    window.dispatchEvent(event);
  };

  return { addAction };
}