import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-100">
      <h1 className="text-3xl font-bold text-center">
        Learn anything, anywhere, anytime
      </h1>
      <p className="text-lg text-center">Start your learning journey today!</p>
      <div className="flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-all duration-300 ease-in-out">
          Get Started
        </button>
        <button className=" hover:bg-gray-200  font-bold py-2 px-4 rounded cursor-pointer  transition-all duration-300 ease-in-out">
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
