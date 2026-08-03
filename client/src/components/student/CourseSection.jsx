import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 py-10 px-4 text-center">
      <h2 className="text-2xl font-bold ">Learn from Industry Experts</h2>
      <p>
        Gain valuable insights and knowledge from experienced professionals in
        the field.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allCourses.slice(0, 4).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      <Link
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
      >
        View Courses
      </Link>
    </div>
  );
};

export default CourseSection;
