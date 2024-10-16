import React from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../../AssetCopm/UserLayout/UserLayout";
import ProductLoading from "../../AssetCopm/utils/skeleton/ProductLoading";
import Ratings from "./Ratings";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import useProduct from "../../../hooks/useProduct";
import API_BASE_URL from "../../../config";
const ProductOverview = () => {
  const { id } = useParams();
  const { data, reviews, loading, error, handleReviewSubmit } = useProduct(id);

  return (
    <UserLayout>
      {loading ? (
        <ProductLoading />
      ) : (
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
          {error && (
            <p className="text-red-600 font-semibold">{error.message}</p>
          )}
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div
              key={data._id}
              className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16"
            >
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img
                  className="w-full"
                  src={`${API_BASE_URL}${data.imagePath}`}
                  alt={data.title}
                />
              </div>
              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {data.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    ${data.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${
                            index < data.averageRating
                              ? "text-yellow-300"
                              : "text-gray-300"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      ({data.numReviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-md font-semibold text-gray-700 dark:text-gray-400">
                    Product Description:
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {data.description}
                  </p>
                </div>
              </div>
              <div>
                <Ratings reviews={reviews} />
                <ReviewForm bookId={id} onReviewSubmit={handleReviewSubmit} />
                <ReviewsList reviews={reviews} />
              </div>
            </div>
          </div>
        </section>
      )}
    </UserLayout>
  );
};

export default ProductOverview;
