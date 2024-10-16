import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext.jsx";
import API_BASE_URL from "../../../config.js";

const TopNav = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getUserId } = useUser();
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const [profile, setProfile] = useState([]);
  const id = user._id;
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getUserId(id);
      setProfile(res);
    };
    fetchProfile();
  }, [user]);
  const profileImage = `${API_BASE_URL}/${profile.profileImage}`;
  return (
    <>
      <div className="py-2 px-6 bg-gray-900 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        {/* <button
          className="text-white text-2xl mr-4 md:hidden"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button> */}

        <ul className="ml-auto flex items-center">
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
                    src={
                      user
                        ? profileImage
                        : "https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                    }
                    alt="User Avatar"
                  />
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
                </div>
              </div>
              <div className="p-2 md:block hidden text-left">
                <h2 className="text-sm font-semibold text-white">
                  {user.name}
                </h2>
                <p className="text-xs text-gray-300">{user.role}</p>
              </div>
            </button>
            {isProfileDropdownOpen && (
              <ul className="dropdown-menu shadow-md shadow-black/5 absolute right-3 z-30 py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[120px]">
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
