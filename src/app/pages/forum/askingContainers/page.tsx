import SideNavbar from '@/components/navbar/SideNavbar';
import TopNavbar from '@/components/navbar/TopNavbar';
import React from 'react';
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { redirect } from 'next/navigation';
import AskForm from '@/components/form/AskForm';

const page = async () => {
  const session = await getServerSession(authOption);

  if (!session) {
    return redirect('/pages/auth/login?callbackUrl=/pages/forum/askingContainers');
  }

  return (
    <div className="bg-[#efece1]">
      <TopNavbar />
      <SideNavbar />
      <div>
        <div className="container py-6 px-4">
          <h1 className="text-2xl font-bold mb-6">Ask a Question</h1>
          {/* Pass the session object directly */}
          <AskForm session={session} />
        </div>
      </div>
    </div>
  );
};

export default page;
