"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import {
  LuPlus,
  LuMinus,
  LuChevronRight,
  LuShoppingCart,
  LuFlame,
  LuLeaf,
  LuCheck,
} from "react-icons/lu";

const categories = [
  {
    id: "proteins",
    name: "Choose Proteins",
    subtitle: "Pick up to 3",
    maxItems: 3,
    items: [
      { id: "chicken-shawarma", name: "Chicken Shawarma", price: 4.5, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=120&h=80&fit=crop&q=80" },
      { id: "lamb-kofta", name: "Lamb Kofta", price: 5.0, image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=120&h=80&fit=crop&q=80" },
      { id: "beef-kebab", name: "Beef Kebab", price: 5.5, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=120&h=80&fit=crop&q=80" },
      { id: "falafel", name: "Falafel (V)", price: 3.5, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=120&h=80&fit=crop&q=80", isVeg: true },
      { id: "grilled-halloumi", name: "Grilled Halloumi", price: 4.0, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=120&h=80&fit=crop&q=80", isVeg: true },
    ],
  },
  {
    id: "sides",
    name: "Choose Sides",
    subtitle: "Pick up to 4",
    maxItems: 4,
    items: [
      { id: "hummus", name: "Hummus", price: 2.0, image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=120&h=80&fit=crop&q=80", isVeg: true },
      { id: "baba-ganoush", name: "Baba Ganoush", price: 2.5, image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=120&h=80&fit=crop&q=80", isVeg: true },
      { id: "tabbouleh", name: "Tabbouleh", price: 2.0, image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=120&h=80&fit=crop&q=80", isVeg: true },
      { id: "fattoush", name: "Fattoush", price: 2.5, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=80&fit=crop&q=80", isVeg: true },
      { id: "garlic-sauce", name: "Garlic Sauce", price: 1.0, image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=120&h=80&fit=crop&q=80" },
      { id: "chilli-sauce", name: "Chilli Sauce", price: 1.0, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=120&h=80&fit=crop&q=80", isSpicy: true },
    ],
  },
  {
    id: "extras",
    name: "Add Extras",
    subtitle: "Optional",
    maxItems: 10,
    items: [
      { id: "pita", name: "Fresh Pita (2pc)", price: 1.5, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=120&h=80&fit=crop&q=80", isVeg: true },
      { id: "rice", name: "Basmati Rice", price: 2.0, image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=120&h=80&fit=crop&q=80", isVeg: true },
      { id: "pickles", name: "Mixed Pickles", price: 1.0, image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=120&h=80&fit=crop&q=80", isVeg: true },
      { id: "olives", name: "Marinated Olives", price: 1.5, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=120&h=80&fit=crop&q=80", isVeg: true },
    ],
  },
];

interface SelectedItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

/**
 * Build Your Own Platter - interactive builder component
 */
export function BuildYourPlatter() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, SelectedItem[]>>({
    proteins: [],
    sides: [],
    extras: [],
  });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentCategory = categories[currentStep];

  const handleAddItem = (item: (typeof categories)[0]["items"][0]) => {
    const categoryId = currentCategory.id;
    const existing = selections[categoryId].find((s) => s.id === item.id);

    if (existing) {
      // Increment quantity
      setSelections((prev) => ({
        ...prev,
        [categoryId]: prev[categoryId].map((s) =>
          s.id === item.id ? { ...s, quantity: s.quantity + 1 } : s
        ),
      }));
    } else {
      // Check max items
      const totalItems = selections[categoryId].reduce((sum, s) => sum + s.quantity, 0);
      if (totalItems >= currentCategory.maxItems) return;

      setSelections((prev) => ({
        ...prev,
        [categoryId]: [...prev[categoryId], { ...item, quantity: 1 }],
      }));
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const categoryId = currentCategory.id;
    setSelections((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId]
        .map((s) => (s.id === itemId ? { ...s, quantity: s.quantity - 1 } : s))
        .filter((s) => s.quantity > 0),
    }));
  };

  const getItemQuantity = (itemId: string) => {
    const categoryId = currentCategory.id;
    const item = selections[categoryId].find((s) => s.id === itemId);
    return item?.quantity || 0;
  };

  const getTotalItemsInCategory = () => {
    const categoryId = currentCategory.id;
    return selections[categoryId].reduce((sum, s) => sum + s.quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.values(selections)
      .flat()
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getAllSelections = () => {
    return Object.values(selections).flat();
  };

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "80px 0",
        background: "linear-gradient(180deg, #0D0906 0%, #1A0F0A 100%)",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "48px", perspective: "1000px" }}
        >
          <span
            style={{
              color: "#C8A951",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            Customize Your Meal
          </span>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              marginTop: "12px",
            }}
          >
            Build Your Own Platter
          </h2>
        </motion.div>

        {/* Progress steps */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setCurrentStep(idx)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "100px",
                border: "none",
                background: currentStep === idx ? "#C8A951" : "rgba(255,255,255,0.05)",
                color: currentStep === idx ? "#000" : "rgba(255,255,255,0.6)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {selections[cat.id].length > 0 && currentStep !== idx ? (
                <LuCheck size={16} />
              ) : (
                <span style={{ opacity: 0.5 }}>{idx + 1}</span>
              )}
              {cat.name.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* Current step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: "24px",
              border: "1px solid rgba(200, 169, 81, 0.1)",
              padding: "32px",
              marginBottom: "24px",
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: 700 }}>
                {currentCategory.name}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                {currentCategory.subtitle} • {getTotalItemsInCategory()}/{currentCategory.maxItems}{" "}
                selected
              </p>
            </div>

            {/* Items grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "16px",
              }}
            >
              {currentCategory.items.map((item) => {
                const quantity = getItemQuantity(item.id);
                const isSelected = quantity > 0;
                const isMaxed = getTotalItemsInCategory() >= currentCategory.maxItems && !isSelected;

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: isMaxed ? 1 : 1.02 }}
                    style={{
                      padding: "20px",
                      borderRadius: "16px",
                      border: isSelected
                        ? "2px solid #C8A951"
                        : "1px solid rgba(255,255,255,0.1)",
                      background: isSelected
                        ? "rgba(200, 169, 81, 0.1)"
                        : "rgba(255,255,255,0.02)",
                      opacity: isMaxed ? 0.5 : 1,
                      cursor: isMaxed ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      {"image" in item && item.image ? (
                        <img
                          src={item.image as string}
                          alt={item.name}
                          style={{
                            width: "60px",
                            height: "45px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: "32px" }}>🍽️</span>
                      )}
                      <div style={{ display: "flex", gap: "4px" }}>
                        {"isVeg" in item && item.isVeg && <LuLeaf size={14} color="#4CAF50" />}
                        {"isSpicy" in item && item.isSpicy && <LuFlame size={14} color="#FF5722" />}
                      </div>
                    </div>
                    <h4 style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600, marginTop: "12px" }}>
                      {item.name}
                    </h4>
                    <p style={{ color: "#C8A951", fontSize: "14px", fontWeight: 700, marginTop: "4px" }}>
                      £{item.price.toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "12px",
                      }}
                    >
                      {isSelected ? (
                        <>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "8px",
                              border: "none",
                              background: "rgba(255,255,255,0.1)",
                              color: "#FFF",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <LuMinus size={16} />
                          </button>
                          <span style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 700 }}>
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleAddItem(item)}
                            disabled={getTotalItemsInCategory() >= currentCategory.maxItems}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "8px",
                              border: "none",
                              background: "#C8A951",
                              color: "#000",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <LuPlus size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleAddItem(item)}
                          disabled={isMaxed}
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid rgba(200, 169, 81, 0.3)",
                            background: "transparent",
                            color: "#C8A951",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: isMaxed ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <LuPlus size={14} />
                          Add
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px",
            background: "rgba(200, 169, 81, 0.1)",
            borderRadius: "16px",
            border: "1px solid rgba(200, 169, 81, 0.2)",
          }}
        >
          <div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "4px" }}>
              {getAllSelections().length} items selected
            </p>
            <p style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: 700 }}>
              £{getTotalPrice().toFixed(2)}
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((p) => p - 1)}
                style={{
                  padding: "14px 24px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "#FFF",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            )}

            {currentStep < categories.length - 1 ? (
              <button
                onClick={() => setCurrentStep((p) => p + 1)}
                style={{
                  padding: "14px 28px",
                  borderRadius: "100px",
                  border: "none",
                  background: "#C8A951",
                  color: "#000",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Next
                <LuChevronRight size={18} />
              </button>
            ) : (
              <button
                disabled={getAllSelections().length === 0}
                style={{
                  padding: "14px 28px",
                  borderRadius: "100px",
                  border: "none",
                  background: getAllSelections().length > 0 ? "#C8A951" : "rgba(200,169,81,0.3)",
                  color: "#000",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: getAllSelections().length > 0 ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <LuShoppingCart size={18} />
                Add to Order
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
