const faqs = [
  {
    question: "What type of cuisine does Sultan Restaurant serve?",
    answer: "Sultan Restaurant serves authentic Middle Eastern cuisine including Syrian, Lebanese, and Iraqi dishes, alongside Indian classics like biryani, tandoori, and curry. All dishes are prepared fresh with hand-ground spices."
  },
  {
    question: "Does Sultan Restaurant offer halal food?",
    answer: "Yes, all meat served at Sultan Restaurant is 100% halal certified. We take great care to ensure our sourcing meets the highest halal standards."
  },
  {
    question: "Can I order food for collection/pickup?",
    answer: "Yes, you can order online through our website for collection. Orders are typically ready within 30 minutes. We also offer delivery through Uber Eats, Deliveroo, and Just Eat."
  },
  {
    question: "Does Sultan Restaurant take table reservations?",
    answer: "Yes, you can book a table for up to 20 guests through our website or by calling +44 141 391 8883. We recommend booking for weekends and special occasions."
  },
  {
    question: "Where is Sultan Restaurant located?",
    answer: "Sultan Restaurant is located at 577 Gallowgate, Glasgow G40 2PE, Scotland. We are in the heart of Glasgow's East End with easy parking available nearby."
  },
  {
    question: "What are Sultan Restaurant's opening hours?",
    answer: "We are open every day from 12:00 PM – 9:00 PM (21:00), 7 days a week."
  },
  {
    question: "Does Sultan Restaurant cater for dietary requirements?",
    answer: "Yes, we offer vegetarian, vegan-friendly, and gluten-free options. Our staff can advise on allergens and dietary needs. Please let us know when booking or ordering."
  },
  {
    question: "Does Sultan Restaurant offer catering for events?",
    answer: "Yes, we provide catering services for events, corporate gatherings, and private parties. Contact us at info@sultanrestaurant.co.uk or call to discuss your requirements."
  },
];

export function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}