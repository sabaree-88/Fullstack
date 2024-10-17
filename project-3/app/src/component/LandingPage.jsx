import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <header className="w-10/12 mx-auto">
        <nav className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <h2 className="font-bold text-2xl">
              BOOK{" "}
              <span className="bg-gray-900 text-white px-2 rounded-md">
                STORE
              </span>
            </h2>
          </Link>
          <ul className="flex justify-evenly align-middle gap-4">
            <li>
              <Link
                to={"/login"}
                className="px-6 py-2 rounded-3xl font-semibold text-white border-white border-spacing-1 transition-all duration-700 ease-out bg-gradient-to-r from-gray-900 to-gray-700 hover:text-white"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to={"/signup"}
                className="px-6 py-2 rounded-3xl font-semibold text-white border-white border-spacing-1 transition-all duration-700 ease-out bg-gradient-to-r from-gray-900 to-gray-700 hover:text-white"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="min-h-[80vh] flex flex-col justify-center align-middle">
        <div className="w-10/12 mx-auto space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
          <div className="flex flex-col align-middle justify-center">
            <h1 className="text-4xl font-extrabold mb-4 text-slate-900">
              Discover Your Next Great Read!
            </h1>
            <p className="mb-6 leading-6">
              {" "}
              Welcome to <b>Bookstore</b>, the ultimate destination for book
              lovers. Dive into a world of literary wonders, from timeless
              classics to the latest bestsellers. Whether you're seeking
              adventure, romance, or knowledge, we've got a book just for you.
              Explore our carefully curated collections and let the magic of
              reading transform your world.
            </p>
            <Link
              to={"/login"}
              className="w-52 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl px-6 py-3 text-white text-center font-semibold"
            >
              Shop Now!
            </Link>
          </div>
          <div className="flex justify-center align-middle">
            <img
              src="/hero-img.png"
              alt="hero image"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
