'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, BellOff, Settings } from 'lucide-react';
import { Box, Button, HStack, Text } from '@chakra-ui/react';

interface PushNotificationManagerProps {
  className?: string;
}

interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export default function PushNotificationManager({ className }: PushNotificationManagerProps) {
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: true,
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check current permission status
    if ('Notification' in window) {
      const currentPermission = Notification.permission;
      setPermission({
        granted: currentPermission === 'granted',
        denied: currentPermission === 'denied',
        default: currentPermission === 'default',
      });
    }

    // Check if service worker is registered and subscription exists
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = useCallback(async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    setIsLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPermission({
        granted: result === 'granted',
        denied: result === 'denied',
        default: result === 'default',
      });

      if (result === 'granted') {
        await subscribeToNotifications();
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push notifications not supported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // You'll need to replace this with your actual VAPID public key
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidPublicKey) {
        console.warn('VAPID public key not configured');
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      // Send subscription to your server
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      setIsSubscribed(true);
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
    }
  };

  const unsubscribeFromNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        });
      }

      setIsSubscribed(false);
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const getStatusText = () => {
    if (permission.denied) return 'Notifications blocked';
    if (permission.default) return 'Enable notifications';
    if (isSubscribed) return 'Notifications enabled';
    return 'Subscribe to notifications';
  };

  const getStatusIcon = () => {
    if (permission.denied) return <BellOff size={20} />;
    if (isSubscribed) return <Bell size={20} />;
    return <Settings size={20} />;
  };

  const handleAction = () => {
    if (permission.denied) {
      // Open browser settings
      alert('Please enable notifications in your browser settings');
      return;
    }

    if (permission.default) {
      requestPermission();
      return;
    }

    if (isSubscribed) {
      unsubscribeFromNotifications();
    } else {
      subscribeToNotifications();
    }
  };

  return (
    <HStack gap={3} className={className}>
      <HStack gap={2}>
        <Box as="span">
          {getStatusIcon()}
        </Box>
        <Text fontSize="sm" fontWeight="medium">
          {getStatusText()}
        </Text>
      </HStack>

      <Button
        onClick={handleAction}
        disabled={isLoading}
        px={4}
        py={2}
        fontSize="sm"
        fontWeight="medium"
        rounded="lg"
        transition="colors"
        bg={permission.denied ? 'gray.100' : isSubscribed ? 'red.100' : 'orange.100'}
        color={permission.denied ? 'gray.400' : isSubscribed ? 'red.700' : 'orange.700'}
        _hover={{
          bg: permission.denied ? 'gray.100' : isSubscribed ? 'red.200' : 'orange.200'
        }}
        opacity={isLoading ? 0.5 : 1}
        cursor={isLoading ? 'not-allowed' : 'pointer'}
      >
        {isLoading ? 'Loading...' : permission.denied ? 'Settings' : isSubscribed ? 'Disable' : 'Enable'}
      </Button>
    </HStack>
  );
}