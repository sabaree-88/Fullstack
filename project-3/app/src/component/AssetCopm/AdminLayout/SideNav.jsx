import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import API_BASE_URL from "../../../config";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryCount, setInquiryCount] = useState(0);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchInquiryCount = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/inquiry/get-inquiry`
      );
      setInquiryCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInquiryCount();
  }, []);
  return (
    <>
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <Link
          to="/admin-dashboard"
          className="flex items-center pb-4 border-b border-b-gray-800"
        >
          <h2 className="font-bold text-2xl text-white">
            BOOK{" "}
            <span className="bg-white text-gray-900 px-2 rounded-md">
              STORE
            </span>
          </h2>
        </Link>
        <ul className="mt-4">
          <span className="font-bold text-white mb-8">ADMIN</span>
          <li className="mb-1 group">
            <Link
              to="/admin-dashboard"
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md"
            >
              <i className="ri-home-2-line mr-3 text-lg text-white" />
              <span className="text-sm text-white">Dashboard</span>
            </Link>
          </li>
          <li className="mb-1 group">
            <Link
              to="/user"
              className="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-950 hover:text-gray-100 rounded-md"
            >
              <i className="bx bx-user mr-3 text-lg" />
              <span className="text-sm">Users</span>
              <i className="ri-arrow-right-s-line ml-auto" />
            </Link>
          </li>

          <span className="text-white font-bold">BOOKS</span>
          <li className="mb-1 group">
            <Link
              to="/all-books"
              className="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-950 hover:text-gray-100 rounded-md"
            >
              <i className="bx bx-book mr-3 text-lg" />
              <span className="text-sm">All Books</span>
              <i className="ri-arrow-right-s-line ml-auto" />
            </Link>
          </li>
          <li className="mb-1 group">
            <Link
              to="/categories"
              className="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-950 hover:text-gray-100 rounded-md"
            >
              <i className="bx bx-book mr-3 text-lg" />
              <span className="text-sm">Category</span>
              <i className="ri-arrow-right-s-line ml-auto" />
            </Link>
          </li>
          <li className="mb-1 group">
            <Link
              to="/order-table"
              className="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-950 hover:text-gray-100 rounded-md"
            >
              <i className="bx bx-book mr-3 text-lg" />
              <span className="text-sm">Orders</span>
              <i className="ri-arrow-right-s-line ml-auto" />
            </Link>
          </li>

          <span className="text-white font-bold">PERSONAL</span>
          <li className="mb-1 group">
            <Link
              to={"/message"}
              className="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-950 hover:text-gray-100 rounded-md"
            >
              <i className="bx bx-envelope mr-3 text-lg" />
              <span className="text-sm">Messages</span>
              <span className="md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">
                {inquiryCount > 0 ? `${inquiryCount} New` : "0"}
              </span>
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-gray-900 text-white"
          onClick={toggleSidebar}
        >
          <i className="ri-menu-line" />
        </button>
      )}
      {isOpen && (
        <button
          className="md:hidden fixed top-4 left-1/2 z-50 p-2 rounded bg-gray-900 text-white"
          onClick={toggleSidebar}
        >
          <i className="ri-close-line" />
        </button>
      )}
    </>
  );
};

export default SideNav;
