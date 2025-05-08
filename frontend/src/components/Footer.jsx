import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import FooterLinks from "./FoooterLinks";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const companyLinks = [
    { path: "/about", label: "About us" },
    { path: "/", label: "Home" },
    { path: "/collection", label: "Collection" },
    { path: "/Privacy-Policy", label: "Privacy and Policy" },
    { path: "/terms-and-conditions", label: "Terms & Conditions" },
    { path: "/faq", label: "FAQ" },
  ];

  const contactInfo = [
    { path: "/login", label: "Login" },
    { path: "/cart", label: "View Cart" },
    { path: "/orders", label: "Delivery Information" },
    { path: "/help", label: "Help" },
  ];

  const getInTorch = [
    { path: "/contact", label: "Contact us" },
    { label: "+234-915-342-1622" },
    { label: "Kelvinewurum@gmail.com" },
  ];

  // Scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="pt-10 pl-10">
      <div className="flex flex-col sm:grid grid-cols-[1fr_1fr_1fr_2fr] gap-14 my-10 mt-20 text-sm">
        {/* Logo & Brand Description */}
        <div>
          <Link to="/" onClick={scrollToTop}>
            <img
              src={assets.logo}
              className="w-32 bg-[#f3f4f6] rounded-full mb-2"
              alt="logo"
            />
          </Link>
          <p className="text-sm font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {getInTorch.map((link, index) =>
              link.path ? (
                <li key={index}>
                  <Link to={link.path} onClick={scrollToTop}>
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={index}>{link.label}</li>
              )
            )}
          </ul>
          <ul className="flex gap-4 text-xl mt-2.5">
            <li>
              <a
                href="https://www.facebook.com/JoeFranklin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="hover:scale-125 transition-transform duration-300 text-gray-600 hover:text-blue-600" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/kelvinEwurum"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="hover:scale-125 transition-transform duration-300 text-gray-600 hover:text-blue-400" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/ighojajoel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="hover:scale-125 transition-transform duration-300 text-gray-600 hover:text-pink-500" />
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/2348102806108"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="hover:scale-125 transition-transform duration-300 text-gray-600 hover:text-green-500" />
              </a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-sm font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {companyLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path} onClick={scrollToTop}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info & Social Media */}
        <div className="flex flex-col">
          <p className="text-sm font-medium mb-5">MY ACCOUNT</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {contactInfo.map((link, index) => (
              <li key={index}>
                <Link to={link.path} onClick={scrollToTop}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium mb-5">SECURE PAYMENTS</p>
          <div className="flex">
            <Link to="/place-order">
              <img
                onClick={scrollToTop}
                src={assets.p1}
                className="w-10 md:w-18 cursor-pointer"
                alt="Secure Payment"
              />
            </Link>
            <Link to="/place-order">
              <img
                onClick={scrollToTop}
                src={assets.p2}
                className="w-10 md:w-18 cursor-pointer"
                alt="Secure Payment"
              />
            </Link>
            <Link to="/place-order">
              <img
                onClick={scrollToTop}
                src={assets.p3}
                className="w-10 md:w-18 cursor-pointer"
                alt="Secure Payment"
              />
            </Link>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            We ensure safe and reliable transactions with top security measures.
          </p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div>
        <hr className="border-gray-300" />
        <p className="pb-5 text-sm text-center text-gray-500">
          © 2025 Kelvin Empires - All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
