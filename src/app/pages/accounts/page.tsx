import React from "react";
import TopNavbar from "@/components/navbar/TopNavbar";
import SideNavbar from "@/components/navbar/SideNavbar";
import AccountManagement from "@/components/accountManagement/AccountManagement";
import { db } from "@/lib/db";
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Footer from "@/components/navbar/Footer";

interface AccountPageParams {
  params: Promise<{
    id: string;
  }>;
}

async function page({ params }: AccountPageParams) {
  const session = await getServerSession(authOption);

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">
          Please log in to manage your account.
        </p>
      </div>
    );
  }

  const userId = session.user.id;
  const user = await db.users.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      username: true,
      email: true,
    },
  });

  const displayName = user?.username || user?.email?.split("@")[0];

  return (
    <div className="bg-[#efece1] flex flex-col min-h-screen">
      <TopNavbar />
      <div className="flex flex-1">
        <SideNavbar />
        <div className="flex-1 mx-20 mt-4">
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {displayName || "Account"}
            </h1>
            <div className="mt-4">
              <AccountManagement />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
