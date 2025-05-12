import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

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

  useEffect(() => {
    if (visible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [visible]);


  // ESC key closes sidebar
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setUser(null);
  };

  return (
    <div className="relative z-50 flex items-center justify-between py-5 font-medium h-[100px] px-4">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, i) => (
          <NavLink
            key={i}
            to={path}
            className="flex flex-col items-center gap-1 hover:text-gray-900 transition-all duration-300 hover:scale-105"
          >
            <p>{path === "/" ? "HOME" : path.slice(1).toUpperCase()}</p>
          </NavLink>
        ))}
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
              alt="profile-icon"
            />
          )}

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
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
          <img src={assets.cart_icon} className="w-5" alt="cartIcon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu_icon"
          aria-expanded={visible}
        />
      </div>

      {/* Blur Overlay */}
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
          visible ? "translate-x-0" : "translate-x-full"
        } w-64`}
      >
        <div className="flex flex-col text-gray-600 h-full p-5 gap-4">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center justify-between cursor-pointer py-2 px-4 border rounded-4xl hover:bg-gray-200 transition-all duration-300 hover:text-gray-900 hover:scale-105"
          >
            <div className="flex items-center gap-2">
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180"
                alt="back"
              />
              <p>Back</p>
            </div>
            <img
              src={assets.cross_icon}
              className="w-4 hover:scale-105 hover:rotate-180 transition-all duration-300 cursor-pointer"
              alt="close"
            />
          </div>

          {["/", "/collection", "/about", "/contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              onClick={() => setVisible(false)}
              className="py-2 pl-4 border rounded-4xl hover:bg-gray-200 transition-all duration-300 hover:text-gray-900 hover:scale-105"
            >
              {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
