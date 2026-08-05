import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  // const [course, setCourse] = useState(null);
  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateNoOfLectures,
    calculateCourseTime,
    currency,
  } = useContext(AppContext);

  const [accordionState, setAccordionState] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(true);
  const [playerData, setPlayerData] = useState();

  const handleAccordionToggle = (chapterIndex) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [chapterIndex]: !prevState[chapterIndex],
    }));
  };
  // const selectedCourse = allCourses.find((c) => c._id === id);
  const course = allCourses.find((c) => c._id === id);
  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left ">
      <div className="flex-1 flex flex-col gap-4">
        {/* left column */}
        <div>
          <h1 className="text-3xl font-bold "> {course?.courseTitle} </h1>

          <p
            className="text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: course?.courseDescription }}
          />
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
            <p className="text-blue-500 ">
              {course?.courseRatings.length} reviews
            </p>
            <p className="text-gray-500">
              {course?.enrolledStudents.length} students
            </p>
          </div>
          <p className="text-gray-500">
            Course by : <span className="text-blue-500">Abdulrahman</span>
          </p>
        </div>
        <div>
          <h2>Course Structure</h2>
          {course?.courseContent.map((chapter, index) => (
            <div key={index} className="border rounded mb-4">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => handleAccordionToggle(index)}
              >
                <div className="flex items-center gap-2">
                  {" "}
                  <span>{accordionState[index] ? "˄" : "˅"}</span>
                  <h3 className="text-xl font-bold">{chapter.chapterTitle}</h3>
                </div>
                <div className=" *:flex flex-col items-end">
                  <p className="text-gray-600">
                    {calculateNoOfLectures(course) /
                      course.courseContent.length}{" "}
                    lectures • {calculateChapterTime(chapter)}
                  </p>
                </div>
              </div>
              {accordionState[index] && (
                <ul>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <li
                      key={lectureIndex}
                      className="flex justify-between p-2 border-t cursor-pointer"
                    >
                      <div>
                        <span className="px-2 border rounded-[50%] text-white bg-gray-500">
                          ▸
                        </span>
                        &nbsp;
                        <span className="text-gray-700">
                          {lecture.lectureTitle}
                        </span>
                      </div>
                      <span className="text-gray-700">
                        {lecture.isPreviewFree && (
                          <span
                            onClick={() =>
                              setPlayerData({
                                videoId: lecture.lectureUrl.split("/").pop(),
                              })
                            }
                            className="text-blue-500"
                          >
                            preview <span className="text-gray-700">-</span>
                          </span>
                        )}
                        {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                          units: ["m"],
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div>
          <h2>Course Description</h2>
          <p
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: course?.courseDescription }}
          />
        </div>
      </div>
      {/* right column */}
      <div className=" flex flex-col gap-4 border pb-1 rounded-t-2xl min-w-[350px] w-1/3 ">
        {playerData ? (
          <YouTube
            videoId={playerData.videoId}
            opts={{ playerVars: { autoplay: 1 } }}
            iframeClassName="w-full aspect-video"
          />
        ) : (
          <img
            className="w-full rounded-t-xl"
            src={course?.courseThumbnail}
            alt={course?.courseTitle}
          />
        )}

        <div className="p-5 space-y-2">
          <p>
            {" "}
            <span className="text-red-500 font-bold">
              ⏱︎ 5 dyas left for this price
            </span>
          </p>
          <div className="flex gap-1 items-center">
            <h2 className="text-2xl font-bold ">
              {" "}
              {currency} {course.coursePrice}
            </h2>
            <span className="line-through text-gray-700">
              {currency}
              {(
                course.coursePrice * (course.discount / 100) +
                course.coursePrice
              ).toFixed(2)}
            </span>
            <span className="text-gray-600">{course.discount}% OFF</span>
          </div>
          <div className="flex gap-4">
            <p>
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-lg"> {calculateRating(course)}</span>
            </p>
            <span>|</span>
            <p>
              <span className="text-gray-300 text-lg">⏱︎</span>{" "}
              <span className="text-lg"> {calculateCourseTime(course)}</span>
            </p>
            <span>|</span>
            <p>
              <span className="text-gray-300 text-lg">🕮</span>{" "}
              <span className="text-lg"> {calculateNoOfLectures(course)}</span>
            </p>
          </div>
          {isEnrolled ? (
            <button className=" w-full rounded-md py-2 bg-[#3f485c] text-white shadow-gray-300 shadow-md cursor-not-allowed">
              Already Enrolled
            </button>
          ) : (
            <button className=" w-full rounded-md py-2 bg-[#447FFE] text-white shadow-gray-300 shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:transform hover:-translate-y-0.5">
              Enroll Now
            </button>
          )}
          <div>
            <h2 className="font-bold">What's in the Course ?</h2>
            <ul className="text-gray-500">
              <li>- Lifetime access with free updates .</li>
              <li>- Step-by-step, hands-on project guidance .</li>
              <li>- Downloadable resources and source code .</li>
              <li>- Quizzes to test your knowledge .</li>
              <li>- Certificate of completion .</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
