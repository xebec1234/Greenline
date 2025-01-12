import React from "react";
import SideNavbar from "../components/navbar/SideNavbar";
import Hero from "./pages/Hero";
import TopNavbar from "@/components/navbar/TopNavbar";
import Footer from "@/components/navbar/Footer";

const HomePage = () => {
  return (
    <div>
      <TopNavbar />
      <SideNavbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default HomePage;
