"use client";

import { useEffect, useRef } from "react";
import { BookingForm } from "@/components/forms/BookingForm";
import { brandColors, brandRadii, brandShadows, brandTypography } from "@/theme/branding";
import { zIndex } from "@/lib/design";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: zIndex.modal,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "32rem",
          borderRadius: brandRadii["2xl"],
          background: "#FFFFFF",
          padding: "1.5rem",
          boxShadow: brandShadows.overlay,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            fontSize: "1.5rem",
            color: "#9CA3AF",
            background: "none",
            border: "none",
            cursor: "pointer",
            lineHeight: 1,
            transition: "color 0.2s",
          }}
          className="booking-modal-close"
        >
          &times;
        </button>
        <h2
          style={{
            marginBottom: "1.5rem",
            fontFamily: brandTypography.fonts.heading,
            fontSize: "1.5rem",
            fontWeight: brandTypography.weights.bold,
            color: brandColors.charcoal,
          }}
        >
          Book a Table
        </h2>
        <BookingForm onSuccess={onClose} />
      </div>

      <style>{`
        .booking-modal-close:hover { color: ${brandColors.charcoal} !important; }
      `}</style>
    </div>
  );
}
