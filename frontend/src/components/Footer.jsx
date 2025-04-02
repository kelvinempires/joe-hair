import React from 'react'
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Welcome to our brand – dedicated to delivering excellence and
            innovation. From premium hair solutions to state-of-the-art
            ventilators, we strive to redefine quality and customer satisfaction
            with every product. Trust us to bring comfort, style, and
            reliability to your everyday life.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+234-915-342-1622</li>
            <li>Kelvinewurum@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-500">
          © 2025 Kelvin Empires - All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer