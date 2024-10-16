import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import SearchBar from "../../Search";
import API_BASE_URL from "../../../config";

const Header = () => {
  const { user, logout } = useAuth();
  const { getUserId } = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const res = await getUserId(user._id);
          setProfile(res);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const profileImage = profile?.profileImage
    ? `${API_BASE_URL}/${profile.profileImage}`
    : "/favico.png";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap place-items-center overflow-hidden">
        <section className="relative mx-auto">
          <nav className="flex justify-between items-center bg-gray-900 text-white w-screen py-4 px-5 md:px-12">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <ul className="hidden md:flex px-4 mx-auto font-semibold space-x-8">
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
                <Link to="/product-collection" className="hover:text-gray-200">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-gray-200">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-5">
              <Link to="/search" className="hover:text-gray-200">
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
              <Link to="/favourites" className="hover:text-gray-200">
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
                to="/cart"
                className="flex items-center hover:text-gray-200 relative"
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
                <span className="absolute top-1 right-0 animate-pulse transform translate-x-1/2 -translate-y-1/2 inline-flex rounded-full h-3 w-3 bg-pink-500" />
              </Link>

              <Link
                to="/profile"
                className="flex items-center hover:text-gray-200"
              >
                <span className="h-8 w-8 rounded-full bg-gray-400 overflow-hidden">
                  <img
                    src={profileImage}
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

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden flex items-center space-x-4">
              <Link to="/search" className="hover:text-gray-200">
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
              <Link to="/favourites" className="hover:text-gray-200">
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
                to="/cart"
                className="flex items-center hover:text-gray-200 relative"
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
                <span className="absolute top-1 right-0 animate-pulse transform translate-x-1/2 -translate-y-1/2 inline-flex rounded-full h-3 w-3 bg-pink-500" />
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="md:hidden bg-gray-900 text-white p-4">
              <Link
                to="/user-dashboard"
                className="block py-2 hover:text-gray-200"
              >
                Home
              </Link>
              <Link to="/category" className="block py-2 hover:text-gray-200">
                Category
              </Link>
              <Link
                to="/product-collection"
                className="block py-2 hover:text-gray-200"
              >
                Collections
              </Link>
              <Link to="/contact-us" className="block py-2 hover:text-gray-200">
                Contact Us
              </Link>
              <Link to="/profile" className="block py-2 hover:text-gray-200">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block py-2 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Header;
