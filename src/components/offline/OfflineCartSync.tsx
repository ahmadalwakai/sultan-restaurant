'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

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
        setQueuedActions(prev =>
          prev.map(a => a.id === action.id ? { ...a, status: 'syncing' } : a)
        );

        try {
          await new Promise(resolve => setTimeout(resolve, 1000));

          setQueuedActions(prev =>
            prev.map(a => a.id === action.id ? { ...a, status: 'completed' } : a)
          );
        } catch (error) {
          setQueuedActions(prev =>
            prev.map(a => a.id === action.id ? { ...a, status: 'failed' } : a)
          );
        }
      }

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

  const STATUS_COLORS: Record<string, string> = {
    completed: 'bg-green-500',
    failed: 'bg-red-500',
    syncing: 'bg-blue-500 animate-pulse',
    pending: 'bg-gray-400',
  };

  if (queuedActions.length === 0) {
    return null;
  }

  return (
    <Box bg="blue.50" borderWidth="1px" borderColor="blue.200" borderRadius="lg" p={4} mb={4}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={3}>
          <Flex align="center" gap={2}>
            <ShoppingCart size={18} className="text-blue-600" />
            <Text fontWeight="medium" color="blue.900">Cart Sync</Text>
          </Flex>

          {!isOnline && (
            <Flex align="center" gap={1} fontSize="sm" color="blue.700">
              <AlertCircle size={14} />
              <Text>Offline - actions queued</Text>
            </Flex>
          )}

          {isOnline && isSyncing && (
            <Flex align="center" gap={1} fontSize="sm" color="blue.700">
              <RefreshCw size={16} className="animate-spin" />
              <Text>Syncing...</Text>
            </Flex>
          )}

          {isOnline && !isSyncing && pendingCount > 0 && (
            <Flex align="center" gap={1} fontSize="sm" color="green.700">
              <CheckCircle size={14} />
              <Text>Sync complete</Text>
            </Flex>
          )}
        </Flex>

        <Flex align="center" gap={4} fontSize="sm">
          {pendingCount > 0 && (
            <Text color="blue.600">
              {pendingCount} pending
            </Text>
          )}
          {failedCount > 0 && (
            <Text color="red.600">
              {failedCount} failed
            </Text>
          )}
        </Flex>
      </Flex>

      {queuedActions.length > 0 && (
        <VStack mt={3} gap={2} align="stretch">
          {queuedActions.slice(0, 3).map((action) => (
            <Flex
              key={action.id}
              align="center"
              justify="space-between"
              fontSize="sm"
              bg="white"
              borderRadius="md"
              p={2}
            >
              <Flex align="center" gap={2}>
                <Text textTransform="capitalize" color="gray.600">{action.type}</Text>
                <Text color="gray.900">Item {action.itemId}</Text>
                <Text color="gray.500">{String.fromCharCode(215)}{action.quantity}</Text>
              </Flex>

              <Flex align="center" gap={2}>
                <Text fontSize="xs" color="gray.500">
                  {action.timestamp.toLocaleTimeString()}
                </Text>
                <Box
                  w={2}
                  h={2}
                  borderRadius="full"
                  className={STATUS_COLORS[action.status] || 'bg-gray-400'}
                />
              </Flex>
            </Flex>
          ))}

          {queuedActions.length > 3 && (
            <Text fontSize="xs" color="gray.600" textAlign="center">
              +{queuedActions.length - 3} more actions
            </Text>
          )}
        </VStack>
      )}

      {failedCount > 0 && (
        <Box mt={3}>
          <Button
            onClick={syncQueuedActions}
            disabled={isSyncing}
            size="sm"
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.700" }}
            _disabled={{ bg: "blue.400" }}
          >
            Retry Failed Actions
          </Button>
        </Box>
      )}
    </Box>
  );
}

// Export hook for adding cart actions
export function useOfflineCartSync() {
  const addAction = (action: Omit<QueuedCartAction, 'id' | 'timestamp' | 'status'>) => {
    const event = new CustomEvent('offline-cart-action', { detail: action });
    window.dispatchEvent(event);
  };

  return { addAction };
}
