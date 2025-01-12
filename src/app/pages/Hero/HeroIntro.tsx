import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import Image from "next/image";

export default async function HeroIntro() {
  const session = await getServerSession(authOption);

  if (session) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#3a7164] via-[#2f5c58] to-[#264743] text-white p-28 -mt-5 rounded-lg shadow-xl">
        {/* Left Side */}
        <div className="absolute top-20 left-33 mt-10 -ml-10">
          <h3 className="text-2xl font-bold">Welcome Back!</h3>
        </div>
        <div className="flex-1 mb-6 md:mb-0 mt-5 md:mr-8">
          <p className="text-lg font-semibold">
            <span className="text-5xl">With Greenline,</span>
            <br /> every coder—novice or expert—can turn errors into
            opportunities and improve their skills while contributing to a
            thriving developer community.
          </p>
          <Link href="/pages/forum/questionPage">
            <p className="mt-4 inline-block text-sm text-[#efece1] bg-[#264743] hover:bg-[#3a7164] px-4 py-2 rounded-md shadow-md transition">
              Learn More
            </p>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center md:justify-end w-32 h-32 md:w-80 md:h-80">
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
  }
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#3a7164] via-[#2f5c58] to-[#264743] text-white p-28 -mt-5 rounded-lg shadow-xl">
      {/* Left Side */}
      <div className="flex-1 mb-6 md:mb-0 mt-5 md:mr-8">
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
      <div className="flex-1 flex justify-center md:justify-end w-32 h-32 md:w-80 md:h-80">
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
}
