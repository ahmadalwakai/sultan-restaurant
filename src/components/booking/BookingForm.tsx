"use client";

import { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import BookingStepper from "./BookingStepper";
import BookingDatePicker from "./BookingDatePicker";
import BookingTimePicker from "./BookingTimePicker";
import BookingGuestSelector from "./BookingGuestSelector";
import BookingCustomerForm from "./BookingCustomerForm";
import BookingTerms from "./BookingTerms";

const steps = ["Date & Time", "Details", "Confirm"];

interface BookingFormProps {
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    if (field === "name") setName(value);
    else if (field === "email") setEmail(value);
    else if (field === "phone") setPhone(value);
    else if (field === "notes") setNotes(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit({ date, time, guests, name, email, phone, notes });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto">
      <VStack gap={6} align="stretch">
        <BookingStepper currentStep={step} steps={steps} />
        {step === 0 && (
          <>
            <BookingDatePicker selectedDate={date} onSelect={setDate} />
            {date && <BookingTimePicker selectedTime={time} onSelect={setTime} />}
            <BookingGuestSelector guests={guests} onChange={setGuests} />
            <Button colorPalette="brand" onClick={() => setStep(1)} disabled={!date || !time}>Next</Button>
          </>
        )}
        {step === 1 && (
          <>
            <BookingCustomerForm name={name} email={email} phone={phone} notes={notes} onChange={handleFieldChange} />
            <BookingTerms accepted={termsAccepted} onChange={setTermsAccepted} />
            <Button colorPalette="brand" onClick={() => setStep(2)} disabled={!name || !email || !phone || !termsAccepted}>Review</Button>
          </>
        )}
        {step === 2 && (
          <>
            <Button colorPalette="brand" onClick={handleSubmit} loading={loading}>Confirm Booking</Button>
            <Button variant="ghost" onClick={() => setStep(1)}>Go Back</Button>
          </>
        )}
      </VStack>
    </Box>
  );
}
