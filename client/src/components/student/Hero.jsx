import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "../../components/student/SearchBar";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4  bg-cyan-100/70 ">
      <img className="w-full " src={assets.heroBanner} alt="Hero" />

      <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className=" text-3xl font-bold text-gray-800">
          Welcome to Our Platform
        </h1>

        <p className=" text-gray-600 text-center">
          Discover a world of knowledge and unlock your potential with our
          comprehensive learning platform.
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
