import Branch from "@/components/about/Branch";
import Intro from "@/components/about/Intro";
import Statistics from "@/components/about/Statistics";
import Footer from "@/components/navbar/Footer";
import TopNavbar from "@/components/navbar/TopNavbar";
import React from "react";

const page = () => {
  return (
    <div>
      <TopNavbar />
      <Intro />
      <Branch />
      <Statistics />
      <Footer />
    </div>
  );
};

export default page;
