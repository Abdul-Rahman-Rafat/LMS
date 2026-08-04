import React, { useContext } from "react";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { AppContext } from "../../context/AppContext.jsx";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");
  const navigate = useNavigate();
  const { openSignUp } = useClerk();
  const { user } = useUser();
  const { isEducator } = useContext(AppContext);

  return (
    <div
      className={`
    flex justify-between items-center p-4 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"} shadow-md sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4
    `}
    >
      <Link to="/">
        <img
          src={assets.logoEduCore}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />
      </Link>

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                onClick={() =>
                  navigate(isEducator ? "/educator" : "/educator/educator")
                }
              >
                {" "}
                {isEducator ? "Educator Dashboard" : "Become an Instructor"}
              </button>{" "}
              | <Link to="my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => {
              openSignUp();
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            create an account
          </button>
        )}
      </div>
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5">
            {user && (
              <>
                <button
                  onClick={() =>
                    navigate(isEducator ? "/educator" : "/educator/educator")
                  }
                >
                  {" "}
                  {isEducator ? "Educator Dashboard" : "Become an Instructor"}
                </button>{" "}
                | <Link to="my-enrollments">My Enrollments</Link>
              </>
            )}
          </div>
          {user ? (
            <UserButton />
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => {
                openSignUp();
              }}
            >
              {" "}
              <img src={assets.user_icon} alt="User" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
