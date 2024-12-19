import React from 'react';
import TopNavbar from '../components/navbar/TopNavbar';
import SideNavbar from '../components/navbar/SideNavbar';

const HomePage = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = false; 

  return (
    <div className="bg-[#efece1] min-h-screen">
      <TopNavbar />
      <SideNavbar isLoggedIn={isLoggedIn} />
      <main>
        <h1 className="text-black text-3xl font-bold text-center col">Welcome to Greenline!</h1>
        <p className="text-black text-center mt-2">
          A place for coders to share knowledge and grow together.
        </p>
      </main>
    </div>
  );
};

export default HomePage;
