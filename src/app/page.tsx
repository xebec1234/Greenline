import React from 'react';
import TopNavbar from '../components/navbar/TopNavbar';
import SideNavbar from '../components/navbar/SideNavbar';

const HomePage = () => {
  const isLoggedIn = false;

  return (
    <div className="bg-[#efece1] min-h-screen">
      <TopNavbar />
      <SideNavbar isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default HomePage;
