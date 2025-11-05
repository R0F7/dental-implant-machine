import React, { useEffect, useRef, useState } from "react";
import dashIcon from "../../assets/logo-with-text.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";
import { LiaUser } from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ClientSelector from "../../component/ClientSelector/ClientSelector";
import logoSml from "../../assets/imgi_1_logo_icon.png";
import useAuth from "@/hooks/useAuth";

const Header = ({ toggle, setToggle }) => {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const dropdownRef = useRef(null);
  const { user, logOut, db_user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    useEffect(() => {
    const demoClients = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Client ${i + 1}`,
    }));
    setClients(demoClients);
  }, []);

  // const initials = db_user?.name
  //   .split(" ")
  //   .filter(Boolean)
  //   .map((n) => n[0].toUpperCase())
  //   .join(" ");

  return (
    <div className="bg-[#1A4BD2] py-2 mb-1 h-[64px] w-screen top-0 left-0 flex items-center fixed z-50">
      <div
        className={`${
          toggle ? "w-0 md:w-20" : "w-64"
        } transition-all duration-300 absolute md:relative h-full hidden md:block`}
      >
        {/* big logo */}
        <img
          src={dashIcon}
          alt="Full Logo"
          className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[70x] h-[40px] md:w-[130px] md:h-[50px] brightness-0 invert 
      transition-all duration-300 ease-in-out 
      ${toggle ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
        />

        {/* small logo */}
        <img
          src={logoSml}
          alt="Small Logo"
          className={`absolute left-1/2 -translate-x-1/2 w-7 h-7 top-1/2 -translate-y-1/2 brightness-0 invert 
      transition-all duration-300 ease-in-out 
      ${toggle ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        />
      </div>

      <div className="flex items-center justify-between flex-1 px-4">
        <button
          onClick={() => setToggle(!toggle)}
          className="p-3 rounded-full hover:bg-[#2E5DDE] text-white scale-100 active:scale-95 transition duration-200"
        >
          <RxHamburgerMenu
            ize={20}
            className="w-5 h-5 text-white"
          ></RxHamburgerMenu>
        </button>

        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            {/* Navbar Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-[#2E5DDE] text-white text-sm px-6 py-1.5 rounded-md hover:bg-white hover:text-[#2E5DDE] transition duration-300"
            >
              {selectedClients.length} clients selected{" "}
              <FaAngleDown
                className={`${
                  open ? "rotate-180" : "rotate-0"
                } transition duration-200`}
              />
            </button>

            <div className="absolute top-10 right-0">
              <ClientSelector
                open={open}
                clients={clients}
                selectedClients={selectedClients}
                setSelectedClients={setSelectedClients}
              ></ClientSelector>
            </div>
          </div>

          {/* profile */}
          <div className="relative cursor-pointer group">
            <div className="flex items-center gap-1">
              <div className="w-10 h-10 bg-blue-500 text-white text-sm rounded-full flex items-center justify-center">
                {db_user?.first_name[0] + " "}
                {db_user?.last_name[0]}
              </div>
              <FaAngleDown className="text-white group-hover:rotate-180 transition duration-200" />
            </div>

            <ul className="absolute top-12 right-0 bg-white rounded-lg p-1 scale-y-0 group-hover:scale-y-100 transition duration-200 origin-top z-50 shadow-md">
              <li className="px-2 py-2 border-b mb-1 flex justify-center cursor-not-allowed">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    {db_user?.name}
                  </h4>
                  <p className="text-sm text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-2 w-full px-2 py-1 text-sm hover:bg-gray-100 rounded-md text-primary">
                <LiaUser />
                <Link to="/profile">Edit Profile</Link>
              </li>

              <li className="flex items-center gap-2 w-full px-2 py-1 text-sm hover:bg-gray-100 rounded-md text-primary">
                <IoLogOutOutline />
                <button onClick={logOut}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
