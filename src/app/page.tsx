import React from 'react';
import SideNavbar from '../components/navbar/SideNavbar';
import Hero from './pages/Hero';
import TopNavbar from "@/components/navbar/TopNavbar";

const HomePage = () => {

  return (
    <div>
      <TopNavbar />
      <SideNavbar />
      <Hero />
    </div>
  );
};

export default HomePage;
