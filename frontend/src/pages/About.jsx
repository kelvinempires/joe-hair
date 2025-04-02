import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-gray-300">
        <Title test1={"ABOUT"} test2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=" about_img"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to our website! We are dedicated to providing high-quality
            solutions that cater to your needs. With a focus on innovation and
            customer satisfaction, we strive to exceed expectations and deliver
            exceptional experiences.
          </p>
          <p>
            Our team is made up of passionate professionals who are committed to
            excellence. Whether it's through our products or services, we aim to
            build lasting relationships and drive success for our clients and
            community.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to redefine beauty and confidence through exceptional
            hair solutions. We specialize in providing high-quality hair
            products and professional hair ventilation services, ensuring each
            client experiences unparalleled craftsmanship and care.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title test1={"WHY"} test2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At our core, we are committed to delivering top-tier quality in
            every aspect of our work. From sourcing the finest materials to
            employing meticulous craftsmanship, we ensure that our products and
            services meet the highest standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            We prioritize your convenience by offering seamless solutions
            designed to fit into your busy lifestyle. From easy access to our
            products and services to efficient processes, we aim to save you
            time and provide a stress-free experience, allowing you to focus on
            what truly matters.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            We take pride in delivering exceptional customer service that goes
            beyond expectations. Our team is dedicated to understanding your
            unique needs, providing personalized solutions, and ensuring every
            interaction leaves you feeling valued and cared for.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
