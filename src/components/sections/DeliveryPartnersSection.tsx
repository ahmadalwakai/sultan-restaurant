"use client";

import { Box, VStack, HStack, Image } from "@chakra-ui/react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";

const partners = [
  { name: "Uber Eats", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_Eats_2020_logo.svg/320px-Uber_Eats_2020_logo.svg.png" },
  { name: "Deliveroo", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Deliveroo_logo.svg/320px-Deliveroo_logo.svg.png" },
  { name: "Just Eat", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Just_Eat_logo.svg/320px-Just_Eat_logo.svg.png" },
];

export function DeliveryPartnersSection() {
  return (
    <Box as="section" py={16}>
      <Box maxW="5xl" mx="auto" px={4} textAlign="center">
        <FadeInUp>
          <SectionTitle
            title="Order Through Our Partners"
            subtitle="Available on all major delivery platforms"
          />
        </FadeInUp>
        <StaggerContainer staggerDelay={0.2}>
          <HStack mt={10} flexWrap="wrap" justify="center" gap={12}>
          {partners.map((partner) => (
            <StaggerItem key={partner.name}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h={20}
                w={40}
                filter="grayscale(100%)"
                transition="all 0.4s ease"
                _hover={{ filter: "grayscale(0%)", transform: "scale(1.1)" }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  w="full"
                  h="full"
                  objectFit="contain"
                />
              </Box>
            </StaggerItem>
          ))}
          </HStack>
        </StaggerContainer>
      </Box>
    </Box>
  );
}
