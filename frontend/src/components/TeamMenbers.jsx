import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const TeamMembers = () => {
  const team = [
    {
      name: "JOEL EMPIRE",
      role: "Founder & CEO",
      phone: "+234 810 280 6108",
      email: "Joelighoja507@gmail.com",
      image: assets.p_img1,
    },
    {
      name: "JOEL EDIJANA",
      role: "Senior Marketing Manager",
      phone: "+234 810 280 6108",
      email: "Joelighoja507@gmail.com",
      image: assets.p_img5,
    },
    {
      name: "Kelvin Ewurum",
      role: "Senior Software Engineer",
      phone: "+234 9153 4216 22",
      email: "kelvinewurum@gmail.com",
      image: assets.p_img6,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Meet Our Team
      </h2>
      <div className="grid md:grid-cols-1">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-white p-2 flex items-center gap-6"
          >
            <div className="relative w-20 h-20">
              <img
                className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-90 hover:opacity-90"
                src={member.image}
                alt={member.name}
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {member.name}
              </p>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="text-sm text-gray-600">
                📞{" "}
                <a
                  href={`tel:${member.phone}`}
                  className="text-blue-500 hover:underline"
                >
                  {member.phone}
                </a>
              </p>
              <p className="text-sm text-gray-600">
                ✉️{" "}
                <a
                  href={`mailto:${member.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {member.email}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
