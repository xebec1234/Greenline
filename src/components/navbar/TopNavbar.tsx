import React from "react";
import Image from "next/image";
import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"; // Import Heroicons
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from "../button/UserAccountNav";
import SearchBar from "../searchEngine/SearchBar";

const TopNavbar = async () => {
  const session = await getServerSession(authOption);
  return (
    <nav className="bg-[#264743] text-white py-2 px-6 sticky top-0 z-50 flex items-center justify-between">
      <div className="flex items-center px-16">
        <Image
          src="/greenline-logo.png"
          alt="Greenline Logo"
          width={50}
          height={50}
          priority
          className="rounded-full"
          style={{ width: "auto", height: "auto" }}
        />
        <span className="text-xl font-bold">Greenline</span>
        {/* About Button */}
        <Link href="">
          <button className="mx-10 text-sm hover:underline">About</button>
        </Link>
      </div>

      {/* Move the SearchBar component here */}
      <SearchBar />

      <div className="flex items-center space-x-4 px-20">
        {/* Ask Button */}
        <Link href="/pages/forum/askingContainers">
          <button className="px-4 py-2 border-none rounded-lg hover:bg-white hover:text-[#264743] inline-flex items-center">
            Ask
            <QuestionMarkCircleIcon className="w-6 h-6 ml-1" />
          </button>
        </Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <div className="flex space-x-4">
            <Link href="/pages/auth/login">
              <button className="px-4 py-2 border-none rounded-lg hover:bg-white hover:text-[#264743]">
                Login
              </button>
            </Link>
            <Link href="/pages/auth/register">
              <button className="px-4 py-2 bg-[#CBE4DE] text-[#264743] rounded-lg hover:bg-[#B6D9D1]">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
