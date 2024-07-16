import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-800 p-4 z-50 sidebar-menu transition-transform">
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
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-home-2-line mr-3 text-lg text-white" />
              <span className="text-sm text-white">Dashboard</span>
            </Link>
          </li>
          <li className="mb-1 group">
            <Link
              to="/user"
              className="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
            >
              <i className="bx bx-user mr-3 text-lg" />
              <span className="text-sm">Users</span>
              <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
            </Link>
          </li>

          <span className="text-white font-bold">BOOKS</span>
          <li className="mb-1 group">
            <Link
              to="/all-books"
              className="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
            >
              <i className="bx bx-book mr-3 text-lg" />
              <span className="text-sm">All Books</span>
              <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
            </Link>
          </li>

          <span className="text-white font-bold">PERSONAL</span>
          <li className="mb-1 group">
            <a
              href=""
              className="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="bx bx-bell mr-3 text-lg" />
              <span className="text-sm">Notifications</span>
              <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">
                5
              </span>
            </a>
          </li>
          <li className="mb-1 group">
            <a
              href=""
              className="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="bx bx-envelope mr-3 text-lg" />
              <span className="text-sm">Messages</span>
              <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">
                2 New
              </span>
            </a>
          </li>
        </ul>
        <Outlet />
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay" />
    </>
  );
};

export default SideNav;
