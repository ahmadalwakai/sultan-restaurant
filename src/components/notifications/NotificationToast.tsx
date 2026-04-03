'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

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
    bg: 'green.50',
    borderColor: 'green.200',
    textColor: 'green.800',
    icon: CheckCircle,
    iconColor: 'green.600',
  },
  error: {
    bg: 'red.50',
    borderColor: 'red.200',
    textColor: 'red.800',
    icon: AlertCircle,
    iconColor: 'red.600',
  },
  warning: {
    bg: 'yellow.50',
    borderColor: 'yellow.200',
    textColor: 'yellow.800',
    icon: AlertTriangle,
    iconColor: 'yellow.600',
  },
  info: {
    bg: 'blue.50',
    borderColor: 'blue.200',
    textColor: 'blue.800',
    icon: Info,
    iconColor: 'blue.600',
  },
};

const shrink = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

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
    <Box
      position="fixed"
      top={4}
      right={4}
      zIndex={50}
      maxW="sm"
      w="full"
      transition="all 0.3s ease-in-out"
      transform={isVisible && !isExiting ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)'}
      opacity={isVisible && !isExiting ? 1 : 0}
    >
      <Box
        position="relative"
        p={4}
        rounded="lg"
        border="1px"
        borderColor={style.borderColor}
        bg={style.bg}
        color={style.textColor}
        shadow="lg"
        backdropFilter="blur(4px)"
      >
        <Flex align="flex-start" gap={3}>
          <Box flexShrink={0} mt={0.5}>
            <Icon size={20} color={style.iconColor} />
          </Box>

          <Box flex={1} minW={0}>
            <Text fontSize="sm" fontWeight="semibold">{title}</Text>
            {message && (
              <Text fontSize="sm" opacity={0.9} mt={1}>{message}</Text>
            )}

            {action && (
              <Button
                variant="ghost"
                size="sm"
                fontWeight="medium"
                textDecoration="underline"
                mt={2}
                _hover={{ opacity: 0.8 }}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
          </Box>

          <Button
            variant="ghost"
            size="sm"
            p={1}
            rounded="md"
            _hover={{ bg: "blackAlpha.100" }}
            flexShrink={0}
            onClick={handleClose}
            aria-label="Close notification"
          >
            <X size={16} />
          </Button>
        </Flex>

        {/* Progress bar for auto-close */}
        {duration > 0 && (
          <Box position="absolute" bottom={0} left={0} right={0} h={1} bg="blackAlpha.100" roundedBottom="lg" overflow="hidden">
            <Box
              h="full"
              bg="currentColor"
              opacity={0.5}
              animation={`${shrink} ${duration}ms linear forwards`}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}