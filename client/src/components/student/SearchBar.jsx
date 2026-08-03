import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");
  const handleSearch = (event) => {
    event.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="relative flex items-center  gap-4 w-full max-w-md mx-auto mt-4"
      >
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 h-5 md:w-6 md:h-6 absolute left-2  text-gray-400"
        />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search..."
          className="bg-transparent border border-gray-300 rounded-full py-2 px-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="  bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
