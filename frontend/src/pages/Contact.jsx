import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import ContactDetails from '../components/ContactMap';
import Newsletter from '../components/Newsletter';

export const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-gray-300">
        <Title test1={"CONTACT"} test2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full max-w-[480px]"
          src={assets.contact_img}
          alt="contact_img"
        />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            17 akinbowala streetn
            <br /> fagba ifakojaye lagos state Nigeria
          </p>
          <p className="text-gray-500">
            Tel: (+234) 915 342 1622 <br />
            Email: kelvinewurum@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at joel Empires
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 ">
            Explore Jobs
          </button>
        </div>
      </div>
      <ContactDetails />
      <Newsletter/>
    </div>
  );
}
