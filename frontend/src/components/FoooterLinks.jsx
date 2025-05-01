import React from "react";
import { NavLink } from "react-router-dom";

const FooterLinks = ({ links }) => {
  return (
    <ul className="flex flex-col gap-1 text-gray-600">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink to={link.path} className={"hover:text-black hover:underline hover:font-semibold hover:scale-105 hover:transition-all hover:duration-300"}>{link.label} </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
