"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const element = document.getElementById("about-section");
    if (element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the element is in the viewport
      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        id="about-section"
        className={`border-2 border-[#264743] p-8 max-w-screen-xl m-5 rounded-lg transition-opacity duration-500 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } flex flex-col md:flex-row items-center`}
      >
        <div className="w-32 h-32 md:w-80 md:h-80 mb-4 md:mb-0 md:mr-8">
          <Image
            src="/greenline-logo.png"
            alt="Greenline Logo"
            width={320}
            height={320}
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">About Greenline</h2>
          <p className="max-w-xl leading-relaxed text-lg">
            Greenline is an open forum designed for programmers and developers
            to collaborate, learn, and grow through interactive coding
            discussions. It empowers users to share coding challenges and
            solutions with a unique feature: the ability to highlight problem
            areas in red directly within their code. This visual feedback system
            fosters a supportive learning environment, where clear guidance and
            collaborative problem-solving transform those "red lines" into
            "green," signifying progress and resolution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
