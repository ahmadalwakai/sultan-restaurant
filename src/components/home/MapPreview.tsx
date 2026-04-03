import { Box } from "@chakra-ui/react";
import { SITE_CONFIG } from "@/lib/constants/site";

export function MapPreview() {
  return (
    <Box as="section" py={16}>
      <Box maxW="7xl" mx="auto" px={4}>
        <Box overflow="hidden" rounded="xl" shadow="lg">
          <iframe
            title="Sultan Restaurant Location"
            src={`https://www.google.com/maps/embed/v1/place?key=PLACEHOLDER&q=${encodeURIComponent(SITE_CONFIG.contact.address)}`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Box>
    </Box>
  );
}
