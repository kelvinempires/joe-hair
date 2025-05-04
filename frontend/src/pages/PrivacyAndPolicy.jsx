import React from "react";
import ContactDetails from "../components/ContactMap";

const PrivacyPolicy = () => {
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-xl border border-gray-200">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">
        Privacy Policy
      </h1>
      <p className="text-center text-gray-500 text-lg mb-10">
        Effective Date: <span className="font-semibold">{currentDate}</span>
      </p>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
          1. Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to <span className="font-bold">Joel Hair Empire</span>! Your
          privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
          2. Information We Collect
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Personal information:</strong> Name, email, phone number,
            etc.
          </li>
          <li>
            <strong>Usage data & analytics:</strong> Helps improve our services.
          </li>
          <li>
            <strong>Cookies & tracking technologies:</strong> Enhance user
            experience.
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>To provide and improve our services.</li>
          <li>To communicate with you effectively.</li>
          <li>To ensure security and prevent fraud.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
          4. Third-Party Sharing
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We do not sell or rent your personal information. However, we may
          share data with trusted third parties for business operations, legal
          compliance, or security reasons.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
          5. Your Rights
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You have the right to access, update, or delete your personal
          information. Contact us via email or phone to exercise these rights.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
          6. Changes to This Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will
          be posted here.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mt-12">
        <p className="text-gray-700 mb-4 sm:mb-6">
          If you have any questions about our Privacy Policy, please contact us
          at:
        </p>
        <ContactDetails />
      </section>
    </div>
  );
};

export default PrivacyPolicy;
