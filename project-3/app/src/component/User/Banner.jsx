import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center align-middle">
      <div className="w-11/12 mx-auto space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
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
            to={"/product-collection"}
            className="w-52 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl px-6 py-3 text-white text-center font-semibold"
          >
            Shop Now!
          </Link>
        </div>
        <div className="flex justify-center align-middle">
          <img
            src="/hero-img.png"
            alt="hero image"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
