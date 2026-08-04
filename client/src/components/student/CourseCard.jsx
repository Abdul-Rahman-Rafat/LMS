import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link
      className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start cursor-pointer "
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
    >
      <img
        className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-95 transition-transform duration-300"
        src={course.courseThumbnail}
        alt={course.courseTitle}
      />
      <div className="flex flex-col items-start  ">
        <h3 className="text-lg font-bold">{course.courseTitle}</h3>
        {/* <p className="text-gray-500">{course.educator.name}</p> */}
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">{calculateRating(course)}</p>
          <div>
            {[...Array(5)].map((_, index) => {
              const rating = calculateRating(course);
              return (
                <span key={index} className="text-yellow-500">
                  {index < Math.floor(rating) ? "★" : "☆"}
                </span>
              );
            })}
          </div>
          <p className="text-blue-500">{course.courseRatings.length} reviews</p>
          <p className="text-gray-500">
            {course?.enrolledStudents.length} students
          </p>
        </div>
        <p className="text-xl font-bold">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
