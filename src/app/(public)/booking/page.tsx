import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container } from "@chakra-ui/react";

export const metadata = { title: "Booking | Sultan Restaurant" };

export default function BookingPage() {
  return (
    <Box minH="screen" bg="gray.50" py={16}>
      <Container maxW="2xl" px={4}>
        <SectionHeader
          title="Table Reservation"
          subtitle="Choose your preferred date and time"
        />
        <Box mt={8} rounded="2xl" bg="white" p={{ base: 6, sm: 8 }} shadow="lg">
          <BookingForm />
        </Box>
      </Container>
    </Box>
  );
}
