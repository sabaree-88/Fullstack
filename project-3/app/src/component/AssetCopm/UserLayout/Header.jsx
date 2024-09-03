import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import SearchBar from "../../Search";

const Header = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  const { getUserId } = useUser();
  const [profile, setProfile] = useState([]);
  const id = user._id;
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getUserId(id);
      setProfile(res);
    };
    fetchProfile();
  }, [user]);
  const profileImage = `http://localhost:3000/${profile.profileImage}`;
  return (
    <>
      <div className="flex flex-wrap place-items-center overflow-hidden">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-gray-900 text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <Link
                to="/user-dashboard"
                className="flex items-center border-b border-b-gray-800"
              >
                <h2 className="font-bold text-2xl text-white">
                  BOOK{" "}
                  <span className="bg-white text-gray-900 px-2 rounded-md">
                    STORE
                  </span>
                </h2>
              </Link>
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <Link to="/user-dashboard" className="hover:text-gray-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/category" className="hover:text-gray-200">
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-gray-200"
                    to={"/product-collection"}
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-200" to={"/contact-us"}>
                    Contact Us
                  </Link>
                </li>
              </ul>

              <div className="hidden xl:flex items-center space-x-5">
                <Link to={"/search"} className="hover:text-gray-200">
                  <svg
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </Link>
                <Link className="hover:text-gray-200" to="/favourites">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Link>
                <Link
                  className="flex items-center hover:text-gray-200"
                  to="/cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center hover:text-gray-200"
                >
                  <span className="h-8 w-8 rounded-full bg-gray-400 focus:outline-2 focus:outline-white overflow-hidden">
                    <img
                      src={user ? profileImage : "/favico.png"}
                      alt="user-img"
                      className="w-full h-full object-cover"
                    />
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:text-red-700 font-bold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
            <a className="xl:hidden flex mr-6 items-center" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </a>
            <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
              <svg
                className="h-8 w-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </a>
          </nav>
        </section>
      </div>
    </>
  );
};

export default Header;
