"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Branch = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#efece1] py-40 px-8">
      {/* Block 1 */}
      <div
        className={`flex items-center mb-14 w-full transition duration-1000 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[-50px]"
        }`}
      >
        <div className="relative flex-1">
          <div className="absolute left-6 -top-10 transform -translate-y-1/2 w-1/3 max-w-xs">
            <Image
              src="/collaborative.png"
              alt="Collaborate"
              width={150} // Replace with your actual dimensions
              height={150} // Replace with your actual dimensions
              className="w-full h-auto"
            />
          </div>
          <div className="ml-60">
            <h2 className="text-2xl font-semibold text-[#264743] mb-4">
              Collaborate
            </h2>
            <p className="text-[#4a4a4a]">
              Work together with passionate developers to solve coding
              challenges, share insights, and grow as a team.
            </p>
          </div>
        </div>
      </div>

      {/* Block 2 */}
      <div
        className={`flex items-center mb-10 w-full flex-row-reverse transition duration-1000 delay-300 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[50px]"
        }`}
      >
        <div className="relative flex-1">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-1/3 max-w-xs">
            <Image
              src="/learn.png"
              alt="Learn"
              width={150} // Replace with your actual dimensions
              height={150} // Replace with your actual dimensions
              className="w-full h-auto"
            />
          </div>
          <div className="mr-60 text-right">
            <h2 className="text-2xl font-semibold text-[#264743] mb-4">
              Learn
            </h2>
            <p className="text-[#4a4a4a]">
              Gain knowledge from discussions, tutorials, and community feedback
              to enhance your programming skills.
            </p>
          </div>
        </div>
      </div>

      {/* Block 3 */}
      <div
        className={`flex items-center -mb-11 w-full transition duration-1000 delay-600 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[-50px]"
        }`}
      >
        <div className="relative flex-1">
          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1/3 max-w-xs">
            <Image
              src="/innovate.png"
              alt="Innovate"
              width={150} // Replace with your actual dimensions
              height={150} // Replace with your actual dimensions
              className="w-full h-auto"
            />
          </div>
          <div className="ml-60">
            <h2 className="text-2xl font-semibold text-[#264743] mb-4">
              Innovate
            </h2>
            <p className="text-[#4a4a4a]">
              Bring your ideas to life by engaging with a community that fosters
              creativity and innovation in coding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branch;
