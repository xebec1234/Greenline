"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in effect after the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Optional delay before starting the animation

    return () => clearTimeout(timer); // Cleanup timeout if component unmounts
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#3a7164] via-[#2f5c58] to-[#264743] text-white p-36 -mt-5 shadow-xl">
      {/* Left Side */}
      <div
        className={`flex-1 mb-6 md:mb-0 mt-5 md:mr-8 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-lg font-semibold">
          <span className="text-5xl">With Greenline,</span>
          <br /> every coder—novice or expert—can turn errors into opportunities
          and improve their skills while contributing to a thriving developer
          community.
        </p>
        <Link href="/pages/forum/questionPage">
          <p className="mt-4 inline-block text-sm text-[#efece1] bg-[#264743] hover:bg-[#3a7164] px-4 py-2 rounded-md shadow-md transition">
            Learn More
          </p>
        </Link>
      </div>

      {/* Right Side */}
      <div
        className={`flex-1 flex w-32 h-32 md:w-80 md:h-80 justify-center md:justify-end transition-opacity duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/greenline-logo.png"
          alt="Greenline Logo"
          width={320}
          height={320}
          className="rounded-full bg-[#264743] shadow-lg floating-logo object-contain"
        />
      </div>
    </div>
  );
};

export default Intro;
