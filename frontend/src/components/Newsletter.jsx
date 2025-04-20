import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Newsletter = () => {
  return (
    <section className="py-6 px-6 relative bg-[#b8b3b9]">
      {/* Background Image Only on Left Side */}
      <div
        className="absolute top-0 left-32 w-sm h-full bg-cover bg-no-repeat bg-left"
        style={{ backgroundImage: `url(${assets.p_img01})` }}
      ></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative">
        {/* Text Section */}
        <div className="md:w-1/2 text-gray-900 text-center md:text-left">
          <h4 className="prata-regular text-2xl  lg:text-3xl leading-relaxed">
            Sign Up for Our Newsletter
          </h4>
          <p className="text-lg font-medium text-gray-700">
            Get email updates about our latest shop and
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              <p className="font-medium text-black text-sm md:text-base">
                special offers.
              </p>
            </div>
          </p>
        </div>

        {/* Form Section */}
        <div className="flex w-full md:w-[40%] bg-white p-2 rounded-md shadow-lg">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 px-4 text-base border-none rounded-md outline-none bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#088] transition"
          />
          <button className="bg-black text-white text-base font-semibold px-6 h-12 rounded-md shadow-md hover:bg-[#06665c] transition duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
