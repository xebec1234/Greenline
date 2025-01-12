import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  FunnelIcon,
  UserIcon,
  BellIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid"; // Import Heroicons
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutAccountSideNav from "../button/LogoutAccountSideNav";
import { getUnreadNotificationsCount } from "@/lib/notifications";

const SideNavbar = async () => {
  const session = await getServerSession(authOption);

  // Fetch unread notifications count from the server
  let unreadCount = 0;
  if (session?.user) {
    unreadCount = await getUnreadNotificationsCount(); // Call the function
  }

  return (
    <aside
      className="bg-[#efece1] h-screen w-64 border-r border-[#264743] sticky top-16 float-left flex flex-col py-10 pl-24 self-start"
      style={{
        height: "calc(100vh - 64px)", // Keeps sidebar sticky minus navbar height
      }}
      aria-label="Sidebar"
    >
      {/* Navigation Items */}
      <nav className="space-y-4 py-10">
        <Link href="/">
          <button className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline">
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </button>
        </Link>
        <Link href="/pages/forum/questionPage">
          <button className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline">
            <QuestionMarkCircleIcon className="w-5 h-5" />
            <span>Questions</span>
          </button>
        </Link>
        <Link href="/pages/search/filterTags">
          <button className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline">
            <FunnelIcon className="w-5 h-5" />
            <span>Filter (tags)</span>
          </button>
        </Link>

        {/* Spacer */}
        <div className="h-8"></div>

        {/* Conditional Login Items */}
        {session?.user ? (
          <div>
            <Link href="/pages/accounts">
              <button className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline mt-8">
                <UserIcon className="w-5 h-5" />
                <span>Account</span>
              </button>
            </Link>
            <Link href="/pages/forum/userPage">
              <button className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline">
                <QueueListIcon className="w-5 h-5" />
                <span>User Feed</span>
              </button>
            </Link>
            <Link href="/pages/accounts/notifications">
              <button className="flex items-center space-x-2 text-base font-semibold text-[#264743] hover:underline">
                <BellIcon className="w-5 h-5" />
                <span>Notification</span>
                {unreadCount > 0 && (
                  <span className="inline-block text-red-700 text-xs px-1">
                    {unreadCount}
                  </span>
                )}
              </button>
            </Link>
            <LogoutAccountSideNav />
          </div>
        ) : (
          <Link href="/pages/auth/login">
            <p className="text-gray-500 mt-8">Log in</p>
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default SideNavbar;
