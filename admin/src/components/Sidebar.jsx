import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[14%] min-h-screen border-r-2 border-gray-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-1 border border-gray-300 border-r-0 px-2 py-2 rounded-l"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="add_icon" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-1 border border-gray-300 border-r-0 px-2 py-2 rounded-l"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="add_icon" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-1 border border-gray-300 border-r-0 px-2 py-2 rounded-l"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="add_icon" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
