import React from "react";
import ContactDetails from "../components/ContactMap";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-8 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Terms and Conditions
      </h1>

      {/** Section Wrapper Component */}
      {[
        {
          title: "1. Introduction",
          content: (
            <p className="text-gray-600">
              Welcome to <span className="font-bold">Joel Hair Empire</span>. By
              accessing our website or using our services, you agree to be bound
              by these Terms and Conditions.
            </p>
          ),
        },
        {
          title: "2. Use of Our Services",
          content: (
            <>
              <p className="text-gray-600">
                You must use our services legally and ethically. You agree not
                to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Violate any applicable laws</li>
                <li>Engage in fraudulent or harmful activities</li>
                <li>Attempt to disrupt or harm our operations</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Intellectual Property",
          content: (
            <p className="text-gray-600">
              All content, branding, and materials on this site belong to{" "}
              <span className="font-bold">Joel Hair Empire</span>. You may not
              reproduce, distribute, or use them without permission.
            </p>
          ),
        },
        {
          title: "4. Limitation of Liability",
          content: (
            <p className="text-gray-600">
              We are not responsible for any damages arising from your use of
              our services. All services are provided “as is” without
              warranties.
            </p>
          ),
        },
        {
          title: "5. Changes to Terms",
          content: (
            <p className="text-gray-600">
              We reserve the right to modify these Terms and Conditions at any
              time. Updates will be posted here.
            </p>
          ),
        },
        {
          title: "6. Contact Information",
          content: (
            <>
              <p className="text-gray-600">
                If you have questions regarding these terms, please contact us
                at:
              </p>
              <div className="mt-4 overflow-hidden">
                <ContactDetails />
              </div>
            </>
          ),
        },
      ].map((section, index) => (
        <section key={index} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {section.title}
          </h2>
          {section.content}
        </section>
      ))}
    </div>
  );
};

export default TermsAndConditions;
