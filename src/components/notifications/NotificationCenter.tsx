'use client';

import { useState, useEffect } from 'react';
import { Bell, Settings, Trash2 } from 'lucide-react';
import { Box, VStack, HStack, Button, Text } from '@chakra-ui/react';
import NotificationToast from './NotificationToast';

interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationCenterProps {
  className?: string;
}

export default function NotificationCenter({ className }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Load notifications from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('restaurant-notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const notificationsWithDates = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
        setNotifications(notificationsWithDates);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('restaurant-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast for new notifications
    showToast(newNotification);
  };

  const showToast = (notification: NotificationItem) => {
    // This would integrate with a toast system
    console.log('Showing toast:', notification);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n =>
    filter === 'all' || !n.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Box position="relative" className={className}>
      {/* Notification Bell */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        p={2}
        rounded="lg"
        _hover={{ bg: "gray.100" }}
        transition="colors"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        variant="ghost"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <Box
            position="absolute"
            top="-4px"
            right="-4px"
            bg="red.500"
            color="white"
            fontSize="xs"
            rounded="full"
            w={5}
            h={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Box>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <Box
          position="absolute"
          right={0}
          top="100%"
          mt={2}
          w={80}
          maxH={96}
          bg="white"
          rounded="lg"
          shadow="lg"
          border="1px"
          borderColor="gray.200"
          zIndex={50}
        >
          {/* Header */}
          <Box p={4} borderBottom="1px" borderColor="gray.200">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                Notifications
              </Text>
            <HStack gap={2}>
                {notifications.length > 0 && (
                  <>
                    <Button
                      onClick={markAllAsRead}
                      size="sm"
                      color="orange.600"
                      _hover={{ color: "orange.700" }}
                      variant="ghost"
                    >
                      Mark all read
                    </Button>
                    <Button
                      onClick={clearAll}
                      p={1}
                      rounded="md"
                      _hover={{ bg: "gray.100" }}
                      aria-label="Clear all notifications"
                      variant="ghost"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => setIsOpen(false)}
                  p={1}
                  rounded="md"
                  _hover={{ bg: "gray.100" }}
                  aria-label="Close notifications"
                  variant="ghost"
                >
                  <svg width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </HStack>
            </HStack>

            {/* Filter Tabs */}
            <HStack gap={1} mt={3}>
              <Button
                onClick={() => setFilter('all')}
                px={3}
                py={1}
                fontSize="sm"
                rounded="md"
                transition="colors"
                bg={filter === 'all' ? 'orange.100' : undefined}
                color={filter === 'all' ? 'orange.700' : 'gray.600'}
                _hover={{ bg: filter === 'all' ? 'orange.100' : 'gray.100' }}
                variant="ghost"
              >
                All ({notifications.length})
              </Button>
              <Button
                onClick={() => setFilter('unread')}
                px={3}
                py={1}
                fontSize="sm"
                rounded="md"
                transition="colors"
                bg={filter === 'unread' ? 'orange.100' : undefined}
                color={filter === 'unread' ? 'orange.700' : 'gray.600'}
                _hover={{ bg: filter === 'unread' ? 'orange.100' : 'gray.100' }}
                variant="ghost"
              >
                Unread ({unreadCount})
              </Button>
            </HStack>
          </Box>

          {/* Notifications List */}
          <Box maxH={64} overflowY="auto">
            {filteredNotifications.length === 0 ? (
              <VStack p={8} textAlign="center" color="gray.500">
                <Bell size={32} opacity={0.5} />
                <Text fontSize="sm">No notifications</Text>
              </VStack>
            ) : (
              filteredNotifications.map((notification) => (
                <Box
                  key={notification.id}
                  p={4}
                  borderBottom="1px"
                  borderColor="gray.100"
                  _hover={{ bg: "gray.50" }}
                  transition="colors"
                  bg={!notification.read ? "blue.50" : undefined}
                >
                  <HStack justify="space-between" align="start">
                    <Box flex={1} minW={0}>
                      <HStack gap={2} align="center">
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.900"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {notification.title}
                        </Text>
                        {!notification.read && (
                          <Box w={2} h={2} bg="blue.500" rounded="full" flexShrink={0} />
                        )}
                      </HStack>
                      {notification.message && (
                        <Box
                          fontSize="sm"
                          color="gray.600"
                          mt={1}
                          maxH="3rem"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {notification.message}
                        </Box>
                      )}
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        {formatTimestamp(notification.timestamp)}
                      </Text>
                    </Box>

                    <HStack gap={1} ml={2}>
                      {notification.action && (
                        <Button
                          onClick={() => {
                            notification.action?.onClick();
                            markAsRead(notification.id);
                          }}
                          fontSize="xs"
                          color="orange.600"
                          _hover={{ color: "orange.700" }}
                          fontWeight="medium"
                          variant="ghost"
                        >
                          {notification.action.label}
                        </Button>
                      )}
                      <Button
                        onClick={() => removeNotification(notification.id)}
                        p={1}
                        rounded="md"
                        _hover={{ bg: "gray.200" }}
                        aria-label="Remove notification"
                        variant="ghost"
                      >
                        <svg width={12} height={12} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </Button>
                    </HStack>
                  </HStack>
                </Box>
              ))
            )}
          </Box>

          {/* Footer */}
          <Box p={4} borderTop="1px" borderColor="gray.200">
            <Button
              w="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              fontSize="sm"
              color="gray.600"
              _hover={{ bg: "gray.50" }}
              rounded="lg"
              transition="colors"
              variant="ghost"
            >
              <Settings size={16} />
              <Text>Notification Settings</Text>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

// Export function to add notifications from anywhere in the app
export const addNotification = (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
  // This would need to be implemented with a global notification context
  console.log('Add notification:', notification);
};