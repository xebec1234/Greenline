import Link from "next/link";
import React from "react";
import Image from "next/image";

function Invitation() {
  return (
    <div
      className="flex items-center justify-center bg-[#efece1] "
      style={{
        background:
          "linear-gradient(to top left, #264743 50%, transparent 50%)",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex-1 text-center md:text-left text-[#264743] p-5 ml-20 -mt-24">
          <Image
            src="/greenline-logo.png"
            alt="Greenline Logo"
            width={128}
            height={128}
            className="rounded-full bg-[#264743] shadow-lg object-contain"
          />
          <h2 className="text-4xl font-bold">Greenline</h2>
          <p className="mt-2">
            Where your red lines of code transform <br /> into green success!
          </p>
        </div>
        {/* Right Section with Diagonal Background */}
        <div className="flex-1 text-center md:text-right text-white md:mt-5 py-10 mr-11">
          <h2 className="text-3xl font-bold mt-20 pt-10">
            Join the Greenline Revolution!
          </h2>
          <p className="mb-5">
            where you may turn your red line of code into bright green answers
            that will help you on your coding path!
          </p>
          <Link href="/pages/auth/register">
            <p className="mt-2 inline-block text-sm text-[#efece1] bg-[#3a7164] hover:bg-[#264743] px-4 py-2 rounded-md shadow-md transition">
              Join community
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Invitation;
