import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer
      className="bg-black text-white py-8"
      style={{
        position: "relative",
        zIndex: 10, // Ensure footer stacks above the sidebar when scrolling
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Greenline</h2>
            <p className="text-sm mt-1">
              Empowering developers to transform challenges into opportunities.
            </p>
          </div>

          {/* Center Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/about">
              <p className="text-sm hover:underline cursor-pointer">About</p>
            </Link>
            <Link href="/contact">
              <p className="text-sm hover:underline cursor-pointer">Contact</p>
            </Link>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Greenline. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
