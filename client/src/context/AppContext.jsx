import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const fetchCourses = async () => {
    setAllCourses(dummyCourses);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const calculateRating = (course) => {
    if (!course || !course.courseRatings?.length) {
      return 0;
    }

    const totalRating = course.courseRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0,
    );

    return totalRating / course.courseRatings.length;
  };
  const calculateChapterTime = (chapter) => {
    let time = 0;

    chapter.chapterContent.map((lecture) => {
      return (time += lecture.lectureDuration);
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseTime = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map(
        (lecture) => (time += lecture.lectureDuration),
      ),
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent))
        totalLectures += chapter.chapterContent.length;
    });
    return totalLectures;
  };

  const value = {
    currency,
    allCourses,
    isEducator,
    setIsEducator,
    calculateRating,
    calculateChapterTime,
    calculateNoOfLectures,
    calculateCourseTime,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
