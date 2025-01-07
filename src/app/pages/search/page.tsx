import React, { Suspense } from "react";
import SideNavbar from "@/components/navbar/SideNavbar";
import TopNavbar from "@/components/navbar/TopNavbar";
import SearchPage from "@/components/searchEngine/SearchPage";

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
        </div>
      </div>
    </Suspense>
  );
}

export default page;
