import React, { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {
  const [isVisible, setIsVisible] = useState(true); // State to track navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // State to track the last scroll position

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // If scrolling down, hide the navbar
      setIsVisible(false);
    } else {
      // If scrolling up, show the navbar
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY); // Update the last scroll position
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener on unmount
    };
  }, [lastScrollY]);

  return (
    <div
      className={`sticky top-0 z-50 flex items-center py-2 px-[4%] justify-between bg-white shadow-md transition-transform duration-300 border-b border-gray-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="Logo" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py2 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
