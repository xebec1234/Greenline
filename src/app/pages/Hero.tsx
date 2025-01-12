import React from "react";
import HeroIntro from "./Hero/HeroIntro";
import JoinCommunity from "./Hero/JoinCommunity";
import Invitation from "./Hero/Invitation";

const Hero = async () => {
  return (
    <div className="bg-[#efece1] pr-28 pl-64">
      <HeroIntro />
      <JoinCommunity />
      <Invitation />
    </div>
  );
};

export default Hero;
