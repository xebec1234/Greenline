import SideNavbar from "@/components/navbar/SideNavbar";
import TopNavbar from "@/components/navbar/TopNavbar";
import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { redirect } from "next/navigation";
import AskForm from "@/components/form/AskForm";
import Footer from "@/components/navbar/Footer";
import PopularQuestionsSidebar from "@/components/navbar/rightSideBar/PopularQuestions";

async function page() {
  const session = await getServerSession(authOption);

  if (!session) {
    return redirect(
      "/pages/auth/login?callbackUrl=/pages/forum/askingContainers"
    );
  }

  return (
    <div className="bg-[#efece1] flex flex-col">
      <TopNavbar />
      <div className="flex">
        <SideNavbar />
        <div className="flex-1 mx-4 mt-4 space-y-6 mb-10">
          <div className="container py-6 px-4">
            <h1 className="text-2xl font-bold mb-6">Ask a Question</h1>
            {/* Pass the session object directly */}
            <AskForm session={session} />
          </div>
        </div>
        <div className="w-64 ml-4 mt-4 p-4 bg-[#efece1] rounded-md shadow-md">
          <PopularQuestionsSidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
