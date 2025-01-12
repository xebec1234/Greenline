import TopNavbar from "@/components/navbar/TopNavbar";
import SideNavbar from "@/components/navbar/SideNavbar";
import FilterPage from "@/components/searchEngine/FilterPage"; // Import the FilterPage component
import TagSelectorForm from "@/components/form/TagSelectorForm";
import { Suspense } from "react";
import PopularQuestionsSidebar from "@/components/navbar/rightSideBar/PopularQuestions";
import Footer from "@/components/navbar/Footer";

function FilterTagsPage() {
  return (
    <Suspense>
      <div className="bg-[#efece1] flex flex-col">
        <TopNavbar />
        <div className="flex">
          {/* Left Sidebar */}
          <SideNavbar />

          {/* Main Content */}
          <div className="flex-1 mx-4 mt-4 space-y-6">
            <TagSelectorForm />
            <FilterPage /> {/* Render the FilterPage component */}
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

export default FilterTagsPage;
