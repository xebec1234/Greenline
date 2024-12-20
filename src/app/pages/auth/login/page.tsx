import React from 'react';
import TopNavbar from '../../../../components/navbar/TopNavbar';

export default function Login() {
  return (
    <div className="bg-[#efece1] min-h-screen">
      <TopNavbar />
      <main className="flex">
        {/* Left Section */}
        <div className="flex-1 h-full"></div>

        {/* Divider Line in the Middle */}
        <div className="w-[1px] bg-gray-300 h-3/6 self-center"></div>

        {/* Right Section - Form Container */}
        <div className="flex-1 h-full flex justify-center items-center">
          <div className="bg-[#efece1] p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#264743]"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#264743]"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#264743]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#264743] text-white py-3 rounded-lg hover:bg-[#1e3b38]"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
