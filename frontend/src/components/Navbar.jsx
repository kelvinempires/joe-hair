import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    user,
    setUser,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setUser(null);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium h-[100px]">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out"
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out"
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        {location.pathname === "/collection" && (
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search-icon"
          />
        )}

        <div className="group relative">
          {user?.name ? (
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold cursor-pointer hover:bg-gray-900 transition duration-300"
              title={`Logged in as ${user.name}`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img
              onClick={() => navigate("/login")}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
            />
          )}

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {/* <span className="text-[#c9ab57]">
                  {user?.name ? `${user.name} 👋` : "Welcome, Guest"}
                </span> */}
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Log Out
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cartIcon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu_icon"
        />
      </div>
      {/* Sidebar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white transition-all transform ease-out duration-300 ${
          visible ? "w-64 opacity-100 scale-100" : "w-0 opacity-0 scale-95"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex flex-row items-center justify-between gap-4 mt-6 cursor-pointer py-2 px-5 border rounded-4xl hover:bg-gray-200 transition-all duration-300 hover:text-gray-900 hover:scale-105"
          >
            <div className="flex items-center gap-2">
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180 "
                alt="dropdown_icon"
              />
              <p>Back</p>
            </div>
            <div>
              <img
                className="w-4 hover:scale-105 hover:text-gray-900 hover:cursor-pointer hover:rotate-180 hover:transition-all hover:duration-300 "
                src={assets.cross_icon}
              />
            </div>
          </div>
          <NavLink
            onClickCapture={() => setVisible(false)}
            className="py-2 pl-6 border rounded-4xl hover:bg-gray-200 transition-all duration-300 hover:text-gray-900 hover:scale-105"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClickCapture={() => setVisible(false)}
            className="py-2 pl-6 border rounded-4xl hover:bg-gray-200 transition-all duration-300 hover:text-gray-900 hover:scale-105"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClickCapture={() => setVisible(false)}
            className="py-2 pl-6 border rounded-4xl hover:bg-gray-200 transition-all duration-300 hover:text-gray-900 hover:scale-105"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClickCapture={() => setVisible(false)}
            className="py-2 pl-6 border rounded-4xl hover:bg-gray-200 transition-all duration-300 hover:text-gray-900 hover:scale-105"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
