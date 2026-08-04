import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import SearchBar from "../../components/student/SearchBar";
import CourseCard from "../../components/student/CourseCard";

const CoursesList = () => {
  const { allCourses } = useContext(AppContext);
  const navigate = useNavigate();
  const { input } = useParams();
  const [filteredCourses, setFilteredCourses] = React.useState([]);

  React.useEffect(() => {
    if (input) {
      const filtered = allCourses.filter((course) =>
        course.courseTitle.toLowerCase().includes(input.toLowerCase()),
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(allCourses);
    }
  }, [input, allCourses]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center justify-between w-4/5">
        <div className="flex flex-col justify-between ">
          <h1 className="text-3xl font-bold">Courses List</h1>
          <p>
            <Link className="text-blue-500" to="/">
              Home
            </Link>{" "}
            / <span>Courses</span>
          </p>
        </div>

        <SearchBar data={input} />
      </div>
      {input && (
        <p className="text-lg">
          Showing results for:{" "}
          <span className="font-bold p-1 px-2  shadow-xl rounded-2xl border-gray-500 ">
            {input}
            <span
              onClick={() => navigate("/course-list")}
              className="cursor-pointer text-red-500"
            >
              {" "}
              x
            </span>
          </span>
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
