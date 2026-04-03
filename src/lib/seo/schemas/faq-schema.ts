// FAQ schema types
interface Question {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

interface FAQPage {
  '@context': string;
  '@type': 'FAQPage';
  mainEntity: Question[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  questions: FAQItem[];
}

export function generateFAQSchema(data: FAQData): FAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// Predefined FAQ data for Sultan Restaurant
export const sultanFAQData: FAQData = {
  questions: [
    {
      question: 'What types of Middle Eastern cuisine do you serve?',
      answer: 'We serve authentic Syrian, Lebanese, Iraqi, and other Middle Eastern cuisines including shawarma, falafel, hummus, tabbouleh, kebabs, and traditional rice dishes. Our menu features both classic and modern interpretations of Middle Eastern flavors.',
    },
    {
      question: 'Do you offer delivery in Glasgow?',
      answer: 'Yes, we offer delivery throughout Glasgow and surrounding areas within a 10-mile radius. Our delivery service is available Monday through Sunday from 12:00 PM to 9:00 PM. Minimum order is £15, and delivery fees start from £2.99.',
    },
    {
      question: 'Can I make a reservation?',
      answer: 'Absolutely! You can make a reservation online through our website or by calling us directly. We recommend booking in advance, especially for weekends and special occasions. We can accommodate parties up to 20 people.',
    },
    {
      question: 'Do you cater for special dietary requirements?',
      answer: 'Yes, we cater to various dietary needs including vegetarian, vegan, gluten-free, and halal options. Many of our dishes can be modified to accommodate allergies and preferences. Please let us know about any dietary restrictions when ordering.',
    },
    {
      question: 'What are your opening hours?',
      answer: 'We are open every day from 12:00 PM to 9:00 PM, 7 days a week. Our kitchen closes at 8:30 PM for dine-in orders and 8:00 PM for delivery orders.',
    },
    {
      question: 'Do you accept credit cards?',
      answer: 'Yes, we accept all major credit cards (Visa, Mastercard, American Express), debit cards, and contactless payments. We also accept cash payments for dine-in customers.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Delivery typically takes 30-45 minutes depending on your location and current order volume. During peak times (lunch and dinner rushes), it may take up to 60 minutes. You\'ll receive real-time updates on your order status.',
    },
    {
      question: 'Can I order for pickup?',
      answer: 'Yes, pickup orders are welcome! You can place your order online for pickup or call us directly. Pickup orders are usually ready within 15-20 minutes. No minimum order required for pickup.',
    },
  ],
};