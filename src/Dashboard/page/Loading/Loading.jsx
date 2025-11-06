import React from "react";
import logo from "../../../assets/dental-image-removebg-preview.png";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center animate-pulse absolute top-0 left-0 bg-blue-50">
      <img className="md:w-10 md:h-10 lg:w-20 lg:h-20 rounded-full  border-blue-400" src={logo} alt="" />
    </div>
  );
};

export default Loading;
