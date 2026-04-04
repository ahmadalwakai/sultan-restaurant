"use client";

import { useState, useEffect } from "react";
import { Box, VStack, HStack, Text, Button, Input, Textarea } from "@chakra-ui/react";
import { LuCalendar, LuClock, LuUsers, LuUser, LuMail, LuPhone, LuCheck, LuX, LuLoader } from "react-icons/lu";
import toast from "react-hot-toast";

type TableAvailability = {
  totalTables: number;
  availableTables: number;
  isAvailable: boolean;
  tables: { id: string; tableNumber: number; name: string; capacity: number }[];
};

export function ShishaBookingForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    bookingDate: "",
    bookingTime: "",
    guests: 2,
    notes: "",
  });

  const [availability, setAvailability] = useState<TableAvailability | null>(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{ tableNumber: number; time: string; endTime: string } | null>(null);

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  // Time slots (4 PM to 11 PM)
  const timeSlots = [];
  for (let h = 16; h <= 23; h++) {
    timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 23) timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
  }

  // Check availability when date, time, or guests change
  useEffect(() => {
    if (!formData.bookingDate || !formData.bookingTime) {
      setAvailability(null);
      return;
    }

    const checkAvailability = async () => {
      setChecking(true);
      try {
        const params = new URLSearchParams({
          date: formData.bookingDate,
          time: formData.bookingTime,
          guests: String(formData.guests),
        });
        const res = await fetch(`/api/shisha/tables/available?${params}`);
        const data = await res.json();
        if (data.success) {
          setAvailability(data.data);
        }
      } catch (error) {
        console.error("Error checking availability:", error);
      }
      setChecking(false);
    };

    checkAvailability();
  }, [formData.bookingDate, formData.bookingTime, formData.guests]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!availability?.isAvailable) {
      toast.error("No tables available for this time slot");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/shisha/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setBookingDetails({
          tableNumber: data.data.tableNumber,
          time: data.data.time,
          endTime: data.data.endTime,
        });
        toast.success("Shisha table booked successfully!");
      } else {
        toast.error(data.error || "Failed to book table");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  if (success && bookingDetails) {
    return (
      <VStack gap={6} py={8} textAlign="center">
        <Box
          w={16}
          h={16}
          borderRadius="full"
          bg="green.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <LuCheck size={32} color="white" />
        </Box>
        <VStack gap={2}>
          <Text fontSize="xl" fontWeight="700" color="white">Booking Confirmed!</Text>
          <Text color="whiteAlpha.800">
            Table #{bookingDetails.tableNumber} reserved
          </Text>
          <Text color="whiteAlpha.700" fontSize="sm">
            {formData.bookingDate} • {bookingDetails.time} - {bookingDetails.endTime}
          </Text>
        </VStack>
        <Text color="whiteAlpha.600" fontSize="sm" maxW="sm">
          A confirmation email has been sent to {formData.email}. 
          We look forward to seeing you!
        </Text>
        <Button
          variant="outline"
          borderColor="#C8A951"
          color="#C8A951"
          onClick={() => {
            setSuccess(false);
            setFormData({
              customerName: "",
              email: "",
              phone: "",
              bookingDate: "",
              bookingTime: "",
              guests: 2,
              notes: "",
            });
          }}
        >
          Make Another Booking
        </Button>
      </VStack>
    );
  }

  return (
    <VStack as="form" onSubmit={handleSubmit} gap={5} align="stretch">
      {/* Date & Time Row */}
      <HStack gap={4} flexWrap={{ base: "wrap", sm: "nowrap" }}>
        <Box flex={1} minW={{ base: "100%", sm: "auto" }}>
          <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
            <LuCalendar style={{ display: "inline", marginRight: "6px" }} />
            Date *
          </Text>
          <Input
            type="date"
            value={formData.bookingDate}
            onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
            min={today}
            required
            bg="rgba(255,255,255,0.05)"
            border="1px solid rgba(255,255,255,0.1)"
            color="white"
            _focus={{ borderColor: "#C8A951" }}
          />
        </Box>
        <Box flex={1} minW={{ base: "100%", sm: "auto" }}>
          <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
            <LuClock style={{ display: "inline", marginRight: "6px" }} />
            Time *
          </Text>
          <select
            value={formData.bookingTime}
            onChange={(e) => setFormData({ ...formData, bookingTime: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              color: "white",
              fontSize: "14px",
            }}
          >
            <option value="" style={{ background: "#1A0F0A" }}>Select time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot} style={{ background: "#1A0F0A" }}>
                {slot}
              </option>
            ))}
          </select>
        </Box>
      </HStack>

      {/* Guests */}
      <Box>
        <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
          <LuUsers style={{ display: "inline", marginRight: "6px" }} />
          Number of Guests *
        </Text>
        <select
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
          required
          style={{
            width: "100%",
            padding: "8px 12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            color: "white",
            fontSize: "14px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n} style={{ background: "#1A0F0A" }}>
              {n} {n === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </Box>

      {/* Availability Status */}
      {(formData.bookingDate && formData.bookingTime) && (
        <Box
          p={3}
          borderRadius="md"
          bg={checking ? "whiteAlpha.100" : availability?.isAvailable ? "green.900" : "red.900"}
          border="1px solid"
          borderColor={checking ? "whiteAlpha.200" : availability?.isAvailable ? "green.500" : "red.500"}
        >
          {checking ? (
            <HStack gap={2}>
              <LuLoader size={16} style={{ animation: "spin 1s linear infinite" }} />
              <Text fontSize="sm" color="whiteAlpha.700">Checking availability...</Text>
            </HStack>
          ) : availability ? (
            <HStack gap={2}>
              {availability.isAvailable ? (
                <>
                  <LuCheck size={16} color="#22C55E" />
                  <Text fontSize="sm" color="green.300">
                    {availability.availableTables} of {availability.totalTables} tables available
                  </Text>
                </>
              ) : (
                <>
                  <LuX size={16} color="#EF4444" />
                  <Text fontSize="sm" color="red.300">
                    No tables available. Please try a different time.
                  </Text>
                </>
              )}
            </HStack>
          ) : null}
        </Box>
      )}

      {/* Contact Details */}
      <Box>
        <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
          <LuUser style={{ display: "inline", marginRight: "6px" }} />
          Your Name *
        </Text>
        <Input
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          placeholder="Full name"
          required
          bg="rgba(255,255,255,0.05)"
          border="1px solid rgba(255,255,255,0.1)"
          color="white"
          _placeholder={{ color: "whiteAlpha.400" }}
          _focus={{ borderColor: "#C8A951" }}
        />
      </Box>

      <HStack gap={4} flexWrap={{ base: "wrap", sm: "nowrap" }}>
        <Box flex={1} minW={{ base: "100%", sm: "auto" }}>
          <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
            <LuMail style={{ display: "inline", marginRight: "6px" }} />
            Email *
          </Text>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
            required
            bg="rgba(255,255,255,0.05)"
            border="1px solid rgba(255,255,255,0.1)"
            color="white"
            _placeholder={{ color: "whiteAlpha.400" }}
            _focus={{ borderColor: "#C8A951" }}
          />
        </Box>
        <Box flex={1} minW={{ base: "100%", sm: "auto" }}>
          <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
            <LuPhone style={{ display: "inline", marginRight: "6px" }} />
            Phone *
          </Text>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="07xxx xxx xxx"
            required
            bg="rgba(255,255,255,0.05)"
            border="1px solid rgba(255,255,255,0.1)"
            color="white"
            _placeholder={{ color: "whiteAlpha.400" }}
            _focus={{ borderColor: "#C8A951" }}
          />
        </Box>
      </HStack>

      {/* Notes */}
      <Box>
        <Text fontSize="sm" color="whiteAlpha.700" mb={2}>Special Requests (Optional)</Text>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any special requests or preferences..."
          rows={3}
          bg="rgba(255,255,255,0.05)"
          border="1px solid rgba(255,255,255,0.1)"
          color="white"
          _placeholder={{ color: "whiteAlpha.400" }}
          _focus={{ borderColor: "#C8A951" }}
        />
      </Box>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        bg="#C8A951"
        color="#0D0906"
        w="full"
        fontWeight="700"
        borderRadius="lg"
        disabled={submitting || !availability?.isAvailable}
        _hover={{ bg: "#B89841" }}
        _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
      >
        {submitting ? "Booking..." : "Confirm Booking"}
      </Button>

      <Text fontSize="xs" color="whiteAlpha.500" textAlign="center">
        By booking, you confirm you are 18+ years old. Each booking includes 2.5 hours.
      </Text>
    </VStack>
  );
}
