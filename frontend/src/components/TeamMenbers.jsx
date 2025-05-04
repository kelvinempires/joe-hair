import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "./Title";

const TeamMembers = () => {
  const team = [
    {
      name: "Joel Empire",
      role: "Founder & CEO",
      phone: "+234 810 280 6108",
      email: "Joelighoja507@gmail.com",
      image: assets.p_img1,
    },
    {
      name: "Joel Edijana",
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
    <div className="w-full">
      <div className="text-xl pb-4">
        <Title test1="Meet" test2="Our Team" />
      </div>

      <div className="grid gap-6">
        {team.map((member, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="w-24 h-24 shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-full hover:scale-90 transition-transform duration-300"
              />
            </div>

            <div className="text-center sm:text-left">
              <p className="font-semibold text-lg text-gray-800">
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
