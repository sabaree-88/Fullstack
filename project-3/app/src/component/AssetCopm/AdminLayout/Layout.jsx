import React from "react";
import SideNav from "../AdminLayout/SideNav";
import TopNav from "../AdminLayout/TopNav";

const Layout = ({ children }) => {
  return (
    <>
      <SideNav />
      <main
        className={`w-full md:w-[calc(100%-16rem)] md:ml-64 
        bg-gray-200 min-h-screen transition-all duration-300`}
      >
        <TopNav />
        {children}
      </main>
    </>
  );
};

export default Layout;
