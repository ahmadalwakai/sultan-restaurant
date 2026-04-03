"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuPlus, LuMinus, LuShoppingCart, LuClock, LuFlame } from "react-icons/lu";
import { DietaryBadgeList, SpiceLevel } from "./DietaryBadges";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  dietary?: string[];
  spiceLevel?: 0 | 1 | 2 | 3;
  prepTime?: string;
  calories?: number;
}

interface QuickViewModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (item: MenuItem, quantity: number) => void;
}

/**
 * Quick-view modal for menu items
 */
export function QuickViewModal({ item, isOpen, onClose, onAddToCart }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(4px)",
              zIndex: 9998,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#1A0F0A",
              borderRadius: "24px",
              overflow: "hidden",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "90vh",
              zIndex: 9999,
              border: "1px solid rgba(200, 169, 81, 0.2)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.5)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <LuX size={20} color="#FFFFFF" />
            </button>

            {/* Image */}
            {item.image && (
              <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}

            {/* Content */}
            <div style={{ padding: "24px" }}>
              <h2 style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>
                {item.name}
              </h2>

              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>
                {item.description}
              </p>

              {/* Meta info */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                {item.prepTime && (
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
                    <LuClock size={14} />
                    {item.prepTime}
                  </span>
                )}
                {item.calories && (
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
                    {item.calories} cal
                  </span>
                )}
                {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                  <SpiceLevel level={item.spiceLevel} />
                )}
              </div>

              {/* Dietary badges */}
              {item.dietary && item.dietary.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <DietaryBadgeList types={item.dietary as any} />
                </div>
              )}

              {/* Price and quantity */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ color: "#C8A951", fontSize: "28px", fontWeight: 700 }}>
                  £{item.price.toFixed(2)}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(200, 169, 81, 0.1)",
                      border: "1px solid rgba(200, 169, 81, 0.3)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LuMinus size={18} color="#C8A951" />
                  </button>
                  <span style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 600, minWidth: "32px", textAlign: "center" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(200, 169, 81, 0.1)",
                      border: "1px solid rgba(200, 169, 81, 0.3)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LuPlus size={18} color="#C8A951" />
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onAddToCart?.(item, quantity);
                  onClose();
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #C8A951 0%, #E8D48A 50%, #C8A951 100%)",
                  color: "#1A0F0A",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <LuShoppingCart size={20} />
                Add to Cart - £{(item.price * quantity).toFixed(2)}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
