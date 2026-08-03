import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "../../components/student/SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 bg-cyan-100/70">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to Our Platform
      </h1>

      <img className="w-full max-w-2xl" src={assets.hero_image} alt="Hero" />
      <p className="text-gray-600 text-center">
        Discover a world of knowledge and unlock your potential with our
        comprehensive learning platform.
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
