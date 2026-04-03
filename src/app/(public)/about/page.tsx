import { SectionHeader } from "@/components/sections/SectionHeader";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import Image from "next/image";
import { Box, Container, Heading, VStack, Text } from "@chakra-ui/react";

export const metadata = { title: "About Us | Sultan Restaurant" };

export default function AboutPage() {
  return (
    <Box minH="screen">
      <Box position="relative" h="40vh" overflow="hidden">
        <Image
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80"
          alt="Sultan Restaurant"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center" bg="blackAlpha.500">
          <Heading fontFamily="heading" size="4xl" fontWeight="bold" color="white">Our Story</Heading>
        </Box>
      </Box>

      <Container maxW="4xl" px={4} py={16}>
        <SectionHeader title="About Sultan" />
        <VStack mt={8} gap={6} color="gray.600" textAlign="left" align="stretch">
          <Text>
            Sultan Restaurant has been serving authentic Indian and Bangladeshi
            cuisine for over a decade. Our passion for traditional flavours,
            combined with innovative presentation, creates a dining experience
            that&apos;s truly unforgettable.
          </Text>
          <Text>
            Our chefs bring generations of culinary expertise from South Asia,
            using only the finest ingredients and authentic spices to create
            dishes that transport you to the heart of the subcontinent.
          </Text>
          <Text>
            Whether you&apos;re joining us for a romantic dinner, family celebration,
            or a quick takeaway, we promise the same dedication to quality and
            flavour in every dish we serve.
          </Text>
        </VStack>
      </Container>

      <WhyChooseUs />
    </Box>
  );
}
