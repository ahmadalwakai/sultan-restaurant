'use client';

import { useState, useEffect } from 'react';
import { Menu, Clock, Wifi, WifiOff } from 'lucide-react';
import { Box, Button, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

interface CachedMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface CachedMenuCategory {
  id: string;
  name: string;
  items: CachedMenuItem[];
}

export default function OfflineMenuCache() {
  const [isOnline, setIsOnline] = useState(true);
  const [cachedMenu, setCachedMenu] = useState<CachedMenuCategory[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load cached menu data
    loadCachedMenu();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadCachedMenu = async () => {
    try {
      // Try to load from IndexedDB or localStorage
      const cached = localStorage.getItem('sultan_cached_menu');
      if (cached) {
        const menuData = JSON.parse(cached);
        setCachedMenu(menuData.categories || []);
        setLastUpdated(new Date(menuData.timestamp));
      }
    } catch (error) {
      console.error('Error loading cached menu:', error);
    }
  };

  if (isOnline || cachedMenu.length === 0) {
    return null;
  }

  return (
    <Box bg="amber.50" borderWidth="1px" borderColor="amber.200" borderRadius="lg" p={6} mb={6}>
      <Flex align="center" gap={3} mb={4}>
        <Flex align="center" gap={2} color="amber.700">
          <WifiOff size={20} />
          <Text fontWeight="medium">Offline Mode</Text>
        </Flex>
        {lastUpdated && (
          <Flex align="center" gap={1} fontSize="sm" color="amber.600">
            <Clock size={14} />
            <Text>Last updated: {lastUpdated.toLocaleDateString()}</Text>
          </Flex>
        )}
      </Flex>

      <VStack gap={4} align="stretch">
        <Flex align="center" gap={2} color="amber.800">
          <Menu size={18} />
          <Text fontWeight="medium">Cached Menu Available</Text>
        </Flex>

        <Text color="amber.700" fontSize="sm">
          You&apos;re viewing a cached version of our menu. Prices and availability may have changed.
          Connect to the internet to see the latest menu and place orders.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} mt={4}>
          {cachedMenu.slice(0, 6).map((category) => (
            <Box key={category.id} bg="white" borderRadius="lg" p={4} borderWidth="1px" borderColor="amber.200">
              <Heading size="sm" color="gray.900" mb={2}>{category.name}</Heading>
              <VStack gap={2} align="stretch">
                {category.items.slice(0, 3).map((item) => (
                  <Flex key={item.id} justify="space-between" align="center">
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="medium" color="gray.900">{item.name}</Text>
                      <Text fontSize="xs" color="gray.600" lineClamp={1}>{item.description}</Text>
                    </Box>
                    <Text fontSize="sm" fontWeight="medium" color="amber.700" ml={2}>
                      {String.fromCharCode(163)}{item.price.toFixed(2)}
                    </Text>
                  </Flex>
                ))}
                {category.items.length > 3 && (
                  <Text fontSize="xs" color="gray.500">
                    +{category.items.length - 3} more items
                  </Text>
                )}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        <Flex align="center" justify="space-between" pt={4} borderTopWidth="1px" borderColor="amber.200">
          <Text fontSize="sm" color="amber.700">
            Showing {cachedMenu.reduce((total, cat) => total + cat.items.length, 0)} cached items
          </Text>
          <Button
            onClick={() => window.location.reload()}
            size="sm"
            bg="amber.600"
            color="white"
            _hover={{ bg: "amber.700" }}
          >
            Refresh when online
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}
