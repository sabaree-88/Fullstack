import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const TopNav = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSearchDropdown = () => {
    setSearchDropdownOpen(!isSearchDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <>
      <div className="py-2 px-6 bg-gray-900 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        <ul className="ml-auto flex items-center">
          <li className="mr-1 dropdown">
            <button
              type="button"
              className="dropdown-toggle text-white mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
              onClick={toggleSearchDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                className="hover:bg-gray-100 rounded-full"
                viewBox="0 0 24 24"
                style={{ fill: "white", transform: "", msfilter: "" }}
              >
                <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
              </svg>
            </button>
            {isSearchDropdownOpen && (
              <div className="dropdown-menu shadow-md shadow-black/5 absolute right-56 top-1.5 z-30 max-w-xs w-full bg-white rounded-md border border-gray-100">
                <form action="" className="p-2 border-b border-b-gray-100">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                      placeholder="Search..."
                    />
                    <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-900" />
                  </div>
                </form>
              </div>
            )}
          </li>
          <li className="dropdown ml-3">
            <button
              type="button"
              className="dropdown-toggle flex items-center"
              onClick={toggleProfileDropdown}
            >
              <div className="flex-shrink-0 w-10 h-10 relative">
                <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                    alt="User Avatar"
                  />
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
                </div>
              </div>
              <div className="p-2 md:block text-left">
                <h2 className="text-sm font-semibold text-white">
                  {user.name}
                </h2>
                <p className="text-xs text-gray-300">{user.role}</p>
              </div>
            </button>
            {isProfileDropdownOpen && (
              <ul className="dropdown-menu shadow-md shadow-black/5 absolute right-0 z-30 py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                <li>
                  <Link
                    to={"/profile"}
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    role="menuitem"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                  >
                    Log Out
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default TopNav;
