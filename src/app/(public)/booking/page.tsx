import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, Card } from "@chakra-ui/react";

export const metadata = { title: "Booking | Sultan Restaurant" };

export default function BookingPage() {
  return (
    <Box minH="screen" bg="bg.canvas" py={16}>
      <Container maxW="2xl" px={4}>
        <SectionHeader
          title="Table Reservation"
          subtitle="Choose your preferred date and time"
        />
        <Card.Root mt={8} bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden">
          <Card.Body p={{ base: 6, sm: 8 }}>
            <BookingForm />
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
