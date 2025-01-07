import React from 'react';
import SignUpForm from '@/components/form/SignUpForm';
import TopNavbar from '@/components/navbar/TopNavbar';

export default function Register() {
  return (
    <div className="bg-[#efece1]">
      <TopNavbar />
      <main className="flex">
        {/* Left Section */}
        <div className="flex-1 h-full"></div>

        {/* Divider Line in the Middle */}
        <div className="w-[1px] bg-gray-300 h-3/6 self-center"></div>

        {/* Right Section - Form Container */}
        
        <SignUpForm />
      </main>
    </div>
  );
}
