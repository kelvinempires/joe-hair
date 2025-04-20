import React from "react";
import TeamMembers from "./TeamMenbers";

const ContactDetails = () => {
  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 border border-gray-300 p-14 gap-10 mb-28 rounded-lg shadow-lg shadow-gray-300  text-gray-800">
      {/* Google Map Embed */}
      <div className="overflow-hidden">
        <iframe
          className="w-full h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.362974706922!2d3.3494461735047723!3d6.601734522252316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9230fc4fc853%3A0xd8babb191dac2f6b!2sAllen%20Ave%2C%20Allen%2C%20Ikeja%20101233%2C%20Lagos!5e0!3m2!1sen!2sng!4v1729671204756!5m2!1sen!2sng"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <TeamMembers />
    </div>
  );
};

export default ContactDetails;
