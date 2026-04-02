'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface NotificationToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toastStyles = {
  success: {
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-600',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon: AlertCircle,
    iconColor: 'text-red-600',
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    text: 'text-yellow-800',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon: Info,
    iconColor: 'text-blue-600',
  },
};

export default function NotificationToast({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  action,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const style = toastStyles[type];
  const Icon = style.icon;

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Auto-close after duration
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match transition duration
  };

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ease-in-out',
        'safe-area-top mt-safe',
        isVisible && !isExiting
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-2 scale-95'
      )}
    >
      <div
        className={cn(
          'relative p-4 rounded-lg border shadow-lg backdrop-blur-sm',
          style.bg,
          style.text
        )}
      >
        <div className="flex items-start space-x-3">
          <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', style.iconColor)} />

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold">{title}</h4>
            {message && (
              <p className="text-sm opacity-90 mt-1">{message}</p>
            )}

            {action && (
              <button
                onClick={action.onClick}
                className="text-sm font-medium underline mt-2 hover:opacity-80 transition-opacity"
              >
                {action.label}
              </button>
            )}
          </div>

          <button
            onClick={handleClose}
            className="p-1 rounded-md hover:bg-black/10 transition-colors flex-shrink-0"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar for auto-close */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-lg overflow-hidden">
            <div
              className="h-full bg-current opacity-50 transition-all duration-100 ease-linear"
              style={{
                animation: `shrink ${duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}