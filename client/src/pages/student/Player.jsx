import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Rating from "../../components/student/Rating";

const Player = () => {
  const {
    enrolledCourses,
    calculateChapterTime,
    calculateRating,

    calculateNoOfLectures,
    calculateCourseTime,
    currency,
  } = useContext(AppContext);
  const { courseId } = useParams();
  const [accordionState, setAccordionState] = useState({});
  const [playerData, setPlayerData] = useState();

  const [courseData, setCourseData] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);
  const handleComplete = () => {
    if (completedLectures.includes(playerData.lecture)) return;

    setCompletedLectures((prev) => [...prev, playerData.lectureId]);
  };

  const handleAccordionToggle = (chapterIndex) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [chapterIndex]: !prevState[chapterIndex],
    }));
  };
  const getCourseData = () => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    setCourseData(course);
  };
  useEffect(() => {
    getCourseData();
  }, [courseId, enrolledCourses]);

  const isCompleted =
    playerData && completedLectures.includes(playerData.lectureId);
  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left ">
        <div className=" flex flex-col gap-4">
          {/* left column */}
          <div>
            <h1 className="text-3xl font-bold "> {courseData?.courseTitle} </h1>

            <p
              className="text-lg text-gray-700"
              dangerouslySetInnerHTML={{
                __html: courseData?.courseDescription,
              }}
            />
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold">{calculateRating(courseData)}</p>
              <div>
                {[...Array(5)].map((_, index) => {
                  const rating = calculateRating(courseData);
                  return (
                    <span key={index} className="text-yellow-500">
                      {index < Math.floor(rating) ? "★" : "☆"}
                    </span>
                  );
                })}
              </div>
              <p className="text-blue-500 ">
                {courseData?.courseRatings.length} reviews
              </p>
              <p className="text-gray-500">
                {courseData?.enrolledStudents.length} students
              </p>
            </div>
            <p className="text-gray-500">
              Course by : <span className="text-blue-500">Abdulrahman</span>
            </p>
          </div>
          <div>
            <h2>Course Structure</h2>
            {courseData?.courseContent.map((chapter, index) => (
              <div key={index} className="border rounded mb-4">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => handleAccordionToggle(index)}
                >
                  <div className="flex items-center gap-2">
                    {" "}
                    <span>{accordionState[index] ? "˄" : "˅"}</span>
                    <h3 className="text-xl font-bold">
                      {chapter.chapterTitle}
                    </h3>
                  </div>
                  <div className=" *:flex flex-col items-end">
                    <p className="text-gray-600">
                      {calculateNoOfLectures(courseData) /
                        courseData.courseContent.length}{" "}
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
                          {lecture.lectureUrl && (
                            <span
                              onClick={() =>
                                setPlayerData({
                                  ...lecture,
                                  chapter: index + 1,
                                  lecture: lectureIndex + 1,
                                })
                              }
                              className="text-blue-500"
                            >
                              Watch now <span className="text-gray-700">-</span>
                            </span>
                          )}
                          {humanizeDuration(
                            lecture.lectureDuration * 60 * 1000,
                            {
                              units: ["m"],
                            },
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div>
            <h1> Rate this Course</h1>
            <Rating intialRating={0} onRate />
          </div>
        </div>

        {/* right column */}
        <div className="md:mt-5 ">
          {playerData ? (
            <div>
              <YouTube
                className=""
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="max-md:w-[330px] min-w-[330px] aspect-video"
              />
              <div className=" flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter} . {playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button
                  onClick={handleComplete}
                  className={` ${isCompleted ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white p-1 px-5 rounded-2xl  cursor-pointer shadow-lg transition-all duration-300 ease-in-out`}
                >
                  {isCompleted ? "Completed" : "Mark as Complete"}
                </button>
              </div>
            </div>
          ) : (
            <div className="">
              <img
                src={
                  courseData
                    ? courseData.courseThumbnail
                    : courseData?.courseTitle
                }
                alt={courseData?.courseTitle}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Player;
