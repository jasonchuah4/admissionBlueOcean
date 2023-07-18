import React, { useEffect, useRef, useContext } from "react";
import { LuPanelLeftClose } from "react-icons/lu";
import { NAVLINKS } from "./utils";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillProfile } from "react-icons/ai";
import {
  BsFileEarmarkPersonFill,
  BsFillCalendarMinusFill,
} from "react-icons/bs";
import AuthContext from "../Context/AuthProvider";

const Navmenu = ({ showMenu, setShowMenu }) => {
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const menuRef = useRef(null);

  const name = JSON.parse(localStorage.getItem("name"));

  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

  const logos = [
    <AiFillHome className="text-[20px] bottom-[-2px] relative" />,
    <BsFileEarmarkPersonFill className="text-[20px] bottom-[-2px] relative" />,
    <BsFillCalendarMinusFill className="text-[20px] bottom-[-2px] relative" />,
    <AiFillProfile className="text-[20px] bottom-[-2px] relative" />,
  ];

  return (
    <div
      className="bg-bg h-screen w-screen md:w-[400px] absolute top-0 left-0 border-r-[1px] border-accent my-2 shadow-2xl shadow-black"
      ref={menuRef}
    >
      <div className="flex flex-col justify-center align-middle">
        <div className="text-[24px] cursor-pointer absolute right-0 top-0 p-4">
          <LuPanelLeftClose onClick={toggleMenu} />
        </div>
      </div>
      <div className="flex flex-col align-middle items-center my-12 p-4">
        <div className="p-1 text-galv-orange font-bold text-[32px] cursor-default leading-3 py-2 tracking-wide">
          {name.firstName} {name.lastName}
        </div>
        <div className="text-[18px] text-white italic cursor-default py-2 tracking-wide">
          Instructor
        </div>
      </div>
      <div className="border-b-accent border-b-[1px] mx-10"></div>
      <div className="flex flex-col items-left my-12 mx-12 p-4">
        {NAVLINKS.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="p-3 cursor-default flex align-bottom flex-row"
            onClick={toggleMenu}
          >
            {logos[link.id - 1]} &nbsp;
            <span className="text-[18px] text-white/50 hover:text-white hover:transition-transform transition-all duration-300 ease-in-out cursor-pointer">
              &nbsp; {link.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="border-b-accent border-b-[1px] mx-10"></div>
      <div className="w-full my-12 mx-28">
        <button
          onClick={handleLogout}
          className="bg-galv-blue rounded-md p-3 w-40 hover:border-[1px] hover:border-galv-orange hover:scale-105 transition transform-gpu duration-300 text-white ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navmenu;
