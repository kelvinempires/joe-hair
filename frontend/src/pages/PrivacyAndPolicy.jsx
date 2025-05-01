import React from "react";
import ContactDetails from "../components/ContactMap";

const PrivacyPolicy = () => {
  const currentDate = new Date().toISOString().split("T")[0]; // Gets current date in YYYY-MM-DD format

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Privacy Policy
      </h1>
      <p className="text-gray-600 text-lg mb-6 text-center">
        Effective Date: <span className="font-medium">{currentDate}</span>
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
          1. Introduction
        </h2>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Welcome to <span className="font-bold">Joel Hair Empire</span>! Your
          privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
          2. Information We Collect
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
          <li>
            <span className="font-medium">
              Personal identification information:
            </span>{" "}
            Name, email, phone number, etc.
          </li>
          <li>
            <span className="font-medium">Usage data & analytics:</span> Helps
            improve our service.
          </li>
          <li>
            <span className="font-medium">
              Cookies & tracking technologies:
            </span>{" "}
            Enhances user experience.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
          <li>To provide and improve our services.</li>
          <li>To communicate with you effectively.</li>
          <li>To ensure security and prevent fraud.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
          4. Third-Party Sharing
        </h2>
        <p className="text-gray-700 mt-4 leading-relaxed">
          We do not sell or rent your personal information. However, we may
          share data with trusted third parties for business operations, legal
          compliance, or security reasons.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
          5. Your Rights
        </h2>
        <p className="text-gray-700 mt-4 leading-relaxed">
          You have the right to access, update, or delete your personal
          information. Contact us via email or phone to exercise these rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
          6. Changes to This Policy
        </h2>
        <p className="text-gray-700 mt-4 leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will
          be posted here.
        </p>
      </section>

      <footer className="mt-8 text-center">
        <p className="text-gray-700">
          If you have any questions about our Privacy Policy, please contact us
          at:
        </p>
        <div className="mt-4">
          <ContactDetails />
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
