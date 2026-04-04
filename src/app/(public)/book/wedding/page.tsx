"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Box, Container, VStack, Heading, Text, Button, Input, Textarea, SimpleGrid } from "@chakra-ui/react";
import { LuHeart, LuCalendar, LuUsers, LuMail, LuPhone, LuUser, LuSparkles } from "react-icons/lu";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const weddingBookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  partnerName: z.string().min(2, "Partner name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.number().min(10, "Minimum 10 guests").max(200, "Maximum 200 guests"),
  specialRequests: z.string().optional(),
});

type WeddingFormValues = z.infer<typeof weddingBookingSchema>;

export default function WeddingBookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WeddingFormValues>({
    resolver: zodResolver(weddingBookingSchema),
  });

  const onSubmit = async (data: WeddingFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.name} & ${data.partnerName}`,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          guests: data.guests,
          bookingType: "WEDDING",
          specialRequests: data.specialRequests || "",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      reset();
      toast.success("Wedding Booking Submitted! We'll contact you within 24 hours.");
    } catch {
      toast.error("Submission failed. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Box minH="100vh" bg="linear-gradient(135deg, #0D0906 0%, #1A0F0A 100%)" py={20}>
        <Container maxW="2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <VStack gap={8} textAlign="center" color="white">
              <div style={{ fontSize: "80px" }}>💒</div>
              <Heading size="2xl" color="#C8A951">Thank You!</Heading>
              <Text fontSize="lg" color="whiteAlpha.800">
                Your wedding booking request has been received. Our events team will contact you within 24 hours to discuss your special celebration.
              </Text>
              <Link href="/">
                <Button
                  size="lg"
                  bg="#C8A951"
                  color="#0D0906"
                  _hover={{ bg: "#B89841" }}
                >
                  Return Home
                </Button>
              </Link>
            </VStack>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #0D0906 0%, #1A0F0A 100%)" py={16}>
      <Container maxW="4xl" px={{ base: 4, md: 8 }}>
        <VStack gap={10}>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", width: "100%" }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <LuHeart size={48} color="#C8A951" />
            </div>
            <Heading
              size="2xl"
              color="white"
              mb={4}
              fontFamily="heading"
            >
              Celebrate Your{" "}
              <span style={{ color: "#C8A951" }}>Wedding</span>{" "}
              With Us
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.700" maxW="xl" mx="auto">
              Create unforgettable memories at Sultan Restaurant. Our elegant venue and exquisite Middle Eastern cuisine will make your special day truly magical.
            </Text>
          </motion.div>

          {/* Features */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
            {[
              { icon: LuUsers, title: "Up to 200 Guests", desc: "Spacious venue for large celebrations" },
              { icon: LuSparkles, title: "Custom Menus", desc: "Personalized wedding feast" },
              { icon: LuCalendar, title: "Flexible Timing", desc: "Book your preferred date & time" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Box
                  bg="rgba(255,255,255,0.05)"
                  borderRadius="xl"
                  p={6}
                  textAlign="center"
                  border="1px solid rgba(200, 169, 81, 0.2)"
                >
                  <feature.icon size={32} color="#C8A951" style={{ margin: "0 auto 12px" }} />
                  <Text fontWeight="bold" color="white" mb={1}>{feature.title}</Text>
                  <Text fontSize="sm" color="whiteAlpha.600">{feature.desc}</Text>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ width: "100%" }}
          >
            <Box
              bg="rgba(255,255,255,0.03)"
              borderRadius="2xl"
              p={{ base: 6, md: 10 }}
              border="1px solid rgba(200, 169, 81, 0.3)"
            >
              <Heading size="lg" color="white" mb={6} textAlign="center">
                Request Wedding Booking
              </Heading>

              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={5}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={5} w="full">
                    {/* Your Name */}
                    <Box>
                      <Text fontSize="sm" color="whiteAlpha.700" mb={2}>Your Name *</Text>
                      <div style={{ position: "relative" }}>
                        <LuUser size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "#C8A951" }} />
                        <Input
                          {...register("name")}
                          placeholder="Your name"
                          bg="rgba(255,255,255,0.05)"
                          border="1px solid rgba(255,255,255,0.1)"
                          color="white"
                          pl="40px"
                          _placeholder={{ color: "whiteAlpha.400" }}
                          _focus={{ borderColor: "#C8A951" }}
                        />
                      </div>
                      {errors.name && <Text color="red.400" fontSize="xs" mt={1}>{errors.name.message}</Text>}
                    </Box>

                    {/* Partner Name */}
                    <Box>
                      <Text fontSize="sm" color="whiteAlpha.700" mb={2}>Partner's Name *</Text>
                      <div style={{ position: "relative" }}>
                        <LuHeart size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "#C8A951" }} />
                        <Input
                          {...register("partnerName")}
                          placeholder="Partner's name"
                          bg="rgba(255,255,255,0.05)"
                          border="1px solid rgba(255,255,255,0.1)"
                          color="white"
                          pl="40px"
                          _placeholder={{ color: "whiteAlpha.400" }}
                          _focus={{ borderColor: "#C8A951" }}
                        />
                      </div>
                      {errors.partnerName && <Text color="red.400" fontSize="xs" mt={1}>{errors.partnerName.message}</Text>}
                    </Box>

                    {/* Email */}
                    <Box>
                      <Text fontSize="sm" color="whiteAlpha.700" mb={2}>Email *</Text>
                      <div style={{ position: "relative" }}>
                        <LuMail size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "#C8A951" }} />
                        <Input
                          {...register("email")}
                          type="email"
                          placeholder="your@email.com"
                          bg="rgba(255,255,255,0.05)"
                          border="1px solid rgba(255,255,255,0.1)"
                          color="white"
                          pl="40px"
                          _placeholder={{ color: "whiteAlpha.400" }}
                          _focus={{ borderColor: "#C8A951" }}
                        />
                      </div>
                      {errors.email && <Text color="red.400" fontSize="xs" mt={1}>{errors.email.message}</Text>}
                    </Box>

                    {/* Phone */}
                    <Box>
                      <Text fontSize="sm" color="whiteAlpha.700" mb={2}>Phone *</Text>
                      <div style={{ position: "relative" }}>
                        <LuPhone size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "#C8A951" }} />
                        <Input
                          {...register("phone")}
                          type="tel"
                          placeholder="+44 xxx xxx xxxx"
                          bg="rgba(255,255,255,0.05)"
                          border="1px solid rgba(255,255,255,0.1)"
                          color="white"
                          pl="40px"
                          _placeholder={{ color: "whiteAlpha.400" }}
                          _focus={{ borderColor: "#C8A951" }}
                        />
                      </div>
                      {errors.phone && <Text color="red.400" fontSize="xs" mt={1}>{errors.phone.message}</Text>}
                    </Box>

                    {/* Date */}
                    <Box>
                      <Text fontSize="sm" color="whiteAlpha.700" mb={2}>Wedding Date *</Text>
                      <div style={{ position: "relative" }}>
                        <LuCalendar size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "#C8A951" }} />
                        <Input
                          {...register("date")}
                          type="date"
                          bg="rgba(255,255,255,0.05)"
                          border="1px solid rgba(255,255,255,0.1)"
                          color="white"
                          pl="40px"
                          _focus={{ borderColor: "#C8A951" }}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      {errors.date && <Text color="red.400" fontSize="xs" mt={1}>{errors.date.message}</Text>}
                    </Box>

                    {/* Time */}
                    <Box>
                      <Text fontSize="sm" color="whiteAlpha.700" mb={2}>Preferred Time *</Text>
                      <select
                        {...register("time")}
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
                        <option value="12:00" style={{ background: "#1A0F0A" }}>12:00 PM</option>
                        <option value="13:00" style={{ background: "#1A0F0A" }}>1:00 PM</option>
                        <option value="14:00" style={{ background: "#1A0F0A" }}>2:00 PM</option>
                        <option value="15:00" style={{ background: "#1A0F0A" }}>3:00 PM</option>
                        <option value="16:00" style={{ background: "#1A0F0A" }}>4:00 PM</option>
                        <option value="17:00" style={{ background: "#1A0F0A" }}>5:00 PM</option>
                        <option value="18:00" style={{ background: "#1A0F0A" }}>6:00 PM</option>
                        <option value="19:00" style={{ background: "#1A0F0A" }}>7:00 PM</option>
                        <option value="20:00" style={{ background: "#1A0F0A" }}>8:00 PM</option>
                      </select>
                      {errors.time && <Text color="red.400" fontSize="xs" mt={1}>{errors.time.message}</Text>}
                    </Box>

                    {/* Guests */}
                    <Box gridColumn={{ md: "span 2" }}>
                      <Text fontSize="sm" color="whiteAlpha.700" mb={2}>Number of Guests *</Text>
                      <div style={{ position: "relative" }}>
                        <LuUsers size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "#C8A951" }} />
                        <Input
                          {...register("guests", { valueAsNumber: true })}
                          type="number"
                          placeholder="50"
                          min={10}
                          max={200}
                          bg="rgba(255,255,255,0.05)"
                          border="1px solid rgba(255,255,255,0.1)"
                          color="white"
                          pl="40px"
                          _placeholder={{ color: "whiteAlpha.400" }}
                          _focus={{ borderColor: "#C8A951" }}
                        />
                      </div>
                      {errors.guests && <Text color="red.400" fontSize="xs" mt={1}>{errors.guests.message}</Text>}
                    </Box>
                  </SimpleGrid>

                  {/* Special Requests */}
                  <Box w="full">
                    <Text fontSize="sm" color="whiteAlpha.700" mb={2}>Special Requests & Details</Text>
                    <Textarea
                      {...register("specialRequests")}
                      placeholder="Tell us about your wedding plans, dietary requirements, decorations, etc."
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid rgba(255,255,255,0.1)"
                      color="white"
                      rows={4}
                      _placeholder={{ color: "whiteAlpha.400" }}
                      _focus={{ borderColor: "#C8A951" }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    size="lg"
                    w="full"
                    bg="#C8A951"
                    color="#0D0906"
                    fontWeight="bold"
                    _hover={{ bg: "#B89841" }}
                    loading={isSubmitting}
                    loadingText="Submitting..."
                  >
                    <LuHeart style={{ marginRight: "8px" }} />
                    Submit Wedding Booking Request
                  </Button>

                  <Text fontSize="xs" color="whiteAlpha.500" textAlign="center">
                    Our events team will contact you within 24 hours to discuss details and pricing.
                  </Text>
                </VStack>
              </form>
            </Box>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
}
