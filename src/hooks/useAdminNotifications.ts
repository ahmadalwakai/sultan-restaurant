"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { AdminNotification, NotificationsResponse } from "@/types/notification";

const STORAGE_KEY = "admin_notifications_last_seen";
const POLL_INTERVAL = 15000; // 15 seconds

interface UseAdminNotificationsReturn {
  notifications: AdminNotification[];
  unreadCount: number;
  latestNotification: AdminNotification | null;
  isLoading: boolean;
  error: string | null;
  showPopup: boolean;
  dismissPopup: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  refetch: () => void;
}

export function useAdminNotifications(): UseAdminNotificationsReturn {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [latestNotification, setLatestNotification] = useState<AdminNotification | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSeenRef = useRef<string | null>(null);
  const previousIdsRef = useRef<Set<string>>(new Set());

  // Initialize audio on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/sounds/notification.mp3");
      audio.loop = true;
      audioRef.current = audio;
      
      // Load last seen from localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        lastSeenRef.current = stored;
      }

      // Load read IDs from localStorage
      const storedReadIds = localStorage.getItem("admin_notifications_read");
      if (storedReadIds) {
        try {
          setReadIds(new Set(JSON.parse(storedReadIds)));
        } catch {
          // Ignore parse errors
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Save read IDs to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && readIds.size > 0) {
      localStorage.setItem("admin_notifications_read", JSON.stringify([...readIds]));
    }
  }, [readIds]);

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, ignore
      });
    }
  }, []);

  const stopSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      // Fetch last 24 hours of notifications
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      params.set("since", since);

      const response = await fetch(`/api/admin/notifications?${params.toString()}`);
      const result: NotificationsResponse = await response.json();

      if (result.success && result.data) {
        const newNotifications = result.data;
        
        // Check for new notifications (ones we haven't seen before)
        const currentIds = new Set(newNotifications.map(n => n.id));
        const newIds = newNotifications
          .filter(n => !previousIdsRef.current.has(n.id))
          .map(n => n.id);

        // If there are new notifications and we've fetched before
        if (newIds.length > 0 && previousIdsRef.current.size > 0) {
          const newest = newNotifications.find(n => newIds.includes(n.id));
          if (newest) {
            setLatestNotification(newest);
            setShowPopup(true);
            playSound();
          }
        }

        // Update previous IDs for next comparison
        previousIdsRef.current = currentIds;

        // Mark notifications with read status
        const notificationsWithReadStatus = newNotifications.map(n => ({
          ...n,
          read: readIds.has(n.id),
        }));

        setNotifications(notificationsWithReadStatus);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch notifications");
      }
    } catch (err) {
      setError("Network error fetching notifications");
      console.error("Error fetching notifications:", err);
    } finally {
      setIsLoading(false);
    }
  }, [readIds, playSound]);

  // Polling effect
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const dismissPopup = useCallback(() => {
    setShowPopup(false);
    stopSound();
    if (latestNotification) {
      setReadIds(prev => new Set([...prev, latestNotification.id]));
    }
  }, [stopSound, latestNotification]);

  const markAsRead = useCallback((id: string) => {
    setReadIds(prev => new Set([...prev, id]));
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    const allIds = notifications.map(n => n.id);
    setReadIds(prev => new Set([...prev, ...allIds]));
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read && !readIds.has(n.id)).length;

  return {
    notifications,
    unreadCount,
    latestNotification,
    isLoading,
    error,
    showPopup,
    dismissPopup,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
}
