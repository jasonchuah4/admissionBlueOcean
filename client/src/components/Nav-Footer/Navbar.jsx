import React, { useState, useContext, useEffect, useRef } from "react";
import logo from "../../assets/galvanize-logo.webp";
import { LuPanelLeftOpen } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Navmenu from "./Navmenu.jsx";
import AuthContext from "../Context/AuthProvider";
import Switch from "./Switch.jsx";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const settingsRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings, setShowSettings]);

  return (
    <div className="bg-bg top-0 w-full md:mx-auto text-text-light-gray shadow-lg shadow-black">
      <div className="w-fullmx-auto">
        <div className="mx-auto py-10 flex justify-between align-middle">
          <div className="text-[24px] cursor-pointer left-3 sm:left-12 relative">
            {auth.token && <LuPanelLeftOpen onClick={toggleMenu} />}
          </div>
          <img
            className="relative mx-auto h-9 cursor-pointer"
            onClick={handleLogoClick}
            src={logo}
            alt="Logo"
          />
          {auth.token && (
            <div
              onClick={toggleSettings}
              className="text-[24px] mr-12 cursor-pointer"
              ref={settingsRef}
            >
              <CiSettings />
            </div>
          )}
          {showSettings && (
            <div
              id="settings"
              className={`absolute right-5 top-[65px] flex-col flex`}
              ref={settingsRef}
            >
              <div className="bg-bg text-text-light-gray shadow-lg shadow-black rounded-md p-4">
                <div className="flex flex-col">
                  <Switch />
                  <p className="p-[2px] my-2 hover:text-white/50 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`top-[-10px] absolute transition duration-[400ms] z-20 ${
            showMenu ? "translate-x-0 " : "-translate-x-[2000px]"
          }`}
        >
          {auth.token && (
            <Navmenu showMenu={showMenu} setShowMenu={setShowMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
