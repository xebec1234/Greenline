import React from "react";
import SignInForm from "@/components/form/SignInForm";
import TopNavbar from "@/components/navbar/TopNavbar";
import Footer from "@/components/navbar/Footer";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import Image from "next/image";

export default async function Login() {
  const session = await getServerSession(authOption);

  if (session) {
    return (
      <div className="bg-[#efece1] min-h-screen flex flex-col">
        <TopNavbar />
        <main className="flex flex-1 items-center justify-center my-10">
          {/* Left Section */}
          <div className="flex flex-1 flex-col items-center md:items-end text-[#264743] p-5">
            <div className="w-32 h-32 md:w-80 md:h-80">
              <Image
                src="/greenline-logo.png"
                alt="Greenline Logo"
                width={320}
                height={320}
                className="rounded-full bg-[#264743] shadow-lg floating-logo object-contain"
              />
            </div>
            <h2 className="text-4xl font-bold mt-4 md:mt-8">Greenline</h2>
          </div>

          {/* Divider Line in the Middle */}
          <div className="w-[1px] bg-gray-300 h-3/4"></div>

          {/* Right Section - Form Container */}
          <div className="flex flex-1 justify-center p-5 ml-32">
            <h3>You're already signed in!</h3>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="bg-[#efece1] min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex flex-1 items-center justify-center my-10">
        {/* Left Section */}
        <div className="flex flex-1 flex-col items-center md:items-end text-[#264743] p-5">
          <div className="w-32 h-32 md:w-80 md:h-80">
            <Image
              src="/greenline-logo.png"
              alt="Greenline Logo"
              width={320}
              height={320}
              className="rounded-full bg-[#264743] shadow-lg floating-logo object-contain"
            />
          </div>
          <h2 className="text-4xl font-bold mt-4 md:mt-8">Greenline</h2>
        </div>

        {/* Divider Line in the Middle */}
        <div className="w-[1px] bg-gray-300 h-3/4"></div>

        {/* Right Section - Form Container */}
        <div className="flex flex-1 justify-center p-5 ml-32">
          <SignInForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
