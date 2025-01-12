import React, { Suspense } from "react";
import SideNavbar from "@/components/navbar/SideNavbar";
import TopNavbar from "@/components/navbar/TopNavbar";
import SearchPage from "@/components/searchEngine/SearchPage";
import PopularQuestionsSidebar from "@/components/navbar/rightSideBar/PopularQuestions";
import Footer from "@/components/navbar/Footer";

function page() {
  return (
    <Suspense>
      <div className="bg-[#efece1] flex flex-col">
        <TopNavbar />
        <div className="flex">
          {/* Left Sidebar */}
          <SideNavbar />
          <div className="flex-1 mx-4 mt-4 space-y-6">
            <SearchPage />
          </div>
          <div className="w-64 ml-4 mt-4 p-4 bg-[#efece1] rounded-md shadow-md">
            <PopularQuestionsSidebar />
          </div>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default page;
