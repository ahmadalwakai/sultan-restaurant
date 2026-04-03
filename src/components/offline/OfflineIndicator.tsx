'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface OfflineIndicatorProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const POSITION_PROPS: Record<string, Record<string, number>> = {
  'top-right': { top: 4, right: 4 },
  'top-left': { top: 4, left: 4 },
  'bottom-right': { bottom: 4, right: 4 },
  'bottom-left': { bottom: 4, left: 4 },
};

const SIZE_MAP: Record<string, { box: number; icon: number }> = {
  sm: { box: 8, icon: 16 },
  md: { box: 10, icon: 20 },
  lg: { box: 12, icon: 24 },
};

export default function OfflineIndicator({
  position = 'top-right',
  showLabel = false,
  size = 'md'
}: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showIndicator) return null;

  const pos = POSITION_PROPS[position];
  const sizeConfig = SIZE_MAP[size];

  return (
    <Box
      position="fixed"
      {...pos}
      zIndex={40}
      transition="all 0.3s"
      opacity={showIndicator ? 1 : 0}
      transform={showIndicator ? 'translateY(0)' : 'translateY(0.5rem)'}
    >
      <Flex
        w={sizeConfig.box}
        h={sizeConfig.box}
        borderRadius="full"
        align="center"
        justify="center"
        shadow="lg"
        bg={isOnline ? 'green.500' : 'red.500'}
        color="white"
        className={!isOnline ? 'animate-pulse' : undefined}
        role="status"
        aria-label={isOnline ? 'Online' : 'Offline'}
      >
        {isOnline ? (
          <Wifi size={sizeConfig.icon} />
        ) : (
          <WifiOff size={sizeConfig.icon} />
        )}
      </Flex>

      {showLabel && (
        <Text
          position="absolute"
          top="full"
          mt={2}
          px={2}
          py={1}
          borderRadius="md"
          fontSize="xs"
          fontWeight="medium"
          whiteSpace="nowrap"
          bg={isOnline ? 'green.500' : 'red.500'}
          color="white"
        >
          {isOnline ? 'Online' : 'Offline'}
        </Text>
      )}
    </Box>
  );
}
