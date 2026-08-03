import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
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
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;
    const totalRating = course.courseRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0,
    );
    return totalRating / course.courseRatings.length;
  };
  const value = {
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
