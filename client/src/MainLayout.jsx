import React from "react";
import Navbar from "./components/student/Navbar";
import { Outlet, useMatch } from "react-router-dom";
import Footer from "./components/student/Footer";

const MainLayout = () => {
  const isEducatorPage = useMatch("/educator/*");

  return (
    <div>
      {/* {!isEducatorPage && */}
      <Navbar />
      {/* } */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
