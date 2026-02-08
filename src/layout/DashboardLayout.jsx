import { Outlet } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar/Sidebar"; //
import Header from "../Dashboard/Header/Header";
import { useState } from "react";
// import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="min-h-screen flex relative">
      {/* header */}
      <Header toggle={toggle} setToggle={setToggle}></Header>

      {/* sidebar */}
      <div className="mt-[65px] md:mt-[70px] z-50 fixed">
        <Sidebar toggle={toggle} setToggle={setToggle}></Sidebar>
      </div>

      {/* outlet */}
      <div
        className={`flex-1 p-6 ${
          toggle ? "ml-0 md:ml-20" : "ml-0 md:ml-20 lg:ml-64"
        } transition-all duration-300 mt-[65px] bg-[#EEF1F3] min-w-0`}
      >
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
