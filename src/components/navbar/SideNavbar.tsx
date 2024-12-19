'use client';

import React from 'react';
import { HomeIcon, QuestionMarkCircleIcon, FunnelIcon , UserIcon, BellIcon  } from '@heroicons/react/24/solid'; // Import Heroicons

const SideNavbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <aside
      className="bg-[#efece1] h-[90vh] w-64 border-r border-[#264743] float-left flex flex-col py-10 pl-24"
      aria-label="Sidebar"
    >
      {/* Navigation Items */}
      <nav className="space-y-4">
        <a href="/" className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline">
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </a>
        <a href="/questions" className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline">
          <QuestionMarkCircleIcon className="w-5 h-5" />
          <span>Questions</span>
        </a>
        <a href="/tags" className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline">
          <FunnelIcon className="w-5 h-5" />
          <span>Filter (tags)</span>
        </a>

        {/* Spacer */}
        <div className="h-8"></div>

        {/* Conditional Login Items */}
        {isLoggedIn ? (
          <>
            <a href="/account" className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline mt-8">
              <UserIcon className="w-5 h-5" />
              <span>Account</span>
            </a>
            <a href="/notifications" className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline">
              <BellIcon className="w-5 h-5" />
              <span>Notification</span>
            </a>
            <a href="/logout" className="flex items-center space-x-2 text-base font-semibold text-red-600 hover:underline">
              <span>Logout</span>
            </a>
          </>
        ) : (
          <p className="text-gray-500 mt-8">Log in</p>
        )}
      </nav>
    </aside>
  );
};

export default SideNavbar;
