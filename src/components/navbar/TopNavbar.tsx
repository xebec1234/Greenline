'use client'; 

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QuestionMarkCircleIcon } from '@heroicons//react//24//solid'; // Import Heroicons

const TopNavbar = () => {
  return (
    <nav className="bg-[#264743] text-white py-4 px-6 flex items-center justify-between">
     
      <div className="flex items-center px-16">
      <Image
          src="/greenline-logo.png" // Path from the `public` folder
          alt="Greenline Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <span className="text-xl font-bold">Greenline</span>
        <button className="mx-10 text-sm hover:underline">About</button>
      </div>

      <div className="flex flex-1 justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-[40vw] h-[5vh] px-3 py-1.5 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CBE4DE]"
        />
      </div>

      <div className="flex items-center space-x-4 px-20">
        <button className="px-4 py-2 border-none rounded-lg hover:bg-white hover:text-[#264743] inline-flex items-center">
          Ask
          <QuestionMarkCircleIcon className="w-6 h-6 ml-1" />
        </button>
        <button className="px-4 py-2 border-none rounded-lg hover:bg-white hover:text-[#264743]">
          Login
        </button>
        <Link href="/register">
          <button className="px-4 py-2 bg-[#CBE4DE] text-[#264743] rounded-lg hover:bg-[#B6D9D1]">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
