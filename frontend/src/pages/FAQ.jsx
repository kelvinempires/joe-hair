import React, { useState } from "react";

const faqs = [
  {
    question: "Where are you located?",
    answer:
      "Joel Hair Empire is located in Lagos, Nigeria. Visit our store or contact us for directions.",
  },
  {
    question: "What services does Joel Hair Empire offer?",
    answer:
      "We specialize in Hair Ventilation, professional hair styling, treatments, and customized hair solutions.",
  },
  {
    question: "What is Hair Ventilation?",
    answer:
      "Hair Ventilation is a technique used to hand-tie individual hair strands onto lace, creating natural-looking wigs and hairpieces.",
  },
  {
    question: "How can I book an appointment?",
    answer:
      "You can book an appointment through our website, social media, or contact us directly.",
  },
  {
    question: "Do you offer home service?",
    answer:
      "Yes, we offer home service upon request. Additional charges may apply based on location.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Refunds are only available for cancellations made 24 hours before the scheduled appointment.",
  },
  {
    question: "How does your delivery service work?",
    answer:
      "We offer delivery for select products within Lagos. Delivery times vary based on availability and location.",
  },
  {
    question: "What are the delivery charges?",
    answer:
      "Delivery fees are calculated based on distance and product type. Contact us for an exact quote.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, we provide order tracking details for deliveries within Lagos. You'll receive updates after your purchase.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        Frequently Asked Questions
      </h1>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md mb-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
          onClick={() => toggleFAQ(index)}
        >
          <h2 className="text-xl font-semibold text-gray-700 flex justify-between items-center">
            {faq.question}
            <span className="text-gray-500">
              {openIndex === index ? "▲" : "▼"}
            </span>
          </h2>
          <div
            className={`overflow-hidden transition-max-height duration-500 ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-600 mt-3">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
