import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  const links = [
    { to: "/add", icon: assets.add_icon, label: "Add Items" },
    { to: "/list", icon: assets.order_icon, label: "List Items" },
    { to: "/orders", icon: assets.order_icon, label: "Orders" },
  ];

  return (
    <div className="w-[18%] min-h-screen border-r border-gray-200 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-sm">
        {links.map((link) => (
          <SidebarLink key={link.to} {...link} />
        ))}
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-l border border-gray-300 border-r-0 transition-all duration-200 ${
        isActive ? "bg-gray-100 font-medium text-primary" : "hover:bg-gray-50"
      }`
    }
  >
    <img className="w-5 h-5" src={icon} alt={`${label}_icon`} />
    <p className="hidden md:block">{label}</p>
  </NavLink>
);

export default Sidebar;
