import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Line } from "rc-progress";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseTime } = useContext(AppContext);
  const navigate = useNavigate();

  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 8 },
    { lectureCompleted: 1, totalLectures: 3 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 3, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 6, totalLectures: 7 },
    { lectureCompleted: 8, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 9 },
  ]);

  return (
    <div className="md:px-20 px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">
        My Enrollments
      </h1>

      <div className="flex flex-wrap gap-6">
        {enrolledCourses.map((course, index) => {
          const progress = progressArray[index];
          const percent =
            (progress.lectureCompleted / progress.totalLectures) * 100;

          const completed = percent === 100;

          return (
            <div
              key={course._id}
              className="w-96 bg-white rounded-xl border shadow-sm p-5 flex-row  md:flex-row gap-5 hover:shadow-md transition"
            >
              {/* Image */}
              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-full  object-cover rounded-lg"
              />

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {course.courseTitle}
                  </h2>

                  <div className="mt-3">
                    <Line
                      percent={percent}
                      strokeWidth={2}
                      strokeColor="#3B82F6"
                      trailWidth={2}
                    />

                    <p className="text-sm text-gray-500 mt-2">
                      {progress.lectureCompleted} / {progress.totalLectures}{" "}
                      Lectures Completed
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-600">
                  <div>
                    <p className="text-gray-400">Duration</p>
                    <p className="font-medium text-black">
                      {calculateCourseTime(course)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Progress</p>
                    <p className="font-medium text-black">
                      {percent.toFixed(0)}%
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Status</p>

                    {completed ? (
                      <span className="inline-flex rounded-full bg-green-100 text-green-700 px-3 py-1 font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 font-medium">
                        On Going
                      </span>
                    )}
                  </div>
                </div>

                {!completed && (
                  <button
                    onClick={() => navigate(`/player/${course._id}`)}
                    className="self-start mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Continue Learning
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEnrollments;
