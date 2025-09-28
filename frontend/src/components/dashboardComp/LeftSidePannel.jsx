import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const LeftSidePannel = ({ activeItem, setActiveItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { label: "Dashboard" },
    { label: "ATS Checker" },
    { label: "Jobs" },
    { label: "Ai Interview" },
  ];

  const bottomItems = [{ label: "Profile" }, { label: "Logout", danger: true }];

  const baseClass =
    "flex w-full py-2 mb-1 cursor-pointer px-4 items-center bg-white hover:bg-gray-300 transition-colors duration-200 text-sm sm:text-base";
  const activeClass =
    "bg-gray-300 flex w-full py-2 mb-1 cursor-pointer px-4 items-center transition-colors duration-200 text-sm sm:text-base";

  return (
    <>
      {isOpen && (
        <div
          className="
             fixed top-[55px] left-0 h-[calc(103vh-64px)] 
    sm:relative sm:top-0 sm:h-auto
    w-64 sm:w-1/4 md:w-1/5
    flex flex-col justify-between 
    bg-white shadow-md py-4 
    transition-all duration-300
    z-40  
          "
        >
          {/* Collapse button */}
          <div
            className="absolute top-2 right-[-12px] sm:right-[-16px] rounded-full border bg-white cursor-pointer text-blue-500 p-1 shadow"
            onClick={() => setIsOpen(false)}
          >
            <FaAngleLeft />
          </div>

          {/* Top menu */}
          <div className="w-full flex-1 overflow-y-auto px-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveItem(item.label)}
                className={`${
                  activeItem === item.label ? activeClass : baseClass
                }`}
              >
                <MdDashboard className="mr-2 text-lg" />
                <span className="tracking-tight font-semibold truncate">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom menu */}
          <div className="w-full px-2 pb-2">
            {bottomItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveItem(item.label)}
                className={`${
                  activeItem === item.label ? activeClass : baseClass
                } ${item.danger ? "text-red-600" : ""}`}
              >
                <MdDashboard className="mr-2 text-lg" />
                <span className="tracking-tight font-semibold truncate">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!isOpen && (
        <div
          className="fixed top-16 left-0 rounded-r-lg border bg-white cursor-pointer text-blue-500 p-1 shadow z-50"
          onClick={() => setIsOpen(true)}
        >
          <FaAngleRight />
        </div>
      )}
    </>
  );
};

export default LeftSidePannel;
