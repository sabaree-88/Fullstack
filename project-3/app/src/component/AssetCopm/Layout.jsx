import React from "react";
import SideNav from "../Admin/SideNav";
import TopNav from "../Admin/TopNav";
import MainContent from "../Admin/MainContent";

const Layout = ({ children }) => {
  return (
    <>
      <SideNav />
      <main
        className="w-full md:w-[calc(100%-256px)]
        md:ml-64 bg-gray-200 
        min-h-screen transition-all main"
      >
        <TopNav />
        {children}
      </main>
    </>
  );
};

export default Layout;
