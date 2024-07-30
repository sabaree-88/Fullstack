import React from "react";
import Header from "../UserLayout/Header";
import Footer from "../UserLayout/Footer";
const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
