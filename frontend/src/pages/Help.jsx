import React from "react";

const Help = () => {
  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Browse our collection, add items to the cart, and proceed to checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, PayPal, and secure online payments.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Log in to your account and check your order status in the 'Orders' section.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "Reach us via email at support@example.com or call +234-915-342-1622.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Help Center</h2>
      <p className="text-gray-600 mb-4">
        Need assistance? Browse our FAQs or contact us directly.
      </p>

      {/* FAQ Section */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 bg-white rounded-md shadow-sm">
            <p className="text-lg font-semibold text-gray-700">
              {faq.question}
            </p>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div className="mt-6 text-center">
        <p className="text-gray-700">Still have questions?</p>
        <p className="text-lg font-medium text-blue-600">Contact us at:</p>
        <p className="text-gray-600 mt-2">kelvinewurum@gmail.com</p>
        <p className="text-gray-600">+234-915-342-1622</p>
      </div>
    </div>
  );
};

export default Help;
